import { Suspense } from "react";
import { Loading } from "../utils/Loading";
import Table from "./Table";

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