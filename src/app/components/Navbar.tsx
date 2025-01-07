'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { MenuItem } from '../types';
import { NewsletterSignUpComponents } from './NewsletterSignUpComponents';


interface NavbarProps {
    headerItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ headerItems }) => {
    const [selectedParent, setSelectedParent] = useState<string | null>("News");
    const [selectedChild, setSelectedChild] = useState<string | null>("");

    const toggleDropdown = useCallback((label: string) => {
        setSelectedChild("")
        setSelectedParent((prev) => (prev === label ? prev : label));
    }, []);

    const handleChildClick = useCallback((childLabel: string) => {
        setSelectedChild(childLabel);
    }, []);

    const handleLogoClick = () => {
        setSelectedChild("");
        setSelectedParent("News");
    }

    return (
        <div className="bg-navy p-4 mb-12 sm:mb-10 text-white relative max-h-[200px]">
            <div className="flex justify-between mb-4 lg:mb-8 h-14">
                <button onClick={handleLogoClick}>
                <Link className="max-w-60 sm:max-w-96 mr-4" href="/">
                    <Image
                        src="/images/TradeInformer_Logo_White.avif"
                        width={250}
                        height={250}
                        alt="TradeInformer logo"
                    />
                </Link>
                </button>

                <div>
                    <NewsletterSignUpComponents />
                </div>
            </div>

            <nav>
                <ul className="flex w-full">
                    {headerItems.map((item) =>
                        item.label !== "WhatsApp Updates" ? (
                            <li
                                className={`p-2 mr-4 lg:p-4 border-gray-500 ${
                                    item.label !== "News" ? "border-l" : ""
                                }`}
                                key={item.id}
                            >
                                <button
                                    className={`md:pr-13 lg:pr-16 flex items-center w-full`}
                                    onClick={() => toggleDropdown(item.label)}
                                >
                                    <Link href={`${item.url}`} className={`w-fit lg:text-[1.3em] font-bold pr-2  ${selectedParent == item.label ? "border-b-4 border-b-babyBlue" : "" }`}>
                                        {item.label}
                                    </Link>
                                 
                                </button>
             
                                {/* Child Items Dropdown */}
                                {selectedParent === item.label && item.childItems?.edges?.length ?  (
                                    <ul className="absolute bg-darkNavy  w-full z-0  flex pb-4 mt-4 left-0 pt-3 border-t border-gray-500 whitespace-nowrap overflow-x-auto sm:whitespace-normal sm:flex-wrap sm:overflow-x-hidden">
                                        {item.childItems.edges.map((child)=> (
                                            <li className="ml-8 " key={child.node.id}> 
                                                    <button onClick={() => handleChildClick(child.node.label)}>
                                                    <Link href={`${child.node.path}`} className={`${ selectedChild == child.node.label ? "border-b-2 border-b-white" : "" }`}>{child.node.label}</Link>
                                                </button>
                                            </li>
                                            ))}

                                    </ul> 
                                    ): null } 
                          
                        </li>          
                        ) : null                                
                    )}

                    
                </ul>

                </nav>

       </div>
    )
};


export default Navbar;
