import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export type User = {
    id?: string | undefined,
    name?: string,
    username: string,
    email?: string,
    roles?: string[],
    tel?: string,
    authProvider?: string,
    uid?: string | null,
    createTime?: Timestamp,
    password?: string
} | null


export const UserConverter = {
    toFirestore: (user: User) => {
        return {
            id: user!.id,
            name: user!.name,
            username: user!.username,
            email: user!.email,
            roles: user?.roles,
            tel: user!.tel,
            authProvider: user!.authProvider,
            uid: user!.uid,
            createTime: user!.createTime
        };
    },
    fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {

        const user: User = {
            id: doc.id,
            ...doc.data()
            /*
            name: doc.data().name,
            username: doc.data().username,
            email: doc.data().email,
            roles:doc.data().roles,
            tel: doc.data().tel,
            authProvider: doc.data().authProvider,
            uid: doc.data().uid,
            createTime: doc.data().createTime
            */
        } as User
        return user;
    }
};