
import "./CardAnimation.css";
import { Pharmacy } from "../Pharmacy";
import { PharmacyStatusEnum } from "../HandleWebClientPhoneNumber/UtilEnum";


interface CardAnimationProps {
    data: Pharmacy[],
    openWhatsapp: (pharmacy: Pharmacy) => void,
    openTelegram: (pharmacy: Pharmacy) => void,
    openMag: (pharmacy: Pharmacy) => void,
    openPhone: (pharmacy: Pharmacy) => void
}


/*
https://codepen.io/sohrabzia/pen/XWoXRbg
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
    // Apply animation to each card with a delay
    cards.forEach((card, index) => {

        card.style.animationDelay = `${index * 300}ms`;
        card.style.animation = `opacity:0; slide-fade-up 0.5s ease-out forwards;`
    });
});
*/

const CardAnimation = ({
    data,
    openWhatsapp,
    openTelegram,
    openMag,
    openPhone
}: CardAnimationProps) => {


    return (
        <>

            <div className="h-full m-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-2 bg-gray-50">

                    {data?.map((row: Pharmacy, index: number) => (
                        
                        <div 
                            key={index} 
                            style={{
                                    opacity: `0`,
                                    // animation: `slide-fade-up 0.5s ease-out forwards`
                                    animation: `slide-fade-up ${index * 900}ms ease-out forwards`
                            }}   
                            // https://tailwindcss.com/docs/background-color                           
                            className="card animate-slide-fade p-4 rounded shadow bg-white">

                            <div className="flex items-center">
                              
                                {
                                    PharmacyStatusEnum.CLOSE_SOON === row.status ? <span className="h-3 w-3 mr-2 rounded-full bg-red-800"></span>: ''   
                                }
                                {
                                    PharmacyStatusEnum.CLOSE === row.status ? <span className="h-3 w-3 mr-2 rounded-full bg-gray-300"></span>: ''   
                                }
                                {
                                    PharmacyStatusEnum.OPEN_SOON === row.status ? <span className="h-3 w-3 mr-2 rounded-full bg-green-200"></span>: ''   
                                }
                                {
                                    PharmacyStatusEnum.OPEN === row.status ? <span className="h-3 w-3 mr-2 rounded-full bg-green-800"></span>: ''   
                                }
                                {
                                    PharmacyStatusEnum.IS_DUTY === row.status ? <span className="h-3 w-3 mr-2 rounded-full bg-green-800"></span>: ''   
                                }
                                
                                {/* <span className="h-3 w-3 mr-2 rounded-full bg-gray-300"></span> */}                       
                                {/* <span className="font-semibold">{row.name}</span> */}

                                <span>{row.name}</span>
                            </div>                            
                            <small id="telHelp" className="absolute w-full text-neutral-500 dark:text-neutral-200">
                                <span className="ml-5">{row.distanceStr}</span>
                            </small>
                            <br />

                            <small id="telHelp" className="absolute w-full text-neutral-500 dark:text-neutral-200">
                                <span className="ml-5">{row.status}</span>
                            </small>
                            <br />

                            <div className="ml-5 grid grid-cols-4 grid-rows-1 gap-4">
                                {/* whatsapp */}
                                <div onClick={(e) => { e.preventDefault(); openWhatsapp(row); }}>
                                    <i className="fa fa-whatsapp" style={{fontSize: `18px`, color:'#25D366'}} aria-hidden="true" />
                                </div>

                                {/* telegram */}
                                <div onClick={(e) => { e.preventDefault(); openTelegram(row); }}>
                                    <i className="fa fa-telegram icon_size" style={{fontSize: `18px`, color: '#0088cc'}} aria-hidden="true" />                        
                                </div>

                                <div onClick={(e) => {e.preventDefault(); openPhone(row)}} >
                                    {/* <a href={`tel://${row.tel}`} > */}
                                        <i  className="fa fa-phone icon_size" style={{fontSize: `18px`}} aria-hidden="true" />
                                    {/* </a> */}
                                </div>

                                {/* maps */}
                                <div onClick={(e) => { e.preventDefault(); openMag(row); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                        <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"></path><path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"></path><path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"></path><path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"></path><path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"></path>
                                    </svg>
                                </div>
                            </div>

                        </div>

                    ))}


                </div>
            </div>
        </>
    );
};

export default CardAnimation;
