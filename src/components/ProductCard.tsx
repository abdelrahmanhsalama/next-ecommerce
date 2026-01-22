import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import Link from "next/link";
import Image from "next/image";

type ProductProps = {
  image: string;
  title: string;
  price: number;
  id: number;
};

const ProductCard = ({ image, title, price, id }: ProductProps) => {
  return (
    <div className="bg-[#F6F6F6] p-8 rounded-md flex flex-col gap-4 relative">
      <Link href={`products/${id}`} className="flex flex-col gap-4">
        <Image
          src={image}
          alt={title}
          width={180}
          height={180}
          className="mx-auto"
        ></Image>
        <h3 className="font-semibold text-center flex justify-center items-center h-[2rem] mb-1 leading-5">
          {title}
        </h3>
        <p className="font-bold text-center">${price}</p>
      </Link>
      <CartButton className="min-content mx-auto" productId={id} />
      <WishlistButton style="mini" productId={id} />
    </div>
  );
};

export default ProductCard;
