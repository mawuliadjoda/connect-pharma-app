import { DocumentData, GeoPoint, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"
import { DistanceData, distanceBetweenTwoPlace } from "../../services/LocationService";

export enum ClientAction {
    CLICK_WHATSAPP = 'CLICK_WHATSAPP',
    CLICK_TELEGRAM = 'CLICK_TELEGRAM',
    CLICK_MAP = 'CLICK_MAP',
}
export type ClientHistory = {
    id?: string,
    clientLocation: GeoPoint
    pharmacyLocation: GeoPoint,
    clientPhoneNumber: string,
    pharmacyPhoneNumber: string,
    pharmacyEmail?: string,
    pharmacyName: string,
    createTime: Timestamp,
    createTimeFormat: string | undefined,
    action: ClientAction,
    distanceData?: DistanceData
}

export const ClientHistoryConverter = {

    fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        const clientHistory: ClientHistory = {
            id: doc.id,
            clientLocation: doc.data().clientLocation,
            pharmacyLocation: doc.data().pharmacyLocation,
            clientPhoneNumber: doc.data().clientPhoneNumber,
            pharmacyPhoneNumber: doc.data().pharmacyPhoneNumber,
            pharmacyEmail: doc.data().pharmacyEmail,
            pharmacyName: doc.data().pharmacyName,
            createTime: doc.data().createTime,
            createTimeFormat:  doc.data().createTimeFormat,
            action: doc.data().action
        }

        if(clientHistory.clientLocation && clientHistory.pharmacyLocation) {
            clientHistory.distanceData= distanceBetweenTwoPlace(clientHistory.pharmacyLocation, clientHistory.clientLocation);
        }

        return clientHistory;
    }
};