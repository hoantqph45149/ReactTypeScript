import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { IUser } from "../interface/user";
import { api } from "../services";
import { useNavigate } from "react-router-dom";

type Props = {
  isForm: boolean;
};

const AuthForm = ({ isForm }: Props) => {
  const nav = useNavigate();
  const userSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: IUser) => {
    (async () => {
      try {
        if (isForm) {
          const res = await api.post("/login", data);
          sessionStorage.setItem("user", JSON.stringify(res.data.accessToken));
          nav("/");
        } else {
          await api.post("/register", data);
          reset();
          if (confirm("bạn đã đăng ký thành công nhấn ok để đăng nhập")) {
            nav("/login");
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center mb-3">{isForm ? "Login" : "Register"}</h1>
        <div className="mb-3">
          <label>email</label>
          <input className="form-control" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label>password</label>
          <input
            className="form-control"
            type="text"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
