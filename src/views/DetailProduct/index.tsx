import { ProductType } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
const DetailProduct = ({ product }: {product: ProductType}) => {
    return (
        <>
        <h1 className={styles.title}>Detail Product</h1>

        <div 
                
                className={styles.productDetail}
                >
                    <div className={styles.productDetail_image}>
                        <img src={product.image && product.image} alt={product.name} />
                    
                    </div>
                    <h4 className={styles.productDetail_name}>
                        {product.name}
                    </h4>
                    
                    <p className={styles.productDetail_category}>
                        {product.category}
                    </p>
                    <p className={styles.productDetail_price}>
                        {product.price && 
                        product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}
                    </p>
                </div>
        </>
    )
}
export default DetailProduct;