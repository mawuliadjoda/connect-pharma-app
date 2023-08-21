import { format } from "date-fns";

export function convertToENecimal(value: string | undefined): number {
    if (!value?.includes(",")) return +value!;
    const latTab = value?.split(",");
    const decimalPart = latTab ? latTab[0] : 0;
    const floatingPart = latTab ? latTab[1] : 0;
    return +`${decimalPart}.${floatingPart}`;
}

export const formatToSimpleDateWithSeconds = (date: Date) : string | undefined => date ? format(new Date(date), "dd/MM/Y - HH:mm:ss") : undefined;


export const formatPhoneNumber = (tel: string) => `${tel!.includes('+') ? tel : `+${tel}` }`;