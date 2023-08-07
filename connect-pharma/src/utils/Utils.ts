
export function convertToENecimal(value: string | undefined): number {
    if (!value?.includes(",")) return +value!;
    const latTab = value?.split(",");
    const decimalPart = latTab ? latTab[0] : 0;
    const floatingPart = latTab ? latTab[1] : 0;
    return +`${decimalPart}.${floatingPart}`;
}