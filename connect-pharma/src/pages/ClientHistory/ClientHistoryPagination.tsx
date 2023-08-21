
import { ClientHistory } from './ClientHistory';
import '../../utils/Pagination.css';

type PharmacyPaginationProps = {
    getNext: (item: ClientHistory) => void,
    getPrevious: (item: ClientHistory) => void,
    clientHistories: ClientHistory[],
    page: number,
    disableNextButton?: boolean,
    disablePreviousButton?: boolean
}

export default function ClientHistoryPagination({ getNext, getPrevious, clientHistories, page, disableNextButton, disablePreviousButton }: PharmacyPaginationProps) {

    function handlePrevious() {
        if (clientHistories?.length > 0) {
            getPrevious(clientHistories[0]);
        }
    }

    function handleNext() {
        if (clientHistories?.length > 0) {
            getNext(clientHistories[clientHistories.length - 1])
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