import { Product } from "@/context/CartProvider";
import Image from "next/image";
import { FC } from "react";
import BuyingOptions from "./BuyingOptions";

interface Props {
  product: Product;
//   onAddToCartClick?(): void;
//   onBuyNowClick?(): void;
}

const ProductCard: FC<Props> = ({
  product,
//   onAddToCartClick,
//   onBuyNowClick,
}) => {
  return (
    <div className="w-full bg-white shadow-md rounded overflow-hidden relative">
      <div className="w-full aspect-square relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="font-semibold text-2xl">{product.title}</h1>
        <div className="flex items-center space-x-3">
          <p className="line-through italic text-gray-500">
            MRP: ${product.originalPrice}
          </p>
          <p className="font-semibold">Sale Price: ${product.price}</p>
        </div>
      </div>

      <span className="absolute top-2 right-2 font-semibold bg-orange-600 p-2 rounded-md inline-block text-sm text-white shadow-md">
        {product.percentOff}% Off
      </span>

      <BuyingOptions product={product} />
    </div>
  );
};

export default ProductCard;
