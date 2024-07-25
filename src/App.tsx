import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { IProduct } from "./interface/product";
import AuthForm from "./pages/AuthForm";
import AuthProduct from "./pages/AuthProduct";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { api } from "./services";

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
        await api.patch(`/products/${data.id}`, data);
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
  const handleDelete = (id: number) => {
    (async () => {
      try {
        if (confirm("bạn có chắc muốn xóa không ?")) {
          await api.delete(`/products/${id}`);
          setProducts(products.filter((product) => product.id !== id));
          nav("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home products={products} onDelete={handleDelete} />}
        />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route
          path="/authform"
          element={<AuthProduct ondata={handleSubmit} />}
        />
        <Route
          path="/authform/:id"
          element={<AuthProduct ondata={handleSubmit} />}
        />
        <Route path="/login" element={<AuthForm isLogin={true} />} />
        <Route path="/register" element={<AuthForm isLogin={false} />} />
      </Routes>
    </>
  );
}

export default App;
