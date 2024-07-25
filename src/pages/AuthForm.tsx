import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { IUser } from "../interface/user";
import { api } from "../services";

type Props = {
  isLogin: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const nav = useNavigate();
  const userSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Password ít nhất 6 ký tự"),
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
        if (isLogin) {
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
        <h1 className="text-center mb-3">{isLogin ? "Login" : "Register"}</h1>
        <div className="mb-3">
          <label>email</label>
          <input className="form-control" {...register("email")} />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label>password</label>
          <input
            className="form-control"
            type="text"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
