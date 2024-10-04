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
        <div className="flex flex-col">
            <nav className="col-span-1 sm:col-span-12 bg-babyblue">
                <button className="text-xs text-black py-2 px-2 font-semibold rounded bg-warmYellow m-2 float-right">WhatsApp Updates</button>
                <button className=" text-black text-xs font-semibold py-2 px-2 rounded bg-warmYellow m-2 float-right">Subscribe To TradeInformer</button>
             </nav>

            <div className="bg-navy text-white grid grid-cols-2 sm:grid-cols-12">
                <div className="col-span-1 sm:col-span-4">
                <Link href="/"><Image  className="p-6" src="/images/TradeInformer_Logo_White.avif" width={350} height={350} alt="TradeInformer logo" ></Image> </Link>      
                </div>

                <nav className="col-span-1 sm:col-span-8 flex ">
                 <ul className="flex w-full relative">
                    {headerItems.map((item) => (
                                 item.label != "WhatsApp Updates" ? ( 
                                    <li className="p-4" key={item.id}>
                                    <button className="pr-16"  onClick={() => setSelectedParent(item.label)}>
                                        <Link className={` w-fit text-xl font-bold pb-2 pr-4 ${ selectedParent == item.label ? "border-b-4 border-b-babyblue" : "" }`} href={item.url} >
                                        {item.label}
                                        </Link>
                                    </button>

                                    {item.label === selectedParent && item.childItems?.edges?.length ? (
                                        <ul className="flex flex-row absolute left-4 mt-4 pt-3 border-t  w-full border-gray-500">
                                            {item.childItems.edges.map((child)=> (
                                              <li className="mr-8 pr-2 " key={child.node.id}> 
                                                 <Link href={child.node.url}>{child.node.label}</Link>
                                              </li>
                                            ))}
                                        </ul>
                                    ): null } 
                                </li>          
                                 ) : null                                
                    ))}
                 </ul>
             </nav>

            </div>

          

           
           
          
        </div>
    )
}

export default Navbar;