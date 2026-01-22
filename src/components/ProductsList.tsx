import ProductCard from "./ProductCard";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
}

export default function ProductsList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {products.map((product: Product) => (
                <ProductCard
                    image={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    id={product.id}
                    key={product.id}
                />
            ))}
        </div>
    );
}
