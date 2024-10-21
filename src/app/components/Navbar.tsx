'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuItem } from '../types';
import { NewsletterSignUp } from './NewsletterSignUp';



interface NavbarProps {
    headerItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({headerItems}) => {

    const [selectedParent, setSelectedParent] = useState<string | null>("News");   

    return (
       <div className="bg-navy p-4 mb-12 sm:mb-10 text-white relative max-h-[200px]">
         <div className="flex justify-between mb-4 lg:mb-8 h-14">
                <Link className="max-w-60 sm:max-w-96 mr-4" href="/">
                    <Image  src="/images/TradeInformer_Logo_White.avif" width={350} height={350} alt="TradeInformer logo" ></Image> 
                </Link> 

                <div className="flex flex-col sm:flex-row ml-auto justify-items-center">
                
                    <div>                      
                         <NewsletterSignUp></NewsletterSignUp>
                    </div>

                </div>           
         </div>
 
            <nav>
                <ul className="flex  w-full ">
                    { headerItems.map((item) => (
                        item.label != "WhatsApp Updates" ? ( 
                        <li className={`p-2 mr-4 sm:p-4  border-gray-500 ${item.label != "News" ? "border-l" : "" }`} key={item.id}>
                            <button className="sm:pr-16"  onClick={() => setSelectedParent(item.label)}>
                                <Link className={`w-fit sm:text-[1.3em] font-bold pb-1 pr-4 ${ selectedParent == item.label ? "border-b-4 border-b-babyBlue" : "" }`} href={item.url} >
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
