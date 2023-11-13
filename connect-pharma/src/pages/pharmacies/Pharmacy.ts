import { DocumentData, GeoPoint, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"

export type Pharmacy = {
    id?: string,
    address: string,
    email: string,
    isActive: boolean,
    location: GeoPoint
    name: string
    tel: string,
    distance?: number,
    distanceStr?: string,
    createTime?: Timestamp,
    isOpen?: boolean,
    isDuty?: boolean,
    dutyStartDate?: Timestamp,
    dutyEndDate?: Timestamp
}


export const PharmacyConverter = {
    toFirestore: (pharmacy: Pharmacy) => {
        return {
            id: pharmacy.id,
            address: pharmacy.address,
            email: pharmacy.email,
            isActive: pharmacy.isActive,
            location: pharmacy.location,
            name: pharmacy.name,
            tel: pharmacy.tel,
            distance: pharmacy.distance,
            distanceStr: pharmacy.distanceStr
        };
    },
    fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {

        const pharmacy: Pharmacy = {
            id: doc.id,
            ...doc.data()
            /*
            address: doc.data().address,
            email: doc.data().email,
            isActive: doc.data().isActive,
            location: doc.data().location,
            name: doc.data().name,
            tel: doc.data().tel,
            distance: doc.data().distance,
            distanceStr: doc.data().distanceStr
            */
        } as Pharmacy
        return pharmacy;
    }
};
