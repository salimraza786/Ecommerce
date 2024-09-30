import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const Context = useContext(context);
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
     const {value} = e.target
     setSearch(value)

     if(value){
      navigate(`/search?q=${value}`)
     }else{
      navigate("/search")
     }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full flex items-center justify-between container mx-auto px-4">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="Search Product here...."
            className="w-full outline-none "
            onChange={handleSearch}
            value={search}
          />
          <div className="bg-red-800 text-lg min-w-[50px] flex items-center justify-center h-8 rounded-r-full">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-200 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Pannel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 absolute -mt-8 ml-3 w-5 flex items-center justify-center rounded-full">
                <p className="text-xs text-white">
                  {Context?.cartProductCount}
                </p>
              </div>
            </Link>
          )}

          {/* login and logout button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
