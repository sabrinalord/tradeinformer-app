// import { NextResponse } from 'next/server';
// import { geolocation } from '@vercel/functions';

// export function middleware(request: Request) {
//   const { country } = geolocation(request);

//   const response = NextResponse.next();

//   if (country) {
//     response.headers.set('X-User-Country', country);
//   }

//   return response;
// }

// export const config = {
//   matcher: ['/'], 
// };
