import { ProductType } from "@/types/product.type";
import styles from "./Product.module.scss";
import Link from "next/link";
import Image from "next/image";


const ProductView = ({products}: {products: ProductType[]}) => {
    return (
        <div className={styles.product}>
            <h1 className={styles.product_title}>Product</h1>
            <div className={styles.product_content}>
                {products?.length > 0 ? (
                    <>
                        {products?.map((product: ProductType) => (
                <Link href={`/product/${product.id}`} 
                key={product.id} 
                className={styles.product_content_item}
                >
                    <div className={styles.product_content_item_image}>
                        {/* <img src={product.image} alt={product.name} /> */}
                        <Image src={product.image} alt={product.name} width={500} height={500}/>
                    
                    </div>
                    <h4 className={styles.product_content_item_name}>
                        {product.name}
                    </h4>
                    
                    <p className={styles.product_content_item_category}>
                        {product.category}
                    </p>
                    <p className={styles.product_content_item_price}>
                        {product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}
                    </p>
                </Link>
                
            ))}
                    </>
                    
                ) : (
                    <div className={styles.product_content_skeleton}>
                    <div className={styles.product_content_skeleton_image} />
                    <div className={styles.product_content_skeleton_name} />
                    <div className={styles.product_content_skeleton_category} />
                    <div className={styles.product_content_skeleton_price} />
                </div>

                )}
              
                

            </div>
        </div>

    );
};
export default ProductView;