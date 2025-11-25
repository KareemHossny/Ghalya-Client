import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const { 
    orderId, 
    orderTotal, 
    shippingCost, 
    governorate,
    customerName,
    orderDate 
  } = location.state || {};

  // إذا كانت البيانات قادمة من الباك إند، استخدمها مباشرة
  // إذا كانت بيانات تجريبية، احسب subtotal
  const subtotal = orderTotal - (shippingCost || 0);
  

  // دالة مساعدة محلية بدلاً من الاستيراد من ملف خارجي
  const getGovernorateName = (governorateId) => {
    const governorates = {
      1: 'القاهرة', 2: 'الجيزة', 3: 'الإسكندرية', 4: 'الدقهلية',
      5: 'البحر الأحمر', 6: 'البحيرة', 7: 'الفيوم', 8: 'الغربية',
      9: 'الإسماعيلية', 10: 'المنوفية', 11: 'المنيا', 12: 'القليوبية',
      13: 'الوادي الجديد', 14: 'السويس', 15: 'أسوان', 16: 'أسيوط',
      17: 'بني سويف', 18: 'بورسعيد', 19: 'دمياط', 20: 'الشرقية',
      21: 'جنوب سيناء', 22: 'كفر الشيخ', 23: 'مطروح', 24: 'الأقصر',
      25: 'قنا', 26: 'شمال سيناء', 27: 'سوهاج'
    };
    return governorates[governorateId] || 'غير محدد';
  };

  // التصحيح هنا - استدعاء الدالة بشكل صحيح
  const governorateName = getGovernorateName(governorate);

  // تنسيق التاريخ إذا كان موجوداً
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Success Icon */}
        <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6">!تم تأكيد طلبك بنجاح</h1>
        
        <p className="text-gray-600 mb-8 text-2xl leading-relaxed">
          شكراً لثقتك ب<span className="text-pink-600 font-semibold">غاليه</span>
        </p>

        {/* Order Details */}
        {orderId && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">تفاصيل الطلب</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">رقم الطلب:</span>
                <span className="font-bold text-gray-800 text-xl">{orderId}</span>
              </div>
              
              {customerName && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">اسم العميل:</span>
                  <span className="font-semibold text-gray-800">{customerName}</span>
                </div>
              )}
              
              {governorateName && governorateName !== 'غير محدد' && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">مكان التوصيل:</span>
                  <span className="font-semibold text-gray-800">{governorateName}</span>
                </div>
              )}
              
              {orderDate && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">تاريخ الطلب:</span>
                  <span className="text-gray-800">{formatDate(orderDate)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">المجموع:</span>
                <span className="text-gray-800">{subtotal} ج.م</span>
              </div>
              
              {shippingCost > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">مصاريف الشحن:</span>
                  <span className="text-gray-800">{shippingCost} ج.م</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-4 text-xl font-bold border-t border-gray-200 mt-4">
                <span>الإجمالي:</span>
                <span className="text-pink-600 text-2xl">{orderTotal} ج.م</span>
              </div>
              
              <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4 mt-4">
                <span className="text-gray-600 font-medium">طريقة الدفع:</span>
                <span className="font-semibold text-gray-800">الدفع عند الاستلام</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 mb-10 border-2 border-blue-100">
          <h3 className="font-bold text-blue-800 text-2xl mb-6">ماذا بعد؟</h3>
          <ul className="text-blue-700 text-lg space-y-4 text-right">
            <li className="flex items-center justify-end gap-3">
              <span>• سوف نتصل بك خلال 24 ساعة لتأكيد الطلب</span>
            </li>
            <li className="flex items-center justify-end gap-3">
              <span>• مدة التوصيل من 2 إلى 5 أيام عمل</span>
            </li>
            <li className="flex items-center justify-end gap-3">
              <span>• يمكنك تتبع طلبك عبر الهاتف</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <Link
            to="/products"
            className="block w-full bg-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            مواصلة التسوق
          </Link>
          
          <Link
            to="/"
            className="block text-gray-600 hover:text-pink-600 transition-colors font-semibold text-lg py-4 border-2 border-gray-300 rounded-2xl hover:border-pink-600"
          >
            العودة إلى الرئيسية
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-lg">
            لأي استفسار، لا تترددي في الاتصال بنا: 
            <a href="tel:0123456789" className="text-pink-600 hover:text-pink-700 font-bold text-xl mr-3">
              0123456789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;