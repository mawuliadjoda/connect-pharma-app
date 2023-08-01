import { GeoPoint } from "firebase/firestore"

export type Pharmacy = {
    id?: string,
    address: string,
    email: string,
    isActive: boolean,
    location: GeoPoint
    name: string
    tel: string,
    distance?: number,
    distanceStr?: string
}