'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuItem } from '../types';

interface NavbarProps {
    headerItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({headerItems}) => {
    const [isMobileMenuOpen, setIsMobileMenuOption] = useState(false);

    const toggleMobileNavOpen = () => {
        setIsMobileMenuOption(!isMobileMenuOpen);
    }

    return (
        <nav className="bg-navy text-white grid grid-cols-2 sm:grid-cols-12 gap-4 p-4">
            <div className="col-span-1 sm:col-span-6">
               <Link href="/"><Image src="/images/TradeInformer_Logo_White.avif" width={280} height={280} alt="TradeInformer logo" ></Image> </Link>      
            </div>
           
           <div className="col-span-1 sm:col-span-6 flex">
                {headerItems.map((item) => (
                            <div className="px-4 flex items-center group relative" key={item.id}>
                                {/* Menu Item */}
                                <Link  href={item.url}>{item.label}</Link>
                                    
                                {/* Submenu Items */}
                               {item.childItems  && (

                                <ul className="absolute py-2 left-0 mt-2  hidden group-hover:block top-[60px] text-black bg-white">  
                                  {item.childItems.edges.map(({node}) => (
                                    <li key={node.id} className="min-w-[200px]  p-2">
                                        <Link href={node.url}>{node.label}</Link>
                                        </li>
                                  ))}
                                  </ul>
                               
                               )}
                            </div>
                ))}
           </div>
        </nav>
    )
}

export default Navbar;