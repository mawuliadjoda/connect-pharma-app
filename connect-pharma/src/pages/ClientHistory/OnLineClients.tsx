import { useContext, useEffect, useState } from "react";
import { db } from "../../services/db";
import { collection, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { ClientHistory, ClientHistoryConverter } from "./ClientHistory";
import Navbar from "../../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../utils/Loading";
import ClientHistoryTable from "./ClientHistoryTable";
import { UserContext } from "../../utils/PrivateRoutes";
import ClientHistoryPagination from "./ClientHistoryPagination";
import { formatPhoneNumber } from "../../utils/Utils";


type OnLineClientsProp = {
    showAllClient: boolean,
    title: string
}

const LIMIT_PER_PAGE = 10;

const OnLineClients = ({ showAllClient, title }: OnLineClientsProp) => {
    const [clientHistories, setClientHistories] = useState<ClientHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarToggle] = useOutletContext<any>();
    const connectedUser = useContext(UserContext);

    const [disableNextButton, setDisableNextButton] = useState(true);
    const [disablePreviousButton, setDisablePreviousButton] = useState(true);

    const [clientHistoriesMap, setClientHistoriesMap] = useState<Map<number, ClientHistory[]>>();

    const [page, setPage] = useState(0);

    useEffect(() => {

        const unsubscribe = onSnapshot(getQuery(showAllClient), (querySnapshot) => {

            if (querySnapshot.size > 0) {

                const newClientHistories: ClientHistory[] = [];
                querySnapshot.forEach((doc) => newClientHistories.push(ClientHistoryConverter.fromFirestore(doc)));

                setClientHistories(newClientHistories);

                const clientHistoriesMapInitialValue = new Map<number, ClientHistory[]>();
                clientHistoriesMapInitialValue.set(1, newClientHistories);
                setClientHistoriesMap(clientHistoriesMapInitialValue);
                setPage(1);
            }

            querySnapshot.size < LIMIT_PER_PAGE ? setDisableNextButton(true) : setDisableNextButton(false);
            setDisablePreviousButton(true);

            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();
    }, []);


    const getNext = (clientHistory: ClientHistory) => {

        setDisablePreviousButton(false);
        setLoading(true);
        setDisableNextButton(true);

        if (!clientHistory) return;

        const unsubscribe = onSnapshot(getNextQuery(showAllClient, clientHistory), (querySnapshot) => {

            if (querySnapshot.size == 0) {
                setDisableNextButton(true);
            } else {

                const newClientHistories: ClientHistory[] = [];
                querySnapshot.forEach((doc) => newClientHistories.push(ClientHistoryConverter.fromFirestore(doc)));
                setClientHistories(newClientHistories);

                querySnapshot.size < LIMIT_PER_PAGE ? setDisableNextButton(true) : setDisableNextButton(false);

                const clientHistoriesMapInitialValue = clientHistoriesMap;
                clientHistoriesMapInitialValue?.set(page + 1, newClientHistories);
                setClientHistoriesMap(clientHistoriesMapInitialValue);
                setPage(page + 1);

            }
            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();

    }

    const getPrevious = (clientHistory: ClientHistory) => {
        setDisableNextButton(false);
        setDisablePreviousButton(true);

        if (!clientHistory) return;

        if (page > 1) {
            setClientHistories(clientHistoriesMap!.get(page - 1)!);
            setPage(page - 1);
        }

        (page === 1) ? setDisablePreviousButton(true) : setDisablePreviousButton(false);

    }


    const getQuery = (showAllClient: boolean) => {

        if (showAllClient) {
            return query(
                collection(db, 'clientHistories'),

                where("createTime", "!=", null),
                where('createTime', '>=', startDate()),
                where('createTime', '<=', endDate()),

                orderBy("createTime", "desc"),
                limit(LIMIT_PER_PAGE)
            );
        }
        return query(
            collection(db, 'clientHistories'),

            where('pharmacyEmail', '==', connectedUser?.email),
            where("createTime", "!=", null),
            where('createTime', '>=', startDate()),
            where('createTime', '<=', endDate()),

            orderBy("createTime", "desc"),
            limit(LIMIT_PER_PAGE)
        );
    }


    const getNextQuery = (showAllClient: boolean, clientHistory: ClientHistory) => {

        if (showAllClient) {
            return query(
                collection(db, 'clientHistories'),
                where("createTime", "!=", null),
                where('createTime', '>=', startDate()),
                where('createTime', '<=', endDate()),

                orderBy("createTime", "desc"),

                startAfter(clientHistory.createTime),

                limit(LIMIT_PER_PAGE)
            );
        }
        return query(
            collection(db, 'clientHistories'),
            where('pharmacyEmail', '==', connectedUser?.email),
            where("createTime", "!=", null),
            where('createTime', '>=', startDate()),
            where('createTime', '<=', endDate()),

            orderBy("createTime", "desc"),

            startAfter(clientHistory.createTime),

            limit(LIMIT_PER_PAGE)
        );
    }

    const openWhatsapp = (tel: string) => {
        const url = `https://wa.me/${formatPhoneNumber(tel)}`;
        window.open(url);
    }

    const openTelegram = (tel: string) => {
        const url = `https://t.me/${formatPhoneNumber(tel)}`;
        window.open(url);
    }

    const startDate = () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0)
        return start;
    }
    const endDate = () => {
        const end = new Date();
        end.setHours(23, 59, 59, 0);
        return end;
    }

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />
                <div className="mainCard">

                    {loading ? <Loading />

                        :

                        <div>
                            <button
                                className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                                {title}
                            </button>
                            <br />
                            <br />

                            {
                                clientHistories?.length > 0 ?

                                    <div>
                                        <ClientHistoryTable
                                            dataHeader={dataHeader}
                                            data={clientHistories}
                                            openWhatsapp={openWhatsapp}
                                            openTelegram={openTelegram}
                                            loading={loading}
                                        />                                        
                                        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md grid place-items-center ">
                                            <ClientHistoryPagination
                                                getNext={getNext}
                                                getPrevious={getPrevious}
                                                clientHistories={clientHistories}
                                                page={page}

                                                disableNextButton={disableNextButton}
                                                disablePreviousButton={disablePreviousButton}

                                            />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    </div>

                                    :

                                    <div>
                                        <br />
                                        <p className="text-center">Aucun client en ligne actuellement !...</p>
                                    </div>

                            }

                        </div>


                    }

                </div>
            </main>
        </>
    )
}
export default OnLineClients


const dataHeader = [
    {
        key: "createTime",
        label: "Date",
    },
    {
        key: "clientPhoneNumber",
        label: "Tel",
    },
    {
        key: "distance",
        label: "Distance",
    },
    {
        key: "pharmacyName",
        label: "Pharmacie",
    },
    {
        key: "click",
        label: "Action Clik",
    },
    {
        key: "action",
        label: "Action",
    },
];