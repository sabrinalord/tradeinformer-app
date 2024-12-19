'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import { WidgetData } from '@/app/types';

interface BannersContextType {
    banners: WidgetData[];
  }

  const BannersContext = createContext<BannersContextType | undefined>(undefined);

  interface BannersProviderProps {
    children: ReactNode; 
  }

  export const BannersProvider: React.FC<BannersProviderProps> = ({ children }) => {
    const [banners, setBanners] = useState<WidgetData[]>([]);

    useEffect(() => {
        const fetchBanners = async () => {
          try {
            const res = await fetch('/api/widget');
            if (!res.ok) {
              throw new Error('Failed to fetch banners');
            }
            const data: WidgetData[] = await res.json();
            setBanners(data);
          } catch (error) {
            console.error('Error fetching banners:', error);
          }
        };
    
        fetchBanners();
      }, []);


  
    return (
      <BannersContext.Provider value={{ banners}}>
        {children}
      </BannersContext.Provider>
    );
  };
  
  export const useBanners = () => {
    const context = useContext(BannersContext);
    if (!context) {
      throw new Error('useBanners must be used within a BannersProvider');
    }
    return context;
  };