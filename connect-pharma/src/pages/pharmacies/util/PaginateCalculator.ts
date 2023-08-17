import { Pharmacy } from "../Pharmacy";


export const customPaginate = (pharmacies: Pharmacy[], limitPerPage: number) => {

    let start = 0;
    let end = limitPerPage;

    const pharmaciesMap = new Map<number, Pharmacy[]>();

    for (let i: number = 1; i < pharmacies.length; i++) {

        if (end > pharmacies.length) return pharmaciesMap;

        end = limitPerPage * i;

        const paginatePharmacies: Pharmacy[] = pharmacies.slice(start, end);

        if(paginatePharmacies.length === 0)  return pharmaciesMap;

        pharmaciesMap.set(i, paginatePharmacies);

        start = start + limitPerPage;

    }
    return pharmaciesMap;

}