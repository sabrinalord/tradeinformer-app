'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '../types';

interface NavbarProps {
    headerItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({headerItems}) => {
    // const [isMobileMenuOpen, setIsMobileMenuOption] = useState(false);

    // const toggleMobileNavOpen = () => {
    //     setIsMobileMenuOption(!isMobileMenuOpen);
    // }

    return (
        <nav className="bg-navy text-white grid grid-cols-2 sm:grid-cols-12 gap-4">
            <div className="col-span-1 sm:col-span-6">
               <Link href="/"><Image  className="p-4" src="/images/TradeInformer_Logo_White.avif" width={280} height={280} alt="TradeInformer logo" ></Image> </Link>      
            </div>
           
           <div className="col-span-1 sm:col-span-6 flex">
              <ul className="flex">
                {headerItems.map((item) => (
                                <li className="p-4" key={item.id}>
                                    {/* Menu Item */}
                                    <Link className="text-lg font-bold" href={item.url}>{item.label}</Link>
                                </li>            
                                
                    ))}
              </ul>
              
           </div>
        </nav>
    )
}

export default Navbar;