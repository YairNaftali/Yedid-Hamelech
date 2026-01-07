
import React from 'react';

const Contact: React.FC = () => {
  const GIVEBUTTER_WIDGET_URL = "https://givebutter.com/embed/c/hUvEmO?goalBar=false&gba_gb.element.id=LWe81p";
  
  const donationMethods = [
    { name: "Zelle", details: "yedidhamelech@gmail.com", color: "bg-purple-600" },
    { name: "PayPal", details: "yedidhamelech@gmail.com", color: "bg-blue-600" },
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-[#1a5f7a] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Get Involved</span>
          <h1 className="text-4xl md:text-6xl text-[#0F1729] serif italic font-semibold">Contact & Support</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details Column */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl serif mb-8 text-[#0a192f] font-bold italic border-b border-gray-100 pb-4">Contact the Yeshiva</h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#fcfaf5] rounded-full flex items-center justify-center text-[#d4af37] shrink-0 shadow-inner group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#0a192f] tracking-wide uppercase text-xs">Location</h4>
                    <p className="text-gray-600 leading-relaxed italic">Emek Refaim Neighborhood<br />Jerusalem, Israel</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#fcfaf5] rounded-full flex items-center justify-center text-[#d4af37] shrink-0 shadow-inner group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-[#0a192f] tracking-wide uppercase text-xs">Email Us</h4>
                    <p className="text-gray-600 leading-relaxed italic">yedidhamelech@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-4">Alternative Methods</h3>
              {donationMethods.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-[#F8F5F0] rounded border border-gray-100 group hover:border-[#C9963F] transition-all">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 ${m.color} rounded shadow-lg text-white flex items-center justify-center font-bold text-xl`}>{m.name[0]}</div>
                    <div>
                      <h4 className="font-bold text-[#0a192f] uppercase text-xs tracking-widest">{m.name}</h4>
                      <p className="text-sm text-gray-500 italic">{m.details}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(m.details);
                      alert('Copied to clipboard');
                    }} 
                    className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#0a192f] border border-[#d4af37] px-4 py-2 rounded transition-all"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#2C3E50] text-white p-8 rounded shadow-2xl border-l-8 border-[#7D1D3F]">
                <h4 className="text-xl serif italic mb-6 text-[#1a5f7a] font-semibold">Bank Transfer (ACH/Wire)</h4>
                <div className="space-y-4 text-sm font-mono text-gray-400">
                  <div className="flex justify-between border-b border-[#1a2f3f] pb-2">
                    <span className="uppercase text-[10px] tracking-widest text-gray-500">Bank</span>
                    <span className="text-white">Salem Five</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a2f3f] pb-2">
                    <span className="uppercase text-[10px] tracking-widest text-gray-500">Account Name</span>
                    <span className="text-white">Yeshivas Yedid Hamelech</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase text-[10px] tracking-widest text-gray-500">Account #</span>
                    <span className="text-white">10002432024</span>
                  </div>
                </div>
              </div>
          </div>

          {/* GiveButter Widget Column */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl serif mb-8 text-[#0a192f] font-bold italic border-b border-gray-100 pb-4">Secure Giving Widget</h2>
            <div className="bg-[#F8F5F0] p-2 rounded-xl shadow-inner border border-gray-100 overflow-hidden">
              <iframe 
                src={GIVEBUTTER_WIDGET_URL}
                name="givebutter"
                className="w-full h-[700px] border-0 rounded-lg shadow-sm"
                allow="payment"
                title="GiveButter Donation Widget"
              ></iframe>
            </div>
            <p className="mt-4 text-center text-xs text-gray-400 italic">
              Donations are processed securely through GiveButter. 100% of your contribution supports our talmidim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
