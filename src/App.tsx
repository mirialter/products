import React from 'react';
import ProductsTable from './components/ProductsTable/ProductsTableComponents.tsx';
import { HashRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsTable />} />
        <Route path="/products/" element={<ProductsTable />} />
        <Route path="/products/:id" element={<ProductsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
