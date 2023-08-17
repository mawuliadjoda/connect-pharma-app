import { Pharmacy } from "../Pharmacy";
import './PharmacyPagination.css'

type PharmacyPaginationProps = {
    getNext: (item: Pharmacy) => void,
    getPrevious: (item: Pharmacy) => void,
    pharmacies: Pharmacy[],
    page: number,
    disableNextButton?: boolean,
    disablePreviousButton?: boolean
}

export default function PharmacyPagination({ getNext, getPrevious, pharmacies, page, disableNextButton,  disablePreviousButton}: PharmacyPaginationProps) {

    function handlePrevious() {
        if (pharmacies?.length > 0) {
            getPrevious(pharmacies[0]);
        }   
    }

    function handleNext() {
        if (pharmacies?.length > 0) {
            getNext(pharmacies[pharmacies.length - 1])
        }   
    }



    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
                <li>



                    <a onClick={handlePrevious}
                        className={disablePreviousButton ? "disabledLink relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
                        href="#!">
                        <span aria-hidden="true">&larr;</span>
                        {disablePreviousButton ? 'Fin' : 'Précédent'}
                    </a>
                </li>
                <li>
                    <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!">Page {page}</a>
                </li>
                {/* <li aria-current="page">
                    <a
                        className="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
                        href="#!">2
                        <span
                            className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span>
                    </a>
                </li>
                <li>
                    <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!">3</a>
                </li> */}
                <li>
                    <a 
                        onClick={handleNext}                        
                        className={disableNextButton ? "disabledLink relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
                        href="#!">
                        {disableNextButton ? 'Fin' : 'Suivant'}
                        <span aria-hidden="true">&rarr;</span></a>
                </li>
            </ul>
        </nav>
    );
}