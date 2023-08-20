import { DocumentData, GeoPoint, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"

export enum ClientAction {
    CLICK_WHATSAPP = 'CLICK_WHATSAPP',
    CLICK_TELEGRAM = 'CLICK_TELEGRAM',
    CLICK_MAP = 'CLICK_MAP',
}
export type ClientHistory = {
    id?: string,
    location: GeoPoint
    clientPhoneNumber: string,
    pharmacyPhoneNumber: string,
    pharmacyEmail?: string,
    createTime: Timestamp,
    createTimeFormat: string | undefined,
    action: ClientAction
}

export const ClientHistoryConverter = {

    fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        const clientHistory: ClientHistory = {
            id: doc.id,
            location: doc.data().location,
            clientPhoneNumber: doc.data().clientPhoneNumber,
            pharmacyPhoneNumber: doc.data().pharmacyPhoneNumber,
            pharmacyEmail: doc.data().pharmacyEmail,
            createTime: doc.data().createTime,
            createTimeFormat:  doc.data().createTimeFormat,
            action: doc.data().action
        }
        return clientHistory;
    }
};