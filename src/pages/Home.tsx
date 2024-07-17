import React from "react";
import { IProduct } from "../interface/product";
import { Link } from "react-router-dom";

type Props = {
  products: IProduct[];
};

const Home = ({ products }: Props) => {
  return (
    <>
      <Link to={`/authform`}>
        <button className="btn btn-success w-30 m-5">Add Product</button>
      </Link>
      <h1>Danh sách sản phẩm</h1>
      <table className="table table-striped table-dark table-bordered text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/detail/${item.id}`}>{`${item.title}`}</Link>
              </td>
              <td>{item.price}</td>
              <td>
                <Link to={`/detail/${item.id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </td>
              <td>{item.description}</td>
              <td>
                <Link to={`/authform/${item.id}`}>
                  <button className="btn btn-primary w-100 mb-3">Update</button>
                </Link>
                <button className="btn btn-danger w-100">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
