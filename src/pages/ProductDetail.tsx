import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services";
import { IProduct } from "../interface/product";

type Props = {};

const ProductDetail = (props: Props) => {
  const { id } = useParams();
  const [product, setProducts] = useState<IProduct>({} as IProduct);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="container my-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="row">
          <div className="col-6 ">
            <img
              src={product.thumbnail}
              className="img-fluid"
              alt={product.title}
            />
          </div>
          <div className="col-6">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
