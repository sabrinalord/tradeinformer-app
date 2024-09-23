import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';



const GET_NAVBAR = gql`
query GET_NAVBAR {
  menuItems(where: {location: HEADER_MENU, parentId: "0"}) {
    edges {
      node {
        id
        label
        url
        path
      }
    }
  }
}
`
interface MenuItemsData {
    menuItems: {
      edges: {
        node: {
          id: string;
          label: string;
          url: string;
        };
      }[];
    };
  }


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOption] = useState(false);
    const {error , data } = useQuery<MenuItemsData> (GET_NAVBAR);

    if (error) return <div>Error: {error.message}</div>;


    const toggleMobileNavOpen = () => {
        setIsMobileMenuOption(!isMobileMenuOpen);
    }

    return (
        <nav className="bg-navy text-white grid grid-cols-2 sm:grid-cols-12 gap-4 p-4">
            <div className="col-span-1 sm:col-span-6">
                <Image src="/images/TradeInformer_Logo_White.avif" width={280} height={280} alt="TradeInformer logo" ></Image>      
            </div>
           
           <div className="col-span-1 sm:col-span-6 flex">
                {data?.menuItems.edges.map(({node}) => (
                            <div className="px-4 flex items-center">
                                <Link key={node.id} href={node.url}>{node.label}</Link>
                            </div>
                ))}
           </div>

        </nav>
    )
}

export default Navbar;