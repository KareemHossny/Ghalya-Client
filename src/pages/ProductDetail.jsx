import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { productAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
      
      if (response.data.sizes) {
        const available = response.data.sizes.filter(size => size.quantity > 0);
        setAvailableSizes(available);
        if (available.length > 0) {
          setSelectedSize(available[0].size);
        }
      }
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
    if (availableSizes.length === 0) {
      toast.error('المنتج غير متوفر', {
        description: 'هذا المنتج غير متوفر حالياً',
        duration: 4000,
      });
      return;
    }

    if (!selectedSize) {
      toast.error('الرجاء اختيار مقاس', {
        description: 'يجب اختيار مقاس قبل إضافة المنتج إلى السلة',
        duration: 4000,
      });
      return;
    }

    // التحقق من توفر الكمية للمقاس المختار
    const selectedSizeData = availableSizes.find(size => size.size === selectedSize);
    if (!selectedSizeData || selectedSizeData.quantity < quantity) {
      toast.error('الكمية غير متوفرة', {
        description: `الكمية المطلوبة غير متوفرة للمقاس ${selectedSize}`,
        duration: 4000,
      });
      return;
    }

    setAddingToCart(true);
    
    const toastId = toast.loading('جاري إضافة المنتج إلى السلة...', {
      duration: Infinity,
    });
    
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = cart.findIndex(item => 
        item.product._id === product._id && item.selectedSize === selectedSize
      );
      
      if (existingItemIndex >= 0) {
        // تحديث الكمية للمقاس الموجود
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        if (newQuantity > selectedSizeData.quantity) {
          toast.error('الكمية غير متوفرة', {
            description: `الكمية الإجمالية تتجاوز المخزون المتاح للمقاس ${selectedSize}`,
            duration: 4000,
            id: toastId,
          });
          setAddingToCart(false);
          return;
        }
        cart[existingItemIndex].quantity = newQuantity;
        toast.success('تم تحديث الكمية', {
          description: `تم تحديث كمية "${product.name}" - المقاس ${selectedSize} في السلة`,
          duration: 3000,
          id: toastId,
        });
      } else {
        // إضافة منتج جديد بمقاس مختلف
        cart.push({ 
          product: {
            ...product,
            selectedSize: selectedSize,
            availableSizes: availableSizes
          }, 
          quantity: quantity,
          selectedSize: selectedSize
        });
        toast.success('تمت الإضافة إلى السلة', {
          description: `تم إضافة "${product.name}" - المقاس ${selectedSize} إلى سلة التسوق`,
          duration: 3000,
          id: toastId,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setAddingToCart(false);
      
      // الانتقال إلى السلة بعد تأخير قصير
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    }, 1000);
  };

  const structuredData = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product._id,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "EGP",
      "availability": availableSizes.length > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": "2025-12-31"
    },
    "brand": {
      "@type": "Brand",
      "name": "غاليه"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  } : null;

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
    <>
      <SEO 
        title={`${product.name} - غاليه | إسدالات حريمي بجودة عالية`}
        description={`${product.description} - ${product.name}. تسوقي الآن من غاليه واستمتعي بجودة فائقة وسعر مميز. توصيل لجميع أنحاء مصر.`}
        keywords={`${product.name}, إسدالات حريمي, ملابس نسائية, أزياء, غاليه, تسوق أونلاين`}
        canonical={`https://ghalya.vercel.app/product/${product._id}`}
        ogImage={product.image}
        ogUrl={`https://ghalya.vercel.app/product/${product._id}`}
        structuredData={structuredData}
      />
      
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
              {/* Product Image */}
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
                {availableSizes.length === 0 && (
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
                    availableSizes.length > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {availableSizes.length > 0 ? `🟢 متوفر (${product.totalStock} قطعة)` : '🔴 غير متوفر'}
                  </span>
                </div>

                {availableSizes.length > 0 ? (
                  <div className="space-y-6">
                    {/* اختيار المقاس */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 p-4 rounded-xl">
                      <label className="text-lg font-medium text-gray-700">المقاس:</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                      >
                        {availableSizes.map(size => (
                          <option key={size.size} value={size.size}>
                            {size.size} (متوفر: {size.quantity})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* اختيار الكمية */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 p-4 rounded-xl">
                      <label className="text-lg font-medium text-gray-700">الكمية:</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                      >
                        {[...Array(Math.min(
                          availableSizes.find(size => size.size === selectedSize)?.quantity || 0, 
                          10
                        )).keys()].map(num => (
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
                          أضف إلى السلة - المقاس {selectedSize}
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
    </>
  );
};

export default ProductDetail;