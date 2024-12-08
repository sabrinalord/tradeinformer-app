
'use client'
import { useEffect, useState } from 'react';
import { AdvertData, AdvertType } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface AdvertProps {
    type: AdvertType;
}

export default function Advert(props: AdvertProps) {
    const [banners, setBanners] = useState<AdvertData[]>([]);
    const [userCountry, setUserCountry] =  useState<string | null>(null);

    useEffect(() => {
      const fetchCountry = async () => {
        const response = await fetch('/');
        const country = response.headers.get('X-User-Country');
        setUserCountry(country);
      };
  
      fetchCountry();
    }, []);
 

    useEffect(() => {
        async function fetchBanners() {
            const { type } = props
            const countryToUse = userCountry ? `${userCountry},All Countries` : 'All Countries';
            const formattedCountryQuery = encodeURIComponent(countryToUse);
        
            try {

                const response = await fetch(`/api/advert?type=${type}&country=${formattedCountryQuery}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json', 
                      'Access-Control-Allow-Origin': '*', 
                      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                      'Access-Control-Allow-Headers': 'Content-Type',
                    },
                  });


                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: AdvertData[] = await response.json();
                setBanners(data);
            } catch (err) {
                console.error(err);
            }
        }
        
        fetchBanners();
    }, [userCountry, props.type]);


    if (banners.length === 0) {
        return <p></p>;
    }

    const randomIndex = Math.floor(Math.random() * banners.length);
    const banner = banners[randomIndex];


        const isSidebar = props.type === 'sidebar';


    return (
     
    <div className={`flex justify-center mt-2 mb-4 p-2`}>
        <Link style={isSidebar ? { maxWidth: '400px' } : undefined} href={banner.target_url} target="_blank" rel="noopener noreferrer">
             <Image src={banner.image_url} width={800} height={300} alt="advertisement"></Image>
        </Link>
      </div>
     
    );
}