import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)
  

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url , {
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
   })

   const dataApi = await dataResponse.json()

   if(dataApi.success){
     toast.success(dataApi.message)
     navigate("/")
     fetchUserDetails()
     fetchUserAddToCart()
   }

   
   if(dataApi.error){
    toast.error(dataApi.message)
   }

  }

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="w-full max-w-sm bg-white mx-auto p-5 py-6 rounded-sm">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="enter email"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="enter password"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600 mt-2"
              >
                Forgot Password ?
              </Link>
            </div>

            <button className="bg-red-600 w-full max-w-[150px] mt-6 px-6 py-2 rounded-full  text-white hover:scale-110 mx-auto block transition-all hover:bg-red-800">
              Login
            </button>
          </form>

          <p className="my-5 ">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-900 text-red-500 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
