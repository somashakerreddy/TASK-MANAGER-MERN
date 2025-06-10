import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { useState } from "react";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const loginUser = async (userData) => {
  const { data } = await axios.post(`${baseURL}/api/v1/user/login`, userData);
  return data;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

function Login() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormFocused, setIsFormFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.setQueryData(["user"], data);
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    },
  });

  const login = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main container with enhanced styling */}
        <div 
          className={`
            bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20
            transform transition-all duration-500 ease-out hover:scale-105
            ${isFormFocused ? 'shadow-blue-500/25 shadow-2xl' : ''}
          `}
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
        >
          {/* Header section with gradient text */}
          <div className="text-center pt-8 pb-6 px-8">
            <div className="inline-block">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                Welcome Back
              </h2>
              <div className="w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2 transform scale-x-0 animate-pulse delay-500"></div>
            </div>
            <p className="text-gray-600 mt-3 opacity-0 animate-fade-in delay-1000">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              {/* Email field with floating animation */}
              <div className="group relative">
                <div className="relative overflow-hidden rounded-xl">
                  <Input
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-300 group-hover:shadow-md transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 animate-bounce">
                    <span className="inline-block animate-spin">⚠️</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field with enhanced styling */}
              <div className="group relative">
                <div className="relative overflow-hidden rounded-xl">
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 hover:border-gray-300 group-hover:shadow-md transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 animate-bounce">
                    <span className="inline-block animate-spin">⚠️</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Enhanced submit button */}
              <div className="relative group">
                <Button
                  textColor="text-white"
                  type="submit"
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-lg
                    bg-gradient-to-r from-blue-600 to-indigo-600 
                    hover:from-blue-700 hover:to-indigo-700
                    transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25
                    active:scale-95 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    relative overflow-hidden
                    ${isSubmitting ? 'animate-pulse' : 'hover:animate-pulse'}
                  `}
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Logging in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </div>

              {/* Divider with animation */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 animate-fade-in delay-1500">
                    or continue with
                  </span>
                </div>
              </div>

              {/* OAuth component with enhanced styling */}
              <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <OAuth title={"Login with Google"} />
              </div>

              {/* Sign up link with hover effects */}
              <div className="text-center pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:underline decoration-2 underline-offset-2 hover:decoration-blue-600 transform hover:scale-110 inline-block"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Floating elements for extra visual appeal */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-bounce delay-300"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-400 rounded-full opacity-60 animate-bounce delay-700"></div>
        <div className="absolute top-1/2 -left-6 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute top-1/4 -right-6 w-5 h-5 bg-pink-400 rounded-full opacity-50 animate-ping delay-500"></div>
      </div>
    </div>
  );
}

export default Login;