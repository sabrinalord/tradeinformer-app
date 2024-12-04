import Link from 'next/link';
import { MenuItem } from '../types';
import React from 'react';


interface FooterProps {
    footerItems: MenuItem[]
}


const Footer: React.FC<FooterProps> = ({footerItems}) => {

    return (
        <div className="bg-navy p-4  text-white flex flex-wrap lg:justify-evenly">
            {footerItems.map((item) => (
                <ul className="p-2 min-w-[170px] max-w-[250px] sm:p-4 m-2">
                    <li className={` mb-2 sm:text-[1.2em] font-bold `} key={item.id}>
                        {item.label}
                    </li>
                
    {item.childItems?.edges?.length ? (
        <React.Fragment>
            {item.childItems.edges.map((child)=> {
                return (
                    <li className="hover:text-blue-200" key={child.node.id}> 
                        <Link href={`${child.node.path}`}>{child.node.label}</Link>
                    </li>
                );
            })}
        </React.Fragment>
    ): null 
                    } 
                </ul>                    
            ))
            }
    
        </div>
        

    )
}



export default Footer;