export default function PodcastPlayer() {
    return (
      <div className="">
        <div>
        <span className="flex items-center mb-4">
              <h1 className="ml-2 font-bold uppercase text-lg">Our Latest Podcasts</h1>
              <div className="flex-1 border-t border-gray-300 ml-2"></div>
        </span>
        
        <iframe title="TradeInformer Podcast" 
        height="315" 
        width="100%"
         scrolling="no" 
         data-name="pb-iframe-player" 
         src="https://www.podbean.com/player-v2/?i=z465i-e8542f-pbblog-playlist&share=1&download=1&fonts=Arial&skin=1&font-color=auto&rtl=0&logo_link=episode_page&btn-skin=7&size=315" 
         loading="lazy" 
         ></iframe>
        </div>
           
      </div>
    );
  }
  