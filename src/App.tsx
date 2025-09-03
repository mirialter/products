import React from 'react';
import ProductsTable from './components/ProductsTable/ProductsTableComponents.tsx';
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products/:id?" element={<ProductsTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
