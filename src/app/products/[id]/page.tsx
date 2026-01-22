import axios from "axios";
import ProductNotFound from "@/components/ProductNotFound";
import CartButton from "@/components/CartButton";
import WishlistButton from "@/components/WishlistButton";
import { Icon } from "@iconify/react";
import ProductImages from "@/components/ProductImages";

const fetchProductDetails = async (id: string) => {
    try {
        const { data } = await axios.get(
            `https://dummyjson.com/products/${id}`
        );
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("An unknown error occurred:", error);
        }
        return null;
    }
};

export async function generateMetadata({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = await paramsPromise;
    const product = await fetchProductDetails(params.id);

    return {
        title: product
            ? `${product.title} | NextShop`
            : "Product Not Found | NextShop",
        description: product
            ? product.description
            : "This product could not be found.",
    };
}

export default async function ProductPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = await paramsPromise;
    const product = await fetchProductDetails(params.id);

    const features = [
        { icon: "lucide:truck", title: "Free Delivery", subtitle: "1-2 day" },
        { icon: "lucide:store", title: "In Stock", subtitle: "Today" },
        { icon: "lucide:shield", title: "Guaranteed", subtitle: "1 year" },
    ];

    return (
        <>
            {product ? (
                <div className="flex lg:flex-row flex-col w-5/6 gap-4 my-8">
                    <ProductImages
                        productImages={product.images.map(
                            (image: string, index: number) => ({
                                url: image,
                                description: `${product.description} - Image 0${
                                    index + 1
                                }`,
                            })
                        )}
                    />
                    <div className="flex-1 flex flex-col justify-center gap-4">
                        <h2 className="text-[2rem]">{product.title}</h2>
                        <p className="text-[1.5rem]">${product.price}</p>
                        <p>{product.description}</p>
                        <div className="flex lg:flex-row flex-col lg:gap-4 gap-2">
                            <CartButton
                                className="w-full"
                                productId={product.id}
                            />
                            <WishlistButton
                                className="w-full"
                                style="full"
                                productId={product.id}
                            />
                        </div>
                        <div className="flex w-full lg:flex-row flex-col gap-4 justify-between">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div className="bg-[#F6F6F6] p-4 rounded-md">
                                        <Icon
                                            icon={feature.icon}
                                            width="24"
                                            height="24"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[#717171]">
                                            {feature.title}
                                        </p>
                                        <p>{feature.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <ProductNotFound />
            )}
        </>
    );
}
