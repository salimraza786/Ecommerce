import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate()

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
    e.preventDefault();

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.SignUP.url , {
        method : SummaryApi.SignUP.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
     })
 
     const dataApi = await dataResponse.json()

     if(dataApi.success){
       toast.success(dataApi.message)
       navigate("/login")
     }

     
     if(dataApi.error){
      toast.error(dataApi.message)
     }
     
    }else{
       toast.error("Plese Check Password and Confirm Password")
    }
  };

  const handleUploadOnPic = async(e) => {
    const file = e.target.files[0]
    
    const imagePic = await imageToBase64(file)
    
    setData((prev) =>{
       return {
          ...prev,
          profilePic:imagePic
       }
    })
  }

 
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="w-full max-w-sm bg-white mx-auto p-5 py-6 rounded-sm">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 cursor-pointer w-full pb-4 pt-2 text-center absolute  bottom-0">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadOnPic}/>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="enter your name"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

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
            </div>

            <div>
              <label>ConfirmPassword : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="enter confirm password"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 w-full max-w-[150px] mt-6 px-6 py-2 rounded-full  text-white hover:scale-110 mx-auto block transition-all hover:bg-red-800">
              Signup
            </button>
          </form>

          <p className="my-5 ">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="hover:text-red-900 text-red-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
