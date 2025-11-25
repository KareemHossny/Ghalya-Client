import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">من نحن</h1>
          <div className="w-32 h-1.5 bg-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed">
            قصة نجاحنا تبدأ من إيماننا بجمال وتميز كل امرأة
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              رسالتنا في <span className="text-pink-600">غاليه</span>
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-xl leading-relaxed">
                نحن في غاليه نؤمن بأن كل امرأة تستحق أن تبدو جميلة وأنيقة. منذ تأسيسنا، 
                كنا ملتزمين بتقديم أجمل الإسدالات الحريمي التي تجمع بين الأناقة والجودة 
                والسعر المناسب.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed">
                نحرص على اختيار أفضل الخامات وتصميم منتجاتنا بعناية فائقة لتلبي 
                تطلعات عملائنا الكرام وتناسب أذواقهم المميزة.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed">
                فريقنا من المصممين المحترفين يعمل باستمرار على تطوير تصاميمنا 
                لتواكب أحدث صيحات الموضة مع الحفاظ على الأصالة والأناقة.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="About Galia"
                className="w-full h-[600px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pink-600 text-white p-8 rounded-2xl shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+5,000</div>
                <div className="text-lg">عميلة سعيدة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-24">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">الجودة المتميزة</h3>
              <p className="text-gray-600 text-lg leading-relaxed">نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا لضمان رضاكم التام</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">العميل أولاً</h3>
              <p className="text-gray-600 text-lg leading-relaxed">رضا عملائنا هو غايتنا الأولى ونسعى دائماً لتجاوز توقعاتهم في كل تفصيلة</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">الابتكار المستمر</h3>
              <p className="text-gray-600 text-lg leading-relaxed">نطور منتجاتنا باستمرار لنواكب أحدث صيحات الموضة العالمية مع الحفاظ على الأصالة</p>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-16 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">انضمي إلى عائلة غاليه</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-95">
            اكتشفي أحدث تشكيلاتنا من الإسدالات الحريمي وتمتعي بتجربة تسوق فريدة لا تُنسى
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-pink-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ابدأ التسوق الآن
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;