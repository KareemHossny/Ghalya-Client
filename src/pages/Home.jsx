import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestsellers();
  }, []);

  const fetchBestsellers = async () => {
    try {
      const response = await productAPI.getBestsellers();
      setBestsellers(response.data);
    } catch (error) {
      console.log('لم يتم العثور علي المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "غاليه - متجر الإسدالات الحريمي",
    "url": "https://ghalya.vercel.app",
    "description": "أجمل الإسدالات الحريمي بأفضل الأسعار والجودة - تسوقي الآن من غاليه",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ghalya.vercel.app/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>غاليه - أجمل الإسدالات الحريمي بأفضل الأسعار | متجر أونلاين</title>
        <meta name="description" content="اكتشفوا أجمل تشكيلة الإسدالات الحريمي من غاليه. جودة عالية، أسعار مناسبة، توصيل سريع لجميع أنحاء مصر. تسوقي الآن واستمتعي بتجربة شراء فريدة." />
        <meta name="keywords" content="إسدالات حريمي, ملابس نسائية, موضة, تسوق أونلاين, غاليه, إسدالات, أزياء, ملابس محجبات, أزياء إسلامية" />
        <meta property="og:title" content="غاليه - أجمل الإسدالات الحريمي بأفضل الأسعار" />
        <meta property="og:description" content="اكتشفوا تشكيلة غاليه المميزة من الإسدالات الحريمي. جودة فائقة وتصميمات أنيقة تناسب جميع الأذواق." />
        <meta property="og:image" content="https://ghalya.vercel.app/logo.png" />
        <meta property="og:url" content="https://ghalya.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="غاليه - أجمل الإسدالات الحريمي" />
        <meta name="twitter:description" content="تسوقي أحدث تشكيلة الإسدالات الحريمي من غاليه" />
        <link rel="canonical" href="https://ghalya.vercel.app" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              مرحباً بكم في <span className="text-pink-200">غاليه</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 opacity-95 leading-relaxed max-w-4xl mx-auto">
              أجمل الإسدالات الحريمي بأفضل الأسعار والجودة
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-pink-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              تسوق الآن
            </Link>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">لماذا تختاري غاليه؟</h2>
            <div className="w-32 h-1.5 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">جودة عالية</h3>
              <p className="text-gray-600 text-lg leading-relaxed">منتجاتنا مصنوعة من أفضل الخامات بأعلى معايير الجودة والأناقة</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">توصيل سريع</h3>
              <p className="text-gray-600 text-lg leading-relaxed">خدمة توصيل سريعة وآمنة لجميع أنحاء مصر خلال 2-3 أيام</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">دفع آمن</h3>
              <p className="text-gray-600 text-lg leading-relaxed">الدفع عند الاستلام مع ضمان استرجاع المنتج خلال 14 يوم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section with Swiper */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">الأكثر مبيعاً</h2>
            <div className="w-32 h-1.5 bg-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed">
              اكتشفي أفضل منتجاتنا المميزة التي يحبها عملاؤنا
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="large" text="جاري تحميل المنتجات..." />
            </div>
          ) : (
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination',
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
                className="pb-16"
              >
                {bestsellers.map(product => (
                  <SwiperSlide key={product._id}>
                    <div className="p-4 h-full">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="swiper-button-next absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>

              {/* Custom Pagination */}
              <div className="swiper-pagination mt-16 flex justify-center gap-2"></div>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center bg-pink-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">جاهزه للتسوق؟</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
            انضمي إلى آلاف العملاء الراضين عن منتجاتنا واستمتعي بتجربة تسوق فريدة
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-pink-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              تصفح المجموعة
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              تعرف علينا أكثر
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>

  );
};

export default Home;