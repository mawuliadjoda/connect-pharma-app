
export type CallFromValue = '/nearestPharmacies' | '/pharmacies/add';

export enum CallFromPageEnum {
    NearestPharmaciesPage = '/nearestPharmacies',
    AddPharmacy = '/pharmacies/add',
}

export enum CandRedirectMessageEnum {
    FromNearestPharmaciesPage= 'Afficher les pharmacies proche',
    FromAddPharmacy='Continuer l\'enregistrement'
}

export enum PharmacyStatusEnum {
    OPEN = 'Ouvert',
    CLOSE_SOON = 'Ferme bient\u00F4t',
    CLOSE = 'Ferm\u00E9e',
    IS_DUTY = 'Est de garde',
    UNKNOWN = 'Inconnu'
}