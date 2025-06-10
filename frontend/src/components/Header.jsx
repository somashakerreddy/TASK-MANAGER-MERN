import axios from "axios";
import Button from "./Button";
import { BiTask } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../redux/features/auth/authSlice";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const logoutUser = async () => {
  const { data } = await axios.post(`${baseURL}/api/v1/user/logout`);
  return data;
};

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.auth.userInfo);

  const isLoginPage = window.location.pathname === "/login";
  const isSignupPage = window.location.pathname === "/signup";

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());
      queryClient.setQueryData(["user"]);
      toast.success("Logout successful");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    },
  });

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg backdrop-blur-sm border-b border-white/10 transition-all duration-300 hover:shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <BiTask className="text-white text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-wider group-hover:text-blue-100 transition-colors duration-300">
              Task Manager
            </h1>
          </div>

          {/* Navigation Section */}
          <nav className="flex items-center space-x-4">
            {!userinfo?.email ? (
              <div className="flex items-center space-x-3">
                {/* Login Link */}
                {!isLoginPage && (
                  <Link
                    to="/login"
                    className="relative px-6 py-2.5 text-white font-medium rounded-lg 
                             bg-white/10 backdrop-blur-sm border border-white/20
                             hover:bg-white/20 hover:border-white/30 hover:scale-105
                             focus:outline-none focus:ring-2 focus:ring-white/50
                             transition-all duration-300 ease-out
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-transparent before:via-white/5 before:to-transparent
                             before:translate-x-[-100%] hover:before:translate-x-[100%]
                             before:transition-transform before:duration-700 before:ease-out
                             overflow-hidden group"
                  >
                    <span className="relative z-10 group-hover:text-blue-100 transition-colors duration-300">
                      Login
                    </span>
                  </Link>
                )}

                {/* Signup Link */}
                {!isSignupPage && (
                  <Link
                    to="/signup"
                    className="relative px-6 py-2.5 text-blue-600 font-medium rounded-lg
                             bg-white hover:bg-blue-50 hover:scale-105
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50
                             transition-all duration-300 ease-out
                             shadow-md hover:shadow-lg
                             before:absolute before:inset-0 before:bg-gradient-to-r
                             before:from-blue-500/0 before:via-blue-500/10 before:to-blue-500/0
                             before:translate-x-[-100%] hover:before:translate-x-[100%]
                             before:transition-transform before:duration-700 before:ease-out
                             overflow-hidden group"
                  >
                    <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                      Signup
                    </span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User Welcome Message */}
                <div className="hidden sm:block text-white/90 font-medium animate-fade-in">
                  Welcome, {userinfo.name || userinfo.email}
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="relative px-6 py-2.5 text-white font-medium rounded-lg
                           bg-gradient-to-r from-red-500 to-red-600
                           hover:from-red-600 hover:to-red-700 hover:scale-105
                           active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-red-500/50
                           transition-all duration-300 ease-out
                           shadow-md hover:shadow-lg
                           before:absolute before:inset-0 before:bg-gradient-to-r
                           before:from-transparent before:via-white/20 before:to-transparent
                           before:translate-x-[-100%] hover:before:translate-x-[100%]
                           before:transition-transform before:duration-500 before:ease-out
                           overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    {mutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <span className="group-hover:text-red-100 transition-colors duration-300">
                        Logout
                      </span>
                    )}
                  </span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform scale-x-0 hover:scale-x-100 transition-transform duration-500 ease-out"></div>
    </header>
  );
};

export default Header;