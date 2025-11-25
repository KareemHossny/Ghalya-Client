import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItem(productId);
    
    // محاكاة تأخير بسيط للتحديث
    setTimeout(() => {
      const updatedCart = cart.map(item => 
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      );
      
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
      setUpdatingItem(null);
    }, 300);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return <LoadingSpinner size="large" text="جاري تحميل سلة التسوق..." />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-40 h-40 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg className="w-20 h-20 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">سلة التسوق فارغة</h2>
          <p className="text-gray-600 mb-10 text-xl leading-relaxed">
            لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ التسوق لاكتشاف منتجاتنا المميزة.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-10 py-5 bg-pink-600 text-white rounded-2xl font-bold text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-7 h-7 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            ابدأ التسوق الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">سلة التسوق</h1>
            <div className="w-32 h-1.5 bg-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-2xl">
              راجع منتجاتك وأتمم طلبك
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    المنتجات ({getTotalItems()} منتج)
                  </h2>
                  <span className="text-gray-600 text-lg font-medium">السعر</span>
                </div>

                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.product._id} className="flex items-center gap-6 p-6 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-28 h-28 object-cover rounded-xl flex-shrink-0 shadow-md"
                        />
                        {item.product.bestseller && (
                          <span className="absolute -top-2 -right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            الأكثر مبيعاً
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <h3 className="font-bold text-gray-800 text-xl leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-pink-600 font-bold text-lg">
                          {item.product.price} ج.م
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1 || updatingItem === item.product._id}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 font-semibold min-w-12 text-center">
                              {updatingItem === item.product._id ? (
                                <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={item.quantity >= item.product.stock || updatingItem === item.product._id}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-base flex items-center gap-2 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            إزالة
                          </button>
                        </div>
                      </div>

                      <div className="text-left">
                        <p className="font-bold text-gray-800 text-xl">
                          {item.product.price * item.quantity} ج.م
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">ملخص الطلب</h2>
                
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>عدد المنتجات:</span>
                    <span className="font-semibold">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>تكلفة الشحن:</span>
                    <span className="text-green-600 font-semibold">0</span>
                  </div>
                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex justify-between text-2xl font-bold text-gray-800">
                      <span>الإجمالي:</span>
                      <span>{getTotalPrice()} ج.م</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-6 shadow-lg"
                >
                  إتمام الطلب
                </button>

                <Link
                  to="/products"
                  className="block text-center text-gray-600 hover:text-pink-600 transition-colors font-semibold text-lg py-3 border-2 border-gray-300 rounded-2xl hover:border-pink-600"
                >
                  ← الاستمرار في التسوق
                </Link>

                {/* Additional Features */}
                <div className="mt-8 space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-green-600 text-sm">
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    شحن  لجميع المحافظات
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                     خدمة إرجاع خلال 14 يوم
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    دفع آمن عند الاستلام
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;