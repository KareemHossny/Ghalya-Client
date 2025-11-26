import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://ghalya-back-end.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // يمكن إضافة token للمصادقة هنا إذا لزم الأمر
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      console.log('حدث خطأ في الخادم. يرجى المحاولة مرة أخرى.');
    } else if (error.response?.status === 404) {
      console.log('البيانات المطلوبة غير موجودة.');
    } else if (!error.response) {
      console.log('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const productAPI = {
  // Get all products
  getAll: () => api.get('/api/products'),
  
  // Get single product
  getById: (id) => api.get(`/api/products/${id}`),
  
  // Get bestsellers
  getBestsellers: () => api.get('/api/products/bestsellers'),

};

export const contactAPI = {
  // Send contact message
  sendMessage: (messageData) => api.post('/api/contact', messageData),
  
};

export const orderAPI = {
  // Create new order
  create: (orderData) => api.post('/api/orders', orderData),
  
  // Get order by ID
  getById: (id) => api.get(`/api/orders/${id}`),

};

export const shippingAPI = {
  // Get all governorates with shipping costs
  getGovernorates: async () => {
    try {
      const response = await api.get('/api/shipping/governorates');
      return response;
    } catch (error) {
      console.log('API not available, using fallback data');
      // بيانات احتياطية
      return {
        data: [
          { id: 1, name: 'القاهرة', shippingCost: 30 },
          { id: 2, name: 'الجيزة', shippingCost: 30 },
          { id: 3, name: 'الإسكندرية', shippingCost: 40 },
          { id: 4, name: 'الدقهلية', shippingCost: 50 },
          { id: 5, name: 'البحر الأحمر', shippingCost: 80 },
          { id: 6, name: 'البحيرة', shippingCost: 45 },
          { id: 7, name: 'الفيوم', shippingCost: 55 },
          { id: 8, name: 'الغربية', shippingCost: 45 },
          { id: 9, name: 'الإسماعيلية', shippingCost: 50 },
          { id: 10, name: 'المنوفية', shippingCost: 40 },
          { id: 11, name: 'المنيا', shippingCost: 60 },
          { id: 12, name: 'القليوبية', shippingCost: 35 },
          { id: 13, name: 'الوادي الجديد', shippingCost: 100 },
          { id: 14, name: 'السويس', shippingCost: 50 },
          { id: 15, name: 'أسوان', shippingCost: 90 },
          { id: 16, name: 'أسيوط', shippingCost: 70 },
          { id: 17, name: 'بني سويف', shippingCost: 55 },
          { id: 18, name: 'بورسعيد', shippingCost: 60 },
          { id: 19, name: 'دمياط', shippingCost: 50 },
          { id: 20, name: 'الشرقية', shippingCost: 45 },
          { id: 21, name: 'جنوب سيناء', shippingCost: 120 },
          { id: 22, name: 'كفر الشيخ', shippingCost: 50 },
          { id: 23, name: 'مطروح', shippingCost: 100 },
          { id: 24, name: 'الأقصر', shippingCost: 85 },
          { id: 25, name: 'قنا', shippingCost: 75 },
          { id: 26, name: 'شمال سيناء', shippingCost: 110 },
          { id: 27, name: 'سوهاج', shippingCost: 65 }
        ]
      };
    }
  },
  
  // Get shipping cost for specific governorate
  getShippingCost: async (governorateId) => {
    try {
      const response = await api.get(`/api/shipping/shipping-cost/${governorateId}`);
      return response;
    } catch (error) {
      console.log('API not available, using fallback data');
      // بيانات احتياطية
      const governorates = [
        { id: 1, name: 'القاهرة', shippingCost: 30 },
        { id: 2, name: 'الجيزة', shippingCost: 30 },
        { id: 3, name: 'الإسكندرية', shippingCost: 40 },
        { id: 4, name: 'الدقهلية', shippingCost: 50 },
        { id: 5, name: 'البحر الأحمر', shippingCost: 80 },
        { id: 6, name: 'البحيرة', shippingCost: 45 },
        { id: 7, name: 'الفيوم', shippingCost: 55 },
        { id: 8, name: 'الغربية', shippingCost: 45 },
        { id: 9, name: 'الإسماعيلية', shippingCost: 50 },
        { id: 10, name: 'المنوفية', shippingCost: 40 },
        { id: 11, name: 'المنيا', shippingCost: 60 },
        { id: 12, name: 'القليوبية', shippingCost: 35 },
        { id: 13, name: 'الوادي الجديد', shippingCost: 100 },
        { id: 14, name: 'السويس', shippingCost: 50 },
        { id: 15, name: 'أسوان', shippingCost: 90 },
        { id: 16, name: 'أسيوط', shippingCost: 70 },
        { id: 17, name: 'بني سويف', shippingCost: 55 },
        { id: 18, name: 'بورسعيد', shippingCost: 60 },
        { id: 19, name: 'دمياط', shippingCost: 50 },
        { id: 20, name: 'الشرقية', shippingCost: 45 },
        { id: 21, name: 'جنوب سيناء', shippingCost: 120 },
        { id: 22, name: 'كفر الشيخ', shippingCost: 50 },
        { id: 23, name: 'مطروح', shippingCost: 100 },
        { id: 24, name: 'الأقصر', shippingCost: 85 },
        { id: 25, name: 'قنا', shippingCost: 75 },
        { id: 26, name: 'شمال سيناء', shippingCost: 110 },
        { id: 27, name: 'سوهاج', shippingCost: 65 }
      ];
      
      const governorate = governorates.find(g => g.id === parseInt(governorateId));
      return {
        data: { 
          shippingCost: governorate ? governorate.shippingCost : 0,
          governorateName: governorate ? governorate.name : ''
        }
      };
    }
  }
};

// Utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(price);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default api;