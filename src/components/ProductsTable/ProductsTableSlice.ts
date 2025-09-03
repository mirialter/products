import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
}


export interface ProductsState {
  items: ProductItem[];
  counter: number
}

const initialState: ProductsState = {
  items: [
    ...JSON.parse(localStorage.getItem("products") || "[]")
  ],
  counter: [...JSON.parse(localStorage.getItem("products") || "[]")].length
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.items.push({...action.payload, id: state.counter, creationDate: new Date});
      state.counter++;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    editProduct:(state, action: PayloadAction<ProductItem>) => {
      const foundIndex = state.items.findIndex(x => x.id === action.payload.id);
      state.items[foundIndex] = action.payload;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
  },
});

// actions
export const { addProduct, removeProduct, editProduct } = productsSlice.actions;

// reducer
export default productsSlice.reducer;
