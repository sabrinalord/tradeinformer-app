'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuItem } from '../types';

interface NavbarProps {
    headerItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({headerItems}) => {
    const [selectedParent, setSelectedParent] = useState<string | null>("News");   

    // const [isMobileMenuOpen, setIsMobileMenuOption] = useState(false);

    // const toggleMobileNavOpen = () => {
    //     setIsMobileMenuOption(!isMobileMenuOpen);
    // }

    return (
       <div className="bg-navy p-4 mb-20 text-white relative">
         <div className="flex sm:justify-between mb-8">
                <Link className="max-w-60 sm:max-w-96" href="/">
                    <Image  src="/images/TradeInformer_Logo_White.avif" width={350} height={350} alt="TradeInformer logo" ></Image> 
                </Link> 

                <div className="flex flex-col sm:flex-row ml-auto justify-items-center">
                    <div className="text-right mr-2">
                        <p className="font-bold hidden sm:block text-[12px] sm:text-[18px]">Subscribe to TradeInformer</p>
                        <p className="ml-8 text-[12px] sm:text-sm">The industry's favourite newsletter in your inbox every Monday morning. </p>
                     
                    </div>
                    <button className=" ml-auto max-w-28 text-black max-h-10 text-xs font-semibold px-2 rounded bg-warmYellow mt-2 mb-2 mr-2 flex items-center gap-1">
                        Subscribe<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>           
         </div>

       
            <nav>
                <ul className="flex  w-full ">
                    { headerItems.map((item) => (
                        item.label != "WhatsApp Updates" ? ( 
                        <li className="p-4 border-l border-gray-500" key={item.id}>
                            <button className="sm:pr-16"  onClick={() => setSelectedParent(item.label)}>
                                <Link className={` w-fit text-[1.3em] font-bold pb-1 pr-4 ${ selectedParent == item.label ? "border-b-4 border-b-babyblue" : "" }`} href={item.url} >
                                {item.label}
                                </Link>
                            </button>

                          
                                {item.label === selectedParent && item.childItems?.edges?.length ? (
                                    <ul className="absolute bg-darkNavy  w-full overflow-x-auto z-0 whitespace-nowrap flex pb-4 mt-4 left-0 pt-3 border-t border-gray-500">
                                        {item.childItems.edges.map((child)=> (
                                            <li className="ml-8 " key={child.node.id}> 
                                                <Link href={child.node.url}>{child.node.label}</Link>
                                            </li>
                                        ))}
                                    </ul> 
                                    ): null 
                                } 
                          
                        </li>          
                        ) : null                                
                    ))
                    }
                </ul>
                </nav>

       </div>
    )
}

export default Navbar;

{/* <button className="text-xs text-white py-2 px-2 font-semibold rounded bg-[#3bd66f] mb-2 mr-2 flex items-center gap-1 float-right">Follow us on WhatsApp
<svg className="w-6 "
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 448 512">
    <path
    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
</svg>

</button> */}