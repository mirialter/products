import { ProductItem, addProduct, editProduct } from "../ProductsTable/ProductsTableSlice.ts";
import image from "../../img.png"
import { RootState } from '../../app/store';
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";

interface ProductItemProps {
    product: ProductItem
}

export default function ProductItemDetails(props: ProductItemProps) {
    const dispatch = useDispatch();
    const {product} = props;
    const allProducts = useSelector((state:RootState) => state.products.items);
    const [productData, setProductData] = useState<ProductItem | any>(allProducts.find(p => p.id === product.id));


    useEffect(() => {
        if(product.id===-1) {
            setProductData({name:"", description:"", price:0})
        } else {
            setProductData(allProducts.find(p => p.id === product.id));
        }
        
    },[product]);

    const editName = (e) => {
        setProductData({...productData, name: e.target.value})
    }
    const editPrice = (e) => {
        setProductData({...productData, price: e.target.value})
    }
    const editDescription = (e) => {
        setProductData({...productData, description: e.target.value})
    }

    const saveProduct = () => {

        if(product.id===-1){
            dispatch(addProduct(productData))
        } else {
            dispatch(editProduct(productData))
        }
    }

    const isValidValues = productData && productData.name && productData.name.length <=30 && ( !productData.description || productData.description.length <=300) && productData.price > 0

    return (
        <div style={{ display:"flex", flexDirection: "column", width: "50%" }}>
            <h3 style={{ width: "100%" }}>{productData?.name || 'New'} Deatails</h3>
            <img src={image}/>
            <div>Name<input value={productData?.name} onChange={editName}/></div>
            
            <div>Description<input value={productData?.description} onChange={editDescription}/></div>
            <div>Price<input type="number" value={productData?.price} onChange={editPrice}  /></div>
            <button onClick={saveProduct} disabled={!isValidValues}>save</button>
        </div>
    )

}