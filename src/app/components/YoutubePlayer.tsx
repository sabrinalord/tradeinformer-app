export default function YouTubePlayer() {
    return (
      <div className="">
        <div>
        <span className="flex items-center mb-4">
              <h1 className="ml-2 font-bold uppercase text-lg">Our Latest Videos</h1>
              <div className="flex-1 border-t border-gray-300 ml-2"></div>
        </span>
        
        <iframe className="border-r-8 rounded border-black w-full "
        width="100%" 
        src="https://www.youtube.com/embed/videoseries?si=OErgBIL31Do17euq&amp;list=PLRYLEvE26T8TB0fKzJVsiupjSCOY05zyC" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        >
        </iframe>
        </div>
           
      </div>
    );
  }
  