import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IProduct } from "../interface/product";
import { useParams } from "react-router-dom";
import { api } from "../services";

type Props = {
  ondata: (data: IProduct) => void;
};

const AuthProduct = ({ ondata }: Props) => {
  const { id } = useParams();
  const schemaProduct = z.object({
    title: z.string().min(6, "Title should have at least 6 characters"),
    price: z.number().min(0, "Price should be a positive number"),
    description: z.string(),
  });
  if (id) {
    useEffect(() => {
      (async () => {
        try {
          const res = await api.get(`/products/${id}`);
          reset(res.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id]);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>({
    resolver: zodResolver(schemaProduct),
  });

  const onSubmit = (data: IProduct) => {
    ondata({ ...data, id });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center mb-3">
          {id ? "Update Product" : "Add Product"}
        </h1>
        <div className="mb-3">
          <label>Title</label>
          <input className="form-control" {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            className="form-control"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input className="form-control" {...register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default AuthProduct;
