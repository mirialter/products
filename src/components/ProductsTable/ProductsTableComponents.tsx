import React, { useMemo, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { RootState } from '../../app/store';
import {addProduct, ProductItem, removeProduct} from "./ProductsTableSlice.ts";
import image from "../../img.png"
import ProductItemDetails from "./../ProductItem/ProductItem.tsx"
import {Select, MenuItem, Button} from '@mui/material'

export default function ProductsTable(){
    const dispatch = useDispatch();
    const products = useSelector((state:RootState) => state.products.items);
    const [allProducts, setAllProducts] = useState<ProductItem[]>(products)
    const [itemClicked, setItemClicked] = useState<any>({});
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(allProducts.length / 5));

    useEffect(() => {
        setAllProducts(products)
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const pageProducts = useMemo(()=> {
       const start = (page-1) * 5;
       return allProducts.slice(start, start + 5);
    }, [ page, allProducts])

    useEffect(() => {
        if(sortBy === "name") {
            const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
            setAllProducts(sorted)  
        }
        if (sortBy === "date") {
            const sorted = [...products].sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
            setAllProducts(sorted)  
        }
    }, [sortBy]);

    const searchValue = (e) => {
        const value = e.target.value;
        const filtered = products.filter((p) =>p.name.toLowerCase().includes(value.toLowerCase()) || p.description?.toLowerCase().includes(value.toLowerCase()));
        setAllProducts(filtered);
    }

    return (
        <div className='screen'>
            <div className='header'>
                <Button onClick={()=>setItemClicked({id:-1})}>Add</Button>
                <input placeholder='Search Products' onChange={searchValue}></input>
                <Select
                    variant="outlined"
                    value={sortBy}
                    onChange={(e)=>setSortBy(e.target.value)}>
                        <MenuItem value={"name"}>Name</MenuItem>
                        <MenuItem value={"date"}>Recently Added</MenuItem>
                </Select>
            </div>
            <div className='body'>
                <div className='table'>
                    {pageProducts.map((product)=> {
                            return <div onClick={() => {setItemClicked(product)}} key={product.id} className={`product ${(product?.id === itemClicked?.id) && 'selected'}`}>
                                    <img src={image}/>
                                    <div>
                                    <div style={{ fontSize: "32px", fontWeight: "bold" }}>{product.name}</div>
                                    <div>{product.description}</div>
                                    </div>
                                    <button style={{ background:"orange", border:"2px solid #c57c00", cursor:"pointer", marginLeft:"auto",}} onClick={()=>dispatch(removeProduct(product.id))}>Delete</button>
                            </div>
                        })}
                </div>
                <div className='details'>
                    <ProductItemDetails product={itemClicked} />
                </div>
            </div>
            <div className='pagination'>
                <button onClick={()=>setPage(page-1)} disabled={page === 1}>Prev Page</button>
                <span>{page} of {totalPages}</span>
                <button onClick={()=>setPage(page+1)} disabled={page === totalPages}>Next Page</button>
            </div>
        </div>
        
    )
}