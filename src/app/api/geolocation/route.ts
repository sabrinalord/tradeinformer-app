import { geolocation } from '@vercel/functions';


export function GET(request: Request) {
    const { city, country, latitude, longitude } = geolocation(request);
    return new Response(`Your location is ${city}, ${country}. Coordinates: ${latitude}, ${longitude}`);
  }
  