import React, { useState } from 'react';
import { contactAPI, validateEmail } from '../utils/api'; 
import { toast } from 'sonner';

const Contact = () => {
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setMessageData({
      ...messageData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(messageData.email)) {
      toast.error('البريد الإلكتروني غير صالح', {
        description: 'يرجى إدخال بريد إلكتروني صحيح',
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await contactAPI.sendMessage(messageData);
      
      if (response.data.success) {
        toast.success('تم إرسال رسالتك بنجاح!', {
          description: 'سنرد عليكم في أقرب وقت ممكن',
          duration: 5000,
          icon: '✉️',
        });
        
        setMessageData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('حدث خطأ أثناء الإرسال', {
          description: response.data.message || 'يرجى المحاولة مرة أخرى',
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // استخدام معالج الأخطاء الموجود في api.js
      if (error.response?.data?.message) {
        toast.error('خطأ في الإرسال', {
          description: error.response.data.message,
          duration: 5000,
        });
      } else if (error.code === 'ECONNABORTED') {
        toast.error('انتهت مهلة الاتصال', {
          description: 'يرجى المحاولة مرة أخرى',
          duration: 4000,
        });
      } else {
        toast.error('تعذر الاتصال بالخادم', {
          description: 'يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى',
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">اتصل بنا</h1>
          <div className="w-32 h-1.5 bg-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك! لا تترددي في التواصل معنا لأي استفسارات أو ملاحظات
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">معلومات التواصل</h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                فريق دعم العملاء لدينا متاح دائماً لمساعدتك في أي استفسار. 
                نحن هنا لنجعل تجربتك مع غاليه استثنائية.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">العنوان</h3>
                  <p className="text-gray-600 text-lg">القاهرة، مصر</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">الهاتف</h3>
                  <p className="text-gray-600 text-lg">0123456789</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">البريد الإلكتروني</h3>
                  <p className="text-gray-600 text-lg">info@galia.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">أوقات العمل</h3>
                  <p className="text-gray-600 text-lg">الأحد - الخميس: 9 ص - 5 م</p>
                  <p className="text-gray-600 text-lg">الجمعة - السبت: إجازة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">أرسل رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-3">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={messageData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="أدخل اسمك بالكامل"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-3">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={messageData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold text-gray-700 mb-3">
                  الموضوع *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={messageData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="موضوع رسالتك"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-3">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={messageData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال الرسالة'
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-500 text-lg">
                  سنرد على رسالتك خلال 24 ساعة عمل
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Map/Additional Info Section */}
        <div className="mt-24 bg-white rounded-3xl shadow-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">لماذا تختاري غاليه؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">رد سريع خلال 24 ساعة</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">دعم فني متخصص</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">حلول مخصصة لاحتياجاتك</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;