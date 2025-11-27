import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { orderAPI, shippingAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [governorates, setGovernorates] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    governorate: '',
    notes: ''
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      navigate('/');
      return;
    }
    setCart(savedCart);
    fetchGovernorates();
  }, [navigate]);

  const fetchGovernorates = async () => {
    try {
      setLoading(true);
      const response = await shippingAPI.getGovernorates();
      setGovernorates(response.data);
      setFetchError('');
    } catch (error) {
      console.error('Error fetching governorates:', error);
      setFetchError('تعذر تحميل بيانات المحافظات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);

    if (name === 'governorate' && value) {
      try {
        const response = await shippingAPI.getShippingCost(value);
        setShippingCost(response.data.shippingCost);
        setFetchError('');
      } catch (error) {
        console.error('Error fetching shipping cost:', error);
        setShippingCost(0);
        setFetchError('تعذر حساب تكلفة الشحن. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress || !formData.governorate) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    if (!phoneRegex.test(formData.customerPhone)) {
      alert('يرجى إدخال رقم هاتف صحيح (11 رقماً)');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        governorate: formData.governorate,
        notes: formData.notes || '',
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize // إضافة المقاس المختار
        }))
      };

      console.log('📦 Order data being sent:', orderData); // للتصحيح

      const response = await orderAPI.create(orderData);
      
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      
      navigate('/order-success', { 
        state: { 
          orderId: response.data._id,
          orderTotal: response.data.totalAmount,
          customerName: response.data.customerName,
          shippingCost: response.data.shippingCost,
          governorate: formData.governorate,
          orderDate: response.data.orderDate
        } 
      });
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalPrice = () => {
    return getSubtotal() + shippingCost;
  };

  const getSelectedGovernorateName = () => {
    const governorate = governorates.find(g => g.id === parseInt(formData.governorate));
    return governorate ? governorate.name : '';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="جاري التحميل..." />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="إتمام الطلب - غاليه | أكمل معلوماتك لتوصيل طلبك"
        description="أكمل معلومات التوصيل والدفع لإتمام طلبك. شحن لجميع المحافظات، دفع آمن عند الاستلام."
        canonical="https://ghalya.vercel.app/checkout"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl mx-auto mb-8">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">إتمام الطلب</h1>
              <div className="w-32 h-1.5 bg-pink-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 text-2xl">
                أكمل معلوماتك لتوصيل طلبك
              </p>
            </div>

            {fetchError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-yellow-800 text-lg">{fetchError}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {/* Order Summary */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 h-fit">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">ملخص الطلب</h2>
                </div>
                
                <div className="space-y-6 mb-8">
                  {cart.map(item => (
                    <div key={`${item.product._id}-${item.selectedSize}`} className="flex items-center gap-6 p-6 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-md"
                        />
                        {item.product.bestseller && (
                          <span className="absolute -top-2 -right-2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            الأكثر مبيعاً
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <h3 className="font-bold text-gray-800 text-xl leading-tight">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                            المقاس: {item.selectedSize}
                          </span>
                          <p className="text-pink-600 font-bold text-lg">
                            {item.product.price} ج.م
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 text-base">الكمية: {item.quantity}</span>
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

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-600 text-lg font-medium">المجموع:</span>
                    <span className="text-gray-800 font-bold text-xl">{getSubtotal()} ج.م</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <span className="text-gray-600 text-lg font-medium">مصاريف الشحن:</span>
                    <span className={`font-bold text-xl ${shippingCost === 0 ? 'text-orange-600' : 'text-gray-800'}`}>
                      {shippingCost === 0 ? '---' : `${shippingCost} ج.م`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-6 border-t border-gray-200">
                    <span className="text-2xl font-bold text-gray-800">الإجمالي:</span>
                    <span className="text-3xl font-bold text-pink-600">{getTotalPrice()} ج.م</span>
                  </div>

                  {shippingCost > 0 && formData.governorate && (
                    <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-blue-700 font-medium text-lg">
                          سيتم التوصيل إلى: {getSelectedGovernorateName()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">معلومات التوصيل</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="customerName" className="block text-lg font-bold text-gray-700 mb-4">
                      الاسم بالكامل *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="أدخل اسمك بالكامل"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerPhone" className="block text-lg font-bold text-gray-700 mb-4">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      required
                      pattern="01[0-2,5]{1}[0-9]{8}"
                      maxLength="11"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="أدخل رقم هاتفك (11 رقماً)"
                    />
                    <p className="text-gray-500 text-lg mt-3">
                      مثال: 01012345678
                    </p>
                  </div>

                  {/* Governorate Selection */}
                  <div>
                    <label htmlFor="governorate" className="block text-lg font-bold text-gray-700 mb-4">
                      المحافظة *
                    </label>
                    <select
                      id="governorate"
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      required
                      disabled={governorates.length === 0}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">{governorates.length === 0 ? 'جاري تحميل المحافظات...' : 'اختر المحافظة'}</option>
                      {governorates.map(governorate => (
                        <option key={governorate.id} value={governorate.id}>
                          {governorate.name} - {governorate.shippingCost} ج.م
                        </option>
                      ))}
                    </select>
                    <p className="text-gray-500 text-lg mt-3">
                      سيتم حساب مصاريف الشحن تلقائياً حسب المحافظة المختارة
                    </p>
                  </div>

                  <div>
                    <label htmlFor="customerAddress" className="block text-lg font-bold text-gray-700 mb-4">
                      العنوان التفصيلي *
                    </label>
                    <textarea
                      id="customerAddress"
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                      placeholder="أدخل عنوانك التفصيلي (المنطقة، الشارع، رقم المبني، الشقة)"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-lg font-bold text-gray-700 mb-4">
                      ملاحظات إضافية (اختياري)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                      placeholder="أي ملاحظات إضافية لتوصيل الطلب"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="border-t border-gray-200 pt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">طريقة الدفع</h3>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
                          <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">الدفع عند الاستلام</p>
                          <p className="text-gray-600 text-base">ادفع عند استلام طلبك</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.governorate || governorates.length === 0}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
                        جاري تأكيد الطلب...
                      </>
                    ) : (
                      <>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        تأكيد الطلب - {getTotalPrice()} ج.م
                      </>
                    )}
                  </button>

                  <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-lg">
                      بالضغط على "تأكيد الطلب" فإنك توافق على{' '}
                      <a href="/terms" className="text-pink-600 hover:text-pink-700 font-bold underline">
                        الشروط والأحكام
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;