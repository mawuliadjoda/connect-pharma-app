import { GeoPoint, Timestamp } from "firebase/firestore"


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
    createTime?: Timestamp,
    action: ClientAction
}