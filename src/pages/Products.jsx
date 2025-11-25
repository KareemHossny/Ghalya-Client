import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.log('لم يتم العثور علي المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'bestsellers') return product.bestseller;
    if (filter === 'available') return product.stock > 0;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="جاري تحميل المنتجات..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">منتجاتنا</h1>
          <div className="w-32 h-1.5 bg-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed">
            اكتشفي أحدث تشكيلة الإسدالات الحريمي من غاليه، مصممة خصيصاً لراحتك وأناقتك
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              filter === 'all'
                ? 'bg-pink-600 text-white shadow-2xl'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 shadow-lg hover:shadow-xl'
            }`}
          >
            جميع المنتجات
          </button>
          <button
            onClick={() => setFilter('bestsellers')}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              filter === 'bestsellers'
                ? 'bg-pink-600 text-white shadow-2xl'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 shadow-lg hover:shadow-xl'
            }`}
          >
            الأكثر مبيعاً
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              filter === 'available'
                ? 'bg-pink-600 text-white shadow-2xl'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 shadow-lg hover:shadow-xl'
            }`}
          >
            المتوفر حالياً
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-2xl">
            <svg className="w-32 h-32 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-3xl font-semibold text-gray-600 mb-4">لا توجد منتجات</h3>
            <p className="text-gray-500 text-xl">لم نعثر على منتجات تطابق معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-16">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">هل تبحثين عن شيء محدد؟</h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
            إذا لم تجدي ما تبحثين عنه، لا تترددي في التواصل معنا. فريقنا متاح لمساعدتك في العثور على المنتج المثالي
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-pink-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              تواصل معنا
            </Link>
            <Link
              to="/"
              className="inline-flex items-center border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;