import { GeoPoint } from "firebase/firestore";
import { Pharmacy } from "../pages/pharmacies/Pharmacy";
import { Coordinate, getDistanceBetweenTwoPoints } from "calculate-distance-between-coordinates";


type Unit = 'km' | 'mile';
const unitKm: Unit = "km";

// https://www.npmjs.com/package/calculate-distance-between-coordinates
export function applyHaversine(pharmacies: Pharmacy[], userLocation: Coordinate) {

    pharmacies.map((pharmacy: Pharmacy) => {
        const placeLocation: Coordinate  = {
            lat: pharmacy.location.latitude,
            lon: pharmacy.location.longitude
        };
        pharmacy.distance = getDistanceBetweenTwoPoints(userLocation, placeLocation,unitKm);
        pharmacy.distanceStr = getDistanceBetweenTwoPoints(userLocation, placeLocation,unitKm).toFixed(2);
    });

    return pharmacies;
}

export function getNearPharmacies(pharmacies: Pharmacy[]) {
    return pharmacies.sort((pharmacyA, pharmacyB) => {
        return pharmacyA.distance! - pharmacyB.distance!;
    });
}



export function distanceBetweenTwoPlace(pharmacyLocation: GeoPoint, userLocation: GeoPoint) {

    const pharmacyCoordinate: Coordinate  = {
        lat: pharmacyLocation.latitude,
        lon: pharmacyLocation.longitude
    };

    const userCoordinate: Coordinate  = {
        lat: userLocation.latitude,
        lon: userLocation.longitude
    };

    const distanceBetween : DistanceData = {
        distance: getDistanceBetweenTwoPoints(userCoordinate, pharmacyCoordinate,unitKm),
        distanceStr: `${getDistanceBetweenTwoPoints(userCoordinate, pharmacyCoordinate,unitKm).toFixed(2)} ${unitKm}`
    }

    return distanceBetween;
}

export type DistanceData = {
    distance: number,
    distanceStr: string
}