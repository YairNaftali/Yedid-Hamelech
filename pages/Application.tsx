
import React, { useState } from 'react';

const Application: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    highSchool: '',
    currentYeshiva: '',
    rabbiReference: '',
    rabbiPhone: '',
    essay: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend to send email to yedidhamelech@gmail.com
    // For now, showing success message
    alert(`Application successfully submitted! Our hanhala will review your information and be in touch soon at ${formData.email}.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 bg-[#F8F5F0]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#1a5f7a] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Apply Now</span>
          <h1 className="text-4xl md:text-6xl text-[#0F1729] serif italic font-semibold mb-6">Application</h1>
          <p className="text-gray-600 italic">Please complete the form below with accuracy. Our staff will contact you shortly after submission.</p>
        </div>

        <div className="bg-white shadow-2xl rounded p-8 md:p-16 border-t-8 border-[#1a5f7a]">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Personal Information */}
            <div>
              <h3 className="text-xl serif font-semibold text-[#0F1729] border-b border-gray-100 pb-4 mb-8">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                  <input required name="firstName" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                  <input required name="lastName" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                  <input required name="email" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Primary Phone</label>
                  <input required name="phone" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="tel" />
                </div>
              </div>
            </div>

            {/* Academic History */}
            <div>
              <h3 className="text-xl serif font-bold text-[#0a192f] border-b border-gray-100 pb-4 mb-8">Educational History</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Current Yeshiva</label>
                  <input required name="currentYeshiva" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Reference Rabbi</label>
                  <input required name="rabbiReference" onChange={handleChange} className="w-full bg-[#F8F5F0] border-0 border-b-2 border-gray-200 focus:border-[#C9963F] outline-none py-3 px-4 text-gray-800 transition-colors" type="text" />
                </div>
              </div>
            </div>

            {/* Essay */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">What are your goals for this coming year?</label>
              <textarea 
                name="essay" 
                onChange={handleChange} 
                rows={6} 
                className="w-full bg-[#fcfaf5] border-2 border-gray-100 rounded-lg p-6 focus:border-[#d4af37] outline-none text-gray-800 transition-all"
                placeholder="Tell us about your aspirations and why you believe Yedid Hamelech is the right fit..."
              ></textarea>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full bg-[#7D1D3F] text-white py-6 text-xs font-bold uppercase tracking-[0.4em] rounded shadow-2xl hover:bg-[#C9963F] hover:text-[#2C3E50] transition-all transform hover:-translate-y-1">
                Submit Formal Application
              </button>
              <p className="mt-6 text-center text-xs text-gray-400 italic">By clicking submit, you acknowledge that all information provided is accurate and true.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
