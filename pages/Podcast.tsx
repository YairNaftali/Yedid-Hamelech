
import React from 'react';

const Podcast: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#2C3E50] text-white">
      {/* Podcast Header */}
      <section className="relative py-32 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/id/1058/1920/1080" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <div className="inline-block bg-[#C9963F] text-[#2C3E50] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Offical Podcast</div>
          <h1 className="text-6xl md:text-8xl mb-8 leading-tight">In The Valley of Giants</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Deep conversations on Torah, Hashkafa, and the challenges of the modern world with the giants of our generation."
          </p>
        </div>
      </section>

      {/* Media Links */}
      <section className="py-20 bg-white text-[#0a192f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* YouTube Embed Placeholder */}
            <div className="bg-[#f8f5f0] p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186c-.273-1.003-1.06-1.79-2.063-2.064C19.615 3.85 12 3.85 12 3.85s-7.615 0-9.435.272c-1.003.274-1.79 1.061-2.063 2.064C.242 8 0 12 0 12s.242 4 .502 5.814c.273 1.003 1.06 1.79 2.063 2.064 1.82.272 9.435.272 9.435.272s7.615 0 9.435-.272c1.003-.274 1.79-1.061 2.063-2.064C23.758 16 24 12 24 12s-.242-4-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <h3 className="text-2xl font-bold">Watch on YouTube</h3>
              </div>
              <div className="aspect-video bg-black rounded shadow-2xl overflow-hidden mb-8">
                {/* Real YouTube Embed */}
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=IntheValleyofGiants" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <a href="https://www.youtube.com/@IntheValleyofGiants" target="_blank" className="block text-center bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-colors">Subscribe on YouTube</a>
            </div>

            {/* Spotify Embed Placeholder */}
            <div className="bg-[#f8f5f0] p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-white">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.307c-.215.354-.674.464-1.028.248-2.857-1.747-6.452-2.14-10.686-1.173-.406.092-.813-.162-.905-.568-.092-.406.162-.813.568-.905 4.636-1.061 8.608-.61 11.803 1.344.354.216.464.674.248 1.029zm1.465-3.264c-.271.442-.848.583-1.29.312-3.27-2.008-8.256-2.59-12.122-1.416-.496.15-.1.884-.343.834-1.034-.15-.496-.583-.848-.312-1.29.312-.442.848-.583 1.29-.312 4.41 2.71 10.003 2.053 13.844 4.406.442.271 1.019.13 1.29-.312zm.126-3.414c-3.92-2.328-10.387-2.544-14.157-1.402-.601.183-1.238-.163-1.42-.764-.183-.601.163-1.238.764-1.42 4.316-1.31 11.458-1.054 15.966 1.623.54.32.715 1.018.395 1.558-.32.539-1.018.714-1.558.395z"/></svg>
                </div>
                <h3 className="text-2xl font-bold">Listen on Spotify</h3>
              </div>
              <div className="h-[352px] w-full mb-8">
                 <iframe 
                  src="https://open.spotify.com/embed/show/31U0MXsctL9bbIK6vrfG4g?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-lg shadow-2xl"
                 ></iframe>
              </div>
              <a href="https://open.spotify.com/show/31U0MXsctL9bbIK6vrfG4g" target="_blank" className="block text-center bg-[#1DB954] text-white py-4 rounded-lg font-bold hover:bg-[#189b47] transition-colors">Follow on Spotify</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
