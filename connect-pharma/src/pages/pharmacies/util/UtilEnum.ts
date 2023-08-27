

export type CallFromValue = '/nearestPharmacies' | '/pharmacies/add';

export enum CallFromPageEnum {
    NearestPharmaciesPage = '/nearestPharmacies',
    AddPharmacy = '/pharmacies/add',
}

export enum CandRedirectMessageEnum {
    FromNearestPharmaciesPage= 'Afficher les pharmacies proche',
    FromAddPharmacy='Continuer l\'enregistrement'
}