import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                {!logoError ? (
                  <img 
                    src="/photo_2025-11-24_21-16-32.jpg" 
                    alt="لوجو غاليه"
                    className="w-full h-full object-cover"
                    onError={handleLogoError}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="font-bold text-white text-2xl">غ</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  غاليه
                </h3>
                <p className="text-gray-300 text-lg">إسدالات حريمي</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              متجر غاليه يقدم أجمل الإسدالات الحريمي بأعلى جودة وأفضل الأسعار. 
              نسعى دائماً لتقديم الأفضل لعملائنا الكرام مع أحدث صيحات الموضة وأنسب التصميمات.
            </p>
            <div className="flex space-x-5 rtl:space-x-reverse pt-4">
              <a
                href="https://m.facebook.com/share/1T62NdyNFi/?mibextid=wwXIfr&ref=waios.fb_links_xma_control&wtsid=rdr_0OGZzxVRkLx7AyXNw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 p-3 bg-gray-800 hover:bg-pink-900/20 rounded-xl hover:scale-110"
                aria-label="فيسبوك"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326V22.67c0 .733.593 1.326 1.326 1.326H12.82V14.7h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.144v3.248l-1.919.001c-1.504 0-1.797.715-1.797 1.763V11.08h3.587l-.467 3.62h-3.12v9.295H22.68c.73 0 1.32-.596 1.32-1.326V1.326C24 .592 23.404 0 22.675 0" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/_____ghalia_brand/?igsh=cm5qbXFqMnJvOWJw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 p-3 bg-gray-800 hover:bg-pink-900/20 rounded-xl hover:scale-110"
                aria-label="انستجرام"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-2 border-r-4 border-pink-400 pr-3">
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-300 hover:text-pink-400 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse hover:pr-2 group"
                >
                  <span className="w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>المنتجات</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-pink-400 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse hover:pr-2 group"
                >
                  <span className="w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-pink-400 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse hover:pr-2 group"
                >
                  <span className="w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>اتصل بنا</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-2 border-r-4 border-pink-400 pr-3">
              معلومات الاتصال
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-3 rtl:space-x-reverse hover:text-pink-300 transition-colors duration-300">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>0123456789</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse hover:text-pink-300 transition-colors duration-300">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>info@galia.com</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse hover:text-pink-300 transition-colors duration-300">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>السويس, مصر</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            &copy; 2025 غاليه. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;