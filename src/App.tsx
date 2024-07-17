import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { api } from "./services";
import { IProduct } from "./interface/product";
import ProductDetail from "./pages/ProductDetail";
import AuthProduct from "./pages/AuthProduct";
import AuthForm from "./pages/AuthForm";

function App() {
  const nav = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      setProducts(data);
    })();
  }, []);

  const handleSubmit = async (data: IProduct) => {
    try {
      if (data.id) {
        const res = await api.put(`/products/${data.id}`, data);
        const newdata = await api.get("/products");
        setProducts(newdata.data);
        if (
          confirm("bạn đã sửa sản phẩm thành công bạn có muốn về trang Home ?")
        ) {
          nav("/");
        }
      } else {
        const response = await api.post("/products", data);
        setProducts([...products, response.data]);
        if (
          confirm("bạn đã thêm sản phẩm thành công nhấn ok để về trang Home ?")
        ) {
          nav("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route
          path="/authform"
          element={<AuthProduct ondata={handleSubmit} />}
        />
        <Route
          path="/authform/:id"
          element={<AuthProduct ondata={handleSubmit} />}
        />
        <Route path="/login" element={<AuthForm isForm={true} />} />
        <Route path="/register" element={<AuthForm isForm={false} />} />
      </Routes>
    </>
  );
}

export default App;
