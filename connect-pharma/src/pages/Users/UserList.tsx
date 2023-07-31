import { Suspense } from "react";
import Table from "./Table";
import { Loading } from "../../utils/Loading";

function UserList() {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Table />
            </Suspense>
        </>
    )
}
export default UserList;