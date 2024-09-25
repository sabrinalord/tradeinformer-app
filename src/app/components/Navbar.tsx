'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MenuResponse, MenuItem } from '../types';

interface NavbarProps {
    headerItems: MenuItem[];
}


const Navbar: React.FC<NavbarProps> = ({headerItems}) => {
    const [isMobileMenuOpen, setIsMobileMenuOption] = useState(false);
    console.log("headerItems are:", headerItems);

    const toggleMobileNavOpen = () => {
        setIsMobileMenuOption(!isMobileMenuOpen);
    }

    return (
        <nav className="bg-navy text-white grid grid-cols-2 sm:grid-cols-12 gap-4 p-4">
            <div className="col-span-1 sm:col-span-6">
                <Image src="/images/TradeInformer_Logo_White.avif" width={280} height={280} alt="TradeInformer logo" ></Image>      
            </div>
           
           <div className="col-span-1 sm:col-span-6 flex">
                {headerItems.map((item) => (
                            <div className="px-4 flex items-center" key={item.id}>
                                <Link  href={item.url}>{item.label}</Link>
                            </div>
                ))}
           </div>

        </nav>
    )
}

export default Navbar;