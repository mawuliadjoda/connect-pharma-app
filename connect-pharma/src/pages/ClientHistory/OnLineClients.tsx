import { useContext, useEffect, useState } from "react";
import { db } from "../../services/db";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ClientHistory, ClientHistoryConverter } from "./ClientHistory";
import Navbar from "../../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../utils/Loading";
import ClientHistoryTable from "./ClientHistoryTable";
import { UserContext } from "../../utils/PrivateRoutes";

type OnLineClientsProp = {
    showAllClient: boolean,
    title: string
}
const OnLineClients = ({ showAllClient, title }: OnLineClientsProp) => {
    const [clientHistories, setClientHistories] = useState<ClientHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarToggle] = useOutletContext<any>();
    const connectedUser = useContext(UserContext);

    useEffect(() => {

        /*   Firebase v9    */
        const usersRef = collection(db, 'clientHistories');

        const start = new Date();
        const end = new Date();

        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 0)

        const onlineQuery = query(
            usersRef,

            where('pharmacyEmail', '==', connectedUser?.email),
            where("createTime", "!=", null),
            where('createTime', '>=', start),
            where('createTime', '<=', end),

            orderBy("createTime", "desc")
        );

        const allOnlineQuery = query(
            usersRef,


            where("createTime", "!=", null),
            where('createTime', '>=', start),
            where('createTime', '<=', end),

            orderBy("createTime", "desc")
        );
        const unsubscribe = onSnapshot(showAllClient ? allOnlineQuery : onlineQuery, (querySnapshot) => {
            const newClientHistories: ClientHistory[] = [];
            querySnapshot.forEach((doc) => newClientHistories.push(ClientHistoryConverter.fromFirestore(doc)));
            // console.log(newClientHistories);
            // console.log(connectedUser);
            setClientHistories(newClientHistories)
            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();
    }, []);



    const openWhatsapp = (tel: string) => {
        const url = `https://wa.me/${tel.includes('+') ? tel : `+${tel}`}`;
        console.log(url);
        window.open(url);
    }

    const openTelegram = (tel: string) => {
        const url = `https://t.me/${tel.includes('+') ? tel : `+${tel}`}`;
        console.log(url);
        window.open(url);
    }


    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {loading ? <Loading />

                    :

                    <div>
                        <button
                            className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                            {title}
                        </button>


                        {
                            clientHistories?.length > 0 ?

                                <ClientHistoryTable
                                    dataHeader={dataHeader}
                                    data={clientHistories}
                                    openWhatsapp={openWhatsapp}
                                    openTelegram={openTelegram}
                                    loading={loading}
                                />

                                :

                                <div>
                                    <br />
                                    <p className="text-center">Aucun client en ligne actuellement !...</p>
                                </div>

                        }

                    </div>


                }
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
        key: "action",
        label: "Action",
    },
];