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

    return (
       <div className="bg-navy p-4 mb-20 text-white relative">
         <div className="flex sm:justify-between mb-8">
                <Link className="max-w-60 sm:max-w-96" href="/">
                    <Image  src="/images/TradeInformer_Logo_White.avif" width={350} height={350} alt="TradeInformer logo" ></Image> 
                </Link> 

                <div className="flex flex-col sm:flex-row ml-auto justify-items-center">
                    <div className="text-right mr-2">
                        <p className="font-bold hidden sm:block text-[12px] sm:text-[18px]">Subscribe to TradeInformer</p>
                        <p className="ml-8 text-[12px] sm:text-sm">The industry&apos;s favourite newsletter in your inbox every Monday morning. </p>
                     
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
