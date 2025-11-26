import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const totalStock = product.totalStock || (product.sizes ? product.sizes.reduce((total, size) => total + size.quantity, 0) : 0);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gray-100">
        <div className="aspect-square w-full">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </div>
        {product.bestseller && (
          <span className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            الأكثر مبيعاً
          </span>
        )}
        {totalStock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white text-lg font-semibold bg-red-500 px-4 py-2 rounded-lg backdrop-blur-sm">
              غير متوفر
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">
            {product.price} ج.م
          </span>
          <div className="flex flex-col items-end">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              totalStock > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {totalStock > 0 ? `متوفر (${totalStock})` : 'غير متوفر'}
            </span>
            {product.sizes && product.sizes.length > 0 && totalStock > 0 && (
              <div className="flex gap-1 mt-1">
                {product.sizes.slice(0, 3).map(size => (
                  <span key={size.size} className="text-xs bg-gray-100 text-gray-600 px-1 rounded">
                    {size.size}
                  </span>
                ))}
                {product.sizes.length > 3 && (
                  <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <Link
          to={`/product/${product._id}`}
          className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
            totalStock > 0
              ? 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {totalStock > 0 ? 'عرض التفاصيل' : 'غير متوفر'}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;