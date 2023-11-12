import { Timestamp } from "@firebase/firestore-types"

export type DutyPharmacy = {
    PHARMACIES: string,
    TELEPHONES: string,
    EMPLACEMENTS: boolean,
    dutyStartDate?: Timestamp,
    dutyEndDate?: Timestamp
}