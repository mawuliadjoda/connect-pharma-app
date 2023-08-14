import { Pharmacy } from "../Pharmacy";

type PaginationProps = {
    getNext: (item: Pharmacy) => void,
    getPrevious: (item: Pharmacy) => void,
    pharmacies: Pharmacy[]
}

export default function Pagination({ getNext, getPrevious, pharmacies }: PaginationProps) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
                <li>



                    <a onClick={() => getPrevious(pharmacies[0])}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!">
                        <span aria-hidden="true">&larr;</span>
                        Previous
                    </a>
                </li>
                <li>
                    <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!">1</a>
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
                    <a onClick={() => getNext(pharmacies[pharmacies.length - 1])}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        href="#!">Next <span aria-hidden="true">&rarr;</span></a>
                </li>
            </ul>
        </nav>
    );
}