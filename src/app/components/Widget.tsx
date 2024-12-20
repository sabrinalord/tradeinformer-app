'use client';
import { useBanners } from '../../lib/BannersContext';

import { WidgetType } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface WidgetProps {
   type: WidgetType;
}

export default function Widget({type}: WidgetProps) {
      const { banners } = useBanners(); 
      const filteredBanners = banners.filter(banner => banner.type === type);

      const randomIndex = Math.floor(Math.random() * filteredBanners.length);
      const banner = filteredBanners[randomIndex]


    return (
     
    <div >
        {type == 'sidebar' && (

        filteredBanners.map((banner, index) => (
         <div key={index} className="m-4">
          <Link style={{maxWidth: '400px'}} href={banner.target_url} target="_blank" rel="noopener noreferrer">
          <Image src={banner.image_url} width={800} height={300} alt="Widgetisement"></Image>
        </Link>  
        </div>

        ))
      )}

        {type !== 'sidebar' && filteredBanners[0] && (
          <div className={`flex justify-center mt-2 mb-4 `}>
           <Link href={banner.target_url} target="_blank" rel="noopener noreferrer">
           <Image src={banner.image_url} width={800} height={300} alt="Widgetisement"></Image>
         </Link>
         </div>
        )}
      
      </div>
     
    );
}