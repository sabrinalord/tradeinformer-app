"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const SocialShareForArticles: React.FC<{ articleTitle: string}>= ({ articleTitle }) => {

    const pathname = usePathname();
    const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;

    const encodedTitle = encodeURIComponent(articleTitle);
    const encodedURL = encodeURIComponent(currentURL);
  

    const buttonStyling = "mb-2 h-9 flex rounded px-4 py-2.5 text-sm items-center font-medium text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg";

    return (
        <div className="flex flex-col">
            <div className="ml-auto flex flex-col"> 
              <div className="flex items-center w-full">
                <div className=" flex-grow"></div>
                    <p className="px-4 text-[10px] uppercase text-gray-600">
                    Share article
                    </p>
                <div className=" flex-grow"></div>
            </div>
        <nav className="flex ml-auto">
             {/* WhatsApp Social */}
            <Link 
             target="_blank"
               rel="noopener noreferrer"
              className="mr-2" 
              href={`https://api.whatsapp.com/send?text=${encodedTitle}%20%0A%0A%20${encodedURL}`}
              >
               <button
                    type="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className={`bg-[#16b550] hover:bg-[#0f8b3c] ${buttonStyling} `}>
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512">
                            <path
                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                            </svg>
                        </span>
                    </button>
            </Link>

            {/* LinkedIn Social */}
          
            <Link 
             target="_blank"
              rel="noopener noreferrer"
            className="mr-2" 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
            >
                <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className={`bg-[#0077b5] hover:bg-[#12638f] ${buttonStyling}`}>
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512">
                    <path
                        d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                    </svg>
                </span>
                </button>
            </Link>

             {/* Telegram social */}

            <Link className="mr-2" 
             target="_blank"
               rel="noopener noreferrer"
              href={`https://telegram.me/share/url?url=${encodedURL}&text=${encodedTitle}`}

            >
                <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className={`bg-[#0088cc] hover:bg-[#12638b] ${buttonStyling}`} >
                    <span className="[&>svg]:h-4 [&>svg]:w-4">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 496 512">
                        <path
                            d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                        </svg>
                    </span>
                </button>
            </Link>

            {/* X Social */}

            <Link className="mr-2" 
             target="_blank"
             rel="noopener noreferrer"
            href={`https://x.com/intent/post?text=${articleTitle}&url=${encodeURIComponent(currentURL)}&via=TradeInformer`}
            >
            <button
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className={`bg-[#000000] hover:bg-[#2f3030] ${buttonStyling}`}
             >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                        <svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
                            </svg>

                        </span>
                    </button>
            </Link> 
        </nav>
        </div>
        </div>

    )

}


export default SocialShareForArticles;