"use client";

import { Product, useCart } from "@/context/CartProvider";

const BuyingOptions = ({ product }: { product: Product }) => {
  const { updateCart } = useCart();

  const onAddToCartClick = () => {
    updateCart(product, 1);
  };

  return (
    <div className="flex p-2 space-x-2">
      <button
        onClick={onAddToCartClick}
        className="flex-1 border-2 border-orange-600 p-2 rounded-md text-gray-800"
      >
        Add to Cart
      </button>
      <button
        // onClick={onBuyNowClick}
        className="flex-1 bg-orange-600 p-2 rounded-md text-white"
      >
        Buy Now
      </button>
    </div>
  );
};

export default BuyingOptions;
