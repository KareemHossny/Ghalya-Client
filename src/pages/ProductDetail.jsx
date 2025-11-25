import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.log('لم يتم العثور علي المنتجات');
      toast.error('خطأ في تحميل المنتج', {
        description: 'تعذر تحميل معلومات المنتج',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (product.stock === 0) {
      toast.error('المنتج غير متوفر', {
        description: 'هذا المنتج غير متوفر حالياً',
        duration: 4000,
      });
      return;
    }

    setAddingToCart(true);
    
    // Show loading toast
    const toastId = toast.loading('جاري إضافة المنتج إلى السلة...', {
      duration: Infinity,
    });
    
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success('تم تحديث الكمية', {
          description: `تم تحديث كمية "${product.name}" في السلة`,
          duration: 3000,
          id: toastId,
        });
      } else {
        cart.push({ product, quantity });
        toast.success('تمت الإضافة إلى السلة', {
          description: `تم إضافة "${product.name}" إلى سلة التسوق`,
          duration: 3000,
          id: toastId,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setAddingToCart(false);
      
      // Navigate to cart after a short delay
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    }, 1000);
  };

  if (loading) {
    return <LoadingSpinner size="large" text="جاري تحميل تفاصيل المنتج..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
          <Link to="/products" className="text-pink-600 hover:text-pink-700">
            العودة إلى المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-pink-600 transition-colors">الرئيسية</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/products" className="hover:text-pink-600 transition-colors">المنتجات</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 p-8">
            {/* Product Image - Clear even when out of stock */}
            <div className="relative">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                    <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={product.image.replace('w=500', 'w=800')}
                  alt={product.name}
                  className={`w-full h-full max-h-[600px] object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {product.bestseller && (
                <span className="absolute top-6 right-6 bg-pink-600 text-white px-5 py-2 rounded-full font-semibold text-base shadow-xl">
                  الأكثر مبيعاً
                </span>
              )}
              {product.stock === 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-2 rounded-full font-semibold text-base shadow-xl">
                  غير متوفر
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">{product.name}</h1>
              
              <p className="text-3xl font-bold text-pink-600">
                {product.price} ج.م
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="py-4">
                <span className={`text-xl font-semibold px-4 py-2 rounded-lg ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stock > 0 ? `🟢 متوفر (${product.stock} قطعة)` : '🔴 غير متوفر'}
                </span>
              </div>

              {product.stock > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 p-4 rounded-xl">
                    <label className="text-lg font-medium text-gray-700">الكمية:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                    >
                      {[...Array(Math.min(product.stock, 10)).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={addToCart}
                    disabled={addingToCart}
                    className="w-full bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-700 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                        جاري الإضافة...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        أضف إلى السلة
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-700 text-lg font-semibold mb-3">
                      هذا المنتج غير متوفر حالياً
                    </p>
                    <p className="text-red-600">
                      يمكنك تصفح منتجات أخرى مشابهة
                    </p>
                  </div>
                  
                  <Link
                    to="/products"
                    className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    onClick={() => toast.info('جاري تحميل المنتجات المتاحة')}
                  >
                    <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    تصفح المنتجات المتاحة
                  </Link>
                </div>
              )}

              {/* Features */}
              <div className="mt-6 space-y-4 bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">مميزات الشراء</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 text-lg">
                    <svg className="w-6 h-6 text-green-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    توصيل سريع لجميع أنحاء مصر
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <svg className="w-6 h-6 text-green-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    دفع عند الاستلام
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <svg className="w-6 h-6 text-green-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    إرجاع خلال 14 يوم
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => toast.info('جاري تحميل جميع المنتجات')}
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            تصفح المزيد من المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;