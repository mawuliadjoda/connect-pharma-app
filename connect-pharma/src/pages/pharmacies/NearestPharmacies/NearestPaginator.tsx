
import '../../../utils/Pagination.css';

type NearestPaginatorProps = {
    getNext: () => void,
    getPrevious: () => void,
    page: number,
    disableNextButton?: boolean,
    disablePreviousButton?: boolean
}

export default function NearestPaginator({ getNext, getPrevious, page, disableNextButton,  disablePreviousButton}: NearestPaginatorProps) {

    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
                <li>

                    <a onClick={getPrevious}
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
                        onClick={getNext}                        
                        className={disableNextButton ? "disabledLink relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"}
                        href="#!">
                        {disableNextButton ? 'Fin' : 'Suivant'}
                        <span aria-hidden="true">&rarr;</span></a>
                </li>
            </ul>
        </nav>
    );
}