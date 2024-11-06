
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
    const [error, setError] = useState<string | null>(null);
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
        
            console.log(`user country is: ${formattedCountryQuery}`)
            try {

                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


                const response = await fetch(`${apiBaseUrl}/api/advert?type=${type}&country=${formattedCountryQuery}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json', 
                    },
                  });


                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: AdvertData[] = await response.json();
                setBanners(data);
            } catch (err) {
                setError('Failed to load banners');
                console.error(err);
            }
        }
        
        fetchBanners();
    }, [userCountry]);


    if (error) {
        return <p>{error}</p>;
    }

    if (banners.length === 0) {
        return <p>No banners available</p>;
    }

    const randomIndex = Math.floor(Math.random() * banners.length);
    const banner = banners[randomIndex];

    return (
     
    <div className="flex justify-center m-2 p-2">
        <Link href={banner.target_url} target="_blank" rel="noopener noreferrer">
             <Image src={banner.image_url} width={800} height={300} alt="advertisement"></Image>
        </Link>
      </div>
     
    );
}