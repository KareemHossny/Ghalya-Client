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

  const updateQuantity = async (productId, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItem(`${productId}-${selectedSize}`);
    
    setTimeout(() => {
      const updatedCart = cart.map(item => 
        item.product._id === productId && item.selectedSize === selectedSize 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
      setUpdatingItem(null);
    }, 300);
  };

  const removeItem = (productId, selectedSize) => {
    const updatedCart = cart.filter(item => 
      !(item.product._id === productId && item.selectedSize === selectedSize)
    );
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

  const getUniqueItemsCount = () => {
    return cart.length;
  };

  if (loading) {
    return <LoadingSpinner size="large" text="جاري تحميل سلة التسوق..." />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center py-8 px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
            <svg className="w-16 h-16 md:w-20 md:h-20 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">سلة التسوق فارغة</h2>
          <p className="text-gray-600 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed">
            لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ التسوق لاكتشاف منتجاتنا المميزة.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-pink-600 text-white rounded-2xl font-bold text-lg md:text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            ابدأ التسوق الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-6 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">سلة التسوق</h1>
            <div className="w-24 md:w-32 h-1.5 bg-pink-600 mx-auto mb-4 md:mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg md:text-2xl">
              راجع منتجاتك وأتمم طلبك
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    المنتجات ({getUniqueItemsCount()} منتج)
                  </h2>
                  <span className="text-gray-600 text-base sm:text-lg font-medium hidden sm:block">السعر</span>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {cart.map(item => (
                    <div key={`${item.product._id}-${item.selectedSize}`} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300">
                      {/* Product Image */}
                      <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                        <div className="relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg md:rounded-xl flex-shrink-0 shadow-md"
                          />
                          {item.product.bestseller && (
                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                              الأكثر مبيعاً
                            </span>
                          )}
                        </div>
                        
                        {/* Mobile Price */}
                        <div className="sm:hidden text-left">
                          <p className="font-bold text-gray-800 text-lg">
                            {item.product.price * item.quantity} ج.م
                          </p>
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-grow space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 text-lg sm:text-xl leading-tight">
                              {item.product.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                                المقاس: {item.selectedSize}
                              </span>
                              <p className="text-pink-600 font-bold text-base sm:text-lg">
                                {item.product.price} ج.م
                              </p>
                            </div>
                            {item.product.description && (
                              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {item.product.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Desktop Price */}
                          <div className="hidden sm:block text-left min-w-20">
                            <p className="font-bold text-gray-800 text-lg md:text-xl">
                              {item.product.price * item.quantity} ج.م
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div className="flex items-center border-2 border-gray-300 rounded-lg md:rounded-xl bg-white w-fit">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.selectedSize, item.quantity - 1)}
                              className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1 || updatingItem === `${item.product._id}-${item.selectedSize}`}
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 font-semibold min-w-10 sm:min-w-12 text-center text-sm sm:text-base">
                              {updatingItem === `${item.product._id}-${item.selectedSize}` ? (
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.selectedSize, item.quantity + 1)}
                              className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={updatingItem === `${item.product._id}-${item.selectedSize}`}
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product._id, item.selectedSize)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors w-fit"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            إزالة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Link
                    to="/products"
                    className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    ← الاستمرار في التسوق
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('cart');
                      setCart([]);
                      window.dispatchEvent(new Event('storage'));
                    }}
                    className="flex-1 text-center bg-red-100 text-red-700 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                  >
                    تفريغ السلة
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 sm:p-6 md:p-8 sticky top-4 md:top-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 md:mb-8 pb-4 border-b border-gray-200">ملخص الطلب</h2>
                
                <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                  <div className="flex justify-between text-gray-600 text-base sm:text-lg">
                    <span>عدد المنتجات:</span>
                    <span className="font-semibold">{getTotalItems()} قطعة</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-base sm:text-lg">
                    <span>المنتجات المختلفة:</span>
                    <span className="font-semibold">{getUniqueItemsCount()} منتج</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-base sm:text-lg">
                    <span>تكلفة الشحن:</span>
                    <span className="text-green-600 font-semibold">سيتم حسابها لاحقاً</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 md:pt-5">
                    <div className="flex justify-between text-xl sm:text-2xl font-bold text-gray-800">
                      <span>المجموع:</span>
                      <span>{getTotalPrice()} ج.م</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:from-pink-700 hover:to-purple-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-4 md:mb-6 shadow-lg"
                >
                  إتمام الطلب
                </button>

                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    سيتم حساب مصاريف الشحن في صفحة إتمام الطلب
                  </p>
                </div>

                {/* Additional Features */}
                <div className="mt-6 md:mt-8 space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-gray-200">
                  <div className="flex items-center text-green-600 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    شحن لجميع المحافظات
                  </div>
                  <div className="flex items-center text-green-600 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    خدمة إرجاع خلال 14 يوم
                  </div>
                  <div className="flex items-center text-green-600 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    دفع آمن عند الاستلام
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">ملخص السلة:</h3>
                  <div className="space-y-2 text-sm">
                    {cart.map(item => (
                      <div key={`${item.product._id}-${item.selectedSize}`} className="flex justify-between items-center">
                        <span className="text-gray-600 truncate flex-1">
                          {item.product.name} - {item.selectedSize}
                        </span>
                        <span className="text-gray-800 font-medium whitespace-nowrap">
                          {item.quantity} × {item.product.price} ج.م
                        </span>
                      </div>
                    ))}
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