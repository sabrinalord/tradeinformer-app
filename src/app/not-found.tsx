
import Widget from './components/Widget'
import Image from 'next/image';
 
export default function NotFound() {
  return (
    <div className="overflow-hidden">
      <div className="container mx-auto p-2">
        <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
          <div className="hidden col-span-1 lg:block sm:col-span-12 lg:col-span-3 sm:p-2">
          <Widget type="sidebar" />
         </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">
          <div className="text-center flex flex-col items-center justify-center">
          <Image src="/images/404Robot.jpg" alt="404 Page error" width="300" height="300" />
              <p className="text-gray-500 mt-4">
                Sorry, the page or content you are looking for may have been moved or we might be experiencing a technical glitch.
              </p>
              <p className="text-gray-500 mt-4 mb-10">
              Please try again later or check the URL that you are trying to access.</p>
            </div>
      
        <div className="lg:hidden max-w-[500px] ml-auto mr-auto">
          <Widget type="sidebar" />
        </div>
      
      </div>
  
        </main>
      </div>
    </div>
  )
}