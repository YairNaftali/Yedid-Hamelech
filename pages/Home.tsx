
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="/images/Main header group photo.jpeg" 
          alt="Yeshivas Yedid Hamelech" 
          className="absolute inset-0 w-full h-full object-contain brightness-[0.35]" 
        />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <span className="block text-[#C9963F] text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 font-semibold">Yerushalaim, Israel</span>
          <h1 className="text-3xl md:text-8xl mb-6 md:mb-8 leading-tight font-semibold serif">Premier Torah Education</h1>
          <p className="text-base md:text-2xl font-light tracking-wide italic text-gray-200 max-w-3xl mx-auto leading-relaxed">
            "A sanctuary for serious bochrim to elevate their learning, refine their character, and build their future in the heart of Yerushalayim Ir HaKodesh."
          </p>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a href="#/apply" className="bg-[#7D1D3F] text-white px-8 md:px-10 py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#9B5027] transition-all transform hover:-translate-y-1 whitespace-nowrap">Apply for Admission</a>
            <a href="#/contact" className="border border-white text-white px-8 md:px-10 py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] rounded-sm hover:bg-white hover:text-[#0F1729] transition-all transform hover:-translate-y-1 whitespace-nowrap">Support the Yeshiva</a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* Intro Section - The Vision */}
      <section className="section-padding bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#C9963F] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">About Us</span>
          <h2 className="text-3xl md:text-5xl mb-8 md:mb-10 text-[#2C3E50] serif italic font-semibold">Yeshivas Yedid Hamelech</h2>
          <div className="w-24 h-[2px] bg-[#C9963F] mx-auto mb-8 md:mb-12"></div>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-light italic">
            Yeshivas Yedid Hamelech is a third year and above Yeshiva for serious bochrim to take their limud haiyuin, hashkofo, and the opportunity, for the higher level bochrim, to learn shmaysa aliba dehilchso in a premier kollel in Yerushalayim Ir Hakodesh.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">
            Our Yeshiva is filled with avreichim, poskim, and talmidei chachomim giving the bochrim an envelopment of seriousness, care, and kedusha. Under the direction of Rosh HaYeshiva VeRosh HaKollel Rov Yonatan Dorfman shlita, the bochrim have access to the highest forms of iyuin, pilpul, and shimush in psak.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 mb-12">
            The Mashgiach Rov Binyamin Dennis shlita guides each and every bochur on their quest for the Boreh Olam and ensures an uplifting environment for all the bochrim along with the rest of our staff.
          </p>
          <div className="p-8 border-l-4 border-[#7D1D3F] bg-[#F8F5F0] inline-block text-left max-w-2xl">
             <p className="text-[#2C3E50] font-medium italic text-lg">
               "The focus of the Yeshiva is gemara iyuin, bekiyus, psak beiyuin, and hashkafo — all the essential pillars of a yid's life."
             </p>
          </div>
        </div>
      </section>

      {/* Three Tracks - The Pillars */}
      <section className="section-padding bg-[#2C3E50] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#C9963F] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Program</span>
              <h2 className="text-3xl md:text-5xl serif leading-tight text-white">Our Educational Pillars</h2>
            </div>
            <div className="hidden md:block">
              <div className="h-[2px] w-32 bg-[#C9963F]"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border border-gray-800">
            {[
              {
                title: "Gemara Iyun & Bekiyus",
                desc: "Intensive focus on the depths of the Gemara, developing the rigorous analytical tools required for independent high-level learning.",
                number: "01"
              },
              {
                title: "Psak Beiyuin",
                desc: "Higher-level bochrim integrate into our premier Kollel, learning shmaysa aliba dehilchso with renowned poskim.",
                number: "02"
              },
              {
                title: "Hashkafa",
                desc: "Nurturing the soul and mind with authentic Jewish thought to build the internal foundations for a lifetime as a dedicated Jew.",
                number: "03"
              }
            ].map((track, i) => (
              <div key={i} className="p-8 md:p-12 bg-[#1a2533] hover:bg-[#C9963F] hover:text-[#2C3E50] transition-all duration-500 group border-b md:border-b-0 md:border-r last:border-0 border-[#3a4555]">
                <span className="text-4xl md:text-5xl font-bold opacity-20 mb-6 md:mb-8 block group-hover:opacity-100 transition-opacity serif italic text-[#C9963F] group-hover:text-[#2C3E50]">{track.number}</span>
                <h3 className="text-xl md:text-2xl mb-4 md:mb-6 serif font-bold text-white group-hover:text-[#2C3E50]">{track.title}</h3>
                <p className="text-sm md:text-base text-gray-300 group-hover:text-[#2C3E50] leading-relaxed transition-colors">{track.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Beis Medrash Program */}
            <div className="bg-[#1a2533] p-8 rounded-lg border-2 border-[#C9963F]">
              <h3 className="text-2xl font-bold text-[#C9963F] mb-6 text-center">BEIS MEDRASH PROGRAM</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>3 SEDARIM PER DAY</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>2 SEDARIM IN IYUN</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>1 SEDER IN BEKIYUS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>SHIUR MULTIPLE TIMES/WEEK FROM THE IYUN SEDER REBBE</span>
                </li>
              </ul>
            </div>

            {/* Smicha Program */}
            <div className="bg-[#1a2533] p-8 rounded-lg border-2 border-[#C9963F]">
              <h3 className="text-2xl font-bold text-[#C9963F] mb-6 text-center">SMICHA PROGRAM</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>3 SEDARIM PER DAY</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>2 SEDARIM IN GEMARA, RISHONIM, TUR, SHULCHAN ARUCH, NOSEI KEILIM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>1 SEDER BEKIYUS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>SHIUR AND SHIMUSH IN PSAK</span>
                </li>
              </ul>
            </div>

            {/* Hybrid Program */}
            <div className="bg-[#1a2533] p-8 rounded-lg border-2 border-[#C9963F]">
              <h3 className="text-2xl font-bold text-[#C9963F] mb-6 text-center">HYBRID PROGRAM</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>FOR TALMIDIM INTERESTED IN PURSUING A UNIVERSITY LEVEL DEGREE</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>UNIVERSITY COURSES OFFERED WITH IN-PERSON AND SELF-PACED OPTIONS AVAILABLE</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>COURSES SPAN FINANCE, COMPUTER SCIENCE, PSYCHOLOGY, BIOLOGY, BUSINESS, AND MORE</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>YESHIVA CAN COUNT TOWARDS UNIVERSITY CREDITS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>SPECIAL DISCOUNTED RATE PER CREDIT</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>FINANCIAL AID AVAILABLE FOR ELIGIBLE STUDENTS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C9963F] mt-1">👑</span>
                  <span>COURSES DESIGNED TO NOT INTERFERE WITH SEDER TIMES</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section - Refined */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[#C9963F] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Staff</span>
            <h2 className="text-3xl md:text-5xl text-[#2C3E50] serif font-bold">Hanhala & Leadership</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Rosh Yeshiva Card */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-white p-6 md:p-10 rounded shadow-xl border-t-4 border-[#7D1D3F]">
              <div className="shrink-0 w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded shadow-lg">
                <img 
                  src="/images/Rav Yonatan Dorfman.jpeg" 
                  alt="Rav Yonatan Dorfman" 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-2xl mb-1 text-[#2C3E50] font-semibold serif italic">Rav Yonatan Dorfman shlita</h3>
                <p className="text-[#C9963F] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">Rosh HaYeshiva VeRosh HaKollel</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  A talmid muvhak of HaGaon Rav Asher Weiss, shlit"a, Rav Dorfman has taught in kollelim and yeshivos for years and currently serves as Rosh Kollel of Kollel Emek HaTorah. He studied at Yeshiva of Greater Washington, Ateres Yerushalayim, Yeshiva University and Mir, where he learned under Rav Asher Arieli, shlit"a.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Rav Dorfman gives the shiur klali in halacha for the entire beis medrash, covering poskim, Shas, rishonim, the Tur, Shulchan Aruch, and up to modern-day Acharonim in-depth.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  He has extensive experience in psak halacha, having received shimush from many prominent rabbanim and maintains strong connections with gedolim. He is regularly consulted on a wide range of halachic issues, and brings this real-world halachic expertise into his teaching and mentorship.
                </p>
              </div>
            </div>

            {/* Mashgiach Card */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-white p-6 md:p-10 rounded shadow-xl border-t-4 border-[#7D1D3F]">
              <div className="shrink-0 w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded shadow-lg">
                <img 
                  src="/images/The mashgiach Rov Binyamin Dennis.jpeg" 
                  alt="Rav Binyomin Dennis" 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-2xl mb-1 text-[#2C3E50] font-semibold serif italic">Rav Binyomin Dennis shlita</h3>
                <p className="text-[#C9963F] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">Mashgiach</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Originally from Miami, Florida, Rav Dennis brings deep dedication to Torah learning and student development to his role as Mashgiach. He learned for three years at Yeshivat Shaalvim, followed by study at the Mir Yeshiva, and then continued for an additional three years at Yeshiva Gedolah of the Five Towns.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Rav Dennis subsequently returned to the Mir Yeshiva, where he learned for nearly a decade—four years under Rav Asher Arieli and the past five years as part of the Mir's Chaburas Shas.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  In addition to his Torah education, Rav Dennis earned a BA in Accounting from Touro University, reflecting both intellectual rigor and a strong sense of responsibility and discipline.
                </p>
                <p className="text-[#7D1D3F] text-sm font-medium italic">
                  Rav Dennis is a natural fit as a Mashgiach, known for the tremendous warmth, care, and personal attention he gives to each student. He is deeply invested in their growth and is committed to helping every talmid reach his full spiritual and personal potential.
                </p>
              </div>
            </div>

            {/* Rav Goldschneider Card */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-white p-6 md:p-10 rounded shadow-xl border-t-4 border-[#7D1D3F]">
              <div className="shrink-0 w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded shadow-lg">
                <img 
                  src="/images/Rav Aaron Goldschneider.jpg" 
                  alt="Rav Aaron Goldschneider" 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-2xl mb-1 text-[#2C3E50] font-semibold serif italic">Rav Aaron Goldschneider shlita</h3>
                <p className="text-[#C9963F] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">Maggid Shiur</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Rav Goldschneider is a dedicated talmid chacham with a passion for teaching Gemara with clarity and depth. His journey began at Yeshivas Netiv Aryeh in Yerushalayim, followed by extensive study at the Mir Yeshiva.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  He furthered his learning in kollelim in Yerushalayim and London, including under Rav Chizkiyahu Nebenzahl shlit"a in the Old City, where he deepened his understanding of halacha and mussar.
                </p>
                <p className="text-[#7D1D3F] text-sm font-medium italic">
                  He brings a focused, analytical approach to his iyun shiur.
                </p>
              </div>
            </div>

            {/* Rav Blumenau Card */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-white p-6 md:p-10 rounded shadow-xl border-t-4 border-[#7D1D3F]">
              <div className="shrink-0 w-40 h-52 md:w-48 md:h-64 overflow-hidden rounded shadow-lg">
                <img 
                  src="/images/Rav Chaim Blumenau.avif" 
                  alt="Rav Chaim Blumenau" 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-2xl mb-1 text-[#2C3E50] font-semibold serif italic">Rav Chaim Blumenau shlita</h3>
                <p className="text-[#C9963F] text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">Senior Avreich</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  With mastery of all of Shas and many years of learning, Rav Blumenau is a living resource of Torah in the beis medrash.
                </p>
                <p className="text-[#7D1D3F] text-sm font-medium italic">
                  Originally from South Africa, he learned in Yeshivas Meshech Chochma and Ponevezh and currently is a senior avreich in Kollel Emek HaTorah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-[#2C3E50]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9963F] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Life at the Yeshiva</span>
            <h2 className="text-4xl md:text-5xl text-white serif italic font-semibold mb-4">Our Community</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Torah learning, Shabbos seudos, and the vibrancy of yeshiva life in Yerushalayim</p>
          </div>

          {/* Study & Learning */}
          <div className="mb-16">
            <h3 className="text-2xl text-[#C9963F] serif mb-8 text-center">Torah Learning</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/learning.jpeg')}>
                <img src="/images/learning.jpeg" alt="Students learning in pairs" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/learning2.jpeg')}>
                <img src="/images/learning2.jpeg" alt="Chavrusa learning" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/learning3.jpeg')}>
                <img src="/images/learning3.jpeg" alt="Beis Medrash" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/discussing.jpeg')}>
                <img src="/images/discussing.jpeg" alt="Learning discussion" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/guiding.jpeg')}>
                <img src="/images/guiding.jpeg" alt="Guided learning" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/teaching.jpeg')}>
                <img src="/images/teaching.jpeg" alt="Teaching session" className="w-full h-56 md:h-64 object-contain transition-all duration-500 hover:scale-105" />
              </div>
            </div>
          </div>

          {/* Chagim and Simchas */}
          <div className="mb-16">
            <h3 className="text-2xl text-[#C9963F] serif mb-8 text-center">Chagim and Simchas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/seudah.jpeg')}>
                <img src="/images/seudah.jpeg" alt="Community seuda" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/seudah2.jpeg')}>
                <img src="/images/seudah2.jpeg" alt="Festive meal" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/seudah3.jpeg')}>
                <img src="/images/seudah3.jpeg" alt="Community gathering" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/seudah4.jpeg')}>
                <img src="/images/seudah4.jpeg" alt="Yeshiva meal" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/kumzits.jpeg')}>
                <img src="/images/kumzits.jpeg" alt="Kumzitz gathering" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/kumzits2.jpeg')}>
                <img src="/images/kumzits2.jpeg" alt="Evening kumzitz" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage('/images/guitar-chill.jpeg')}>
                <img src="/images/guitar-chill.jpeg" alt="Musical gathering" className="w-full h-56 md:h-48 object-contain transition-all duration-500 hover:scale-105" />
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Community & Amenities - High Contrast */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#fcfaf5] rounded-full -z-10 animate-pulse"></div>
            <div className="relative">
              <img src="/images/EmekRefaimStreetJerusalemFeb102023_17.jpg" className="rounded shadow-2xl" alt="Emek Refaim Street" />
              <div className="absolute -bottom-6 -right-6 bg-[#d4af37] p-8 text-[#0a192f] font-bold rounded shadow-2xl hidden md:block">
                <p className="text-2xl">Modern</p>
                <p className="text-sm uppercase tracking-widest">Amenities</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#C9963F] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">The Neighborhood</span>
            <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 text-[#2C3E50] serif italic font-semibold">The Kehilla and Amenities</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              The Yeshiva is located in the heart of Yerushalayim's <strong>Emek Refaim</strong> neighborhood in a warm anglo baalabatish community that looks up to the Bochurei and avreichei habeis medrash.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              The Yeshiva also has a <strong>brand new gym</strong> for the bochrim to use bein hasedarim, ensuring physical health alongside spiritual vigor.
            </p>
            <a href="#/contact" className="inline-block bg-[#7D1D3F] text-white px-12 py-4 text-xs font-semibold uppercase tracking-[0.25em] rounded-sm shadow-xl hover:bg-[#9B5027] transition-all">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#C9963F] text-[#2C3E50] text-center">
        <div className="max-w-3xl mx-auto px-4">
           <h2 className="text-3xl md:text-5xl serif mb-6 md:mb-8 italic font-bold">Begin Your Journey</h2>
           <p className="text-base md:text-xl mb-8 md:mb-12 opacity-80 leading-relaxed">Join a community of serious bochrim dedicated to reaching their full potential in Yerushalaim Ir HaKodesh.</p>
           <a href="#/apply" className="bg-[#7D1D3F] text-white px-12 py-5 rounded shadow-2xl text-sm font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#7D1D3F] transition-all">Start Your Application</a>
        </div>
      </section>

      {/* Haskama Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-[#C9963F] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Haskama</span>
          <div className="w-24 h-[2px] bg-[#C9963F] mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-4 border-[#7D1D3F] rounded-lg overflow-hidden shadow-2xl bg-white">
              <img 
                src="/images/haskama.jpg" 
                alt="Haskama 1"
                className="w-full h-[400px] md:h-[800px] object-contain bg-white"
              />
            </div>
            <div className="border-4 border-[#7D1D3F] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/images/haskama2.jpg" 
                alt="Haskama 2"
                className="w-full h-[400px] md:h-[800px] object-contain bg-white"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/images/haskama.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#7D1D3F] text-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#9B5027] transition-all"
            >
              View Haskama 1
            </a>
            <a 
              href="/images/haskama2.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#7D1D3F] text-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-[#9B5027] transition-all"
            >
              View Haskama 2
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
