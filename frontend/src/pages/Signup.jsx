import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import OAuth from "../components/OAuth";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const createUser = async (userData) => {
  const { data } = await axios.post(`${baseURL}/api/v1/user/signup`, userData);
  return data;
};

const signupSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function Signup() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password");

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.setQueryData(["user"], data);
      toast.success("🎉 Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred during signup"
      );
    },
  });

  const signup = (data) => {
    mutation.mutate(data);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return "bg-red-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mx-auto w-full max-w-lg rounded-2xl p-8 bg-white shadow-xl backdrop-blur-sm bg-opacity-90"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Join Us Today
          </motion.h2>
          <p className="text-gray-600">Create your account in just a few steps</p>
        </div>

        <div className="border border-purple-200 rounded-xl p-8 shadow-inner bg-gradient-to-br from-white to-purple-50">
          <form onSubmit={handleSubmit(signup)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Input 
                  placeholder="First Name" 
                  {...register("firstname")}
                  className="focus:ring-2 focus:ring-indigo-500"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.firstname.message}</p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Input 
                  placeholder="Last Name" 
                  {...register("lastname")}
                  className="focus:ring-2 focus:ring-indigo-500"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.lastname.message}</p>
                )}
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Input 
                placeholder="Email" 
                type="email" 
                {...register("email")}
                className="focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password.message}</p>
              )}
              {password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password strength: {passwordStrength}/4
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.confirmPassword.message}</p>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitting 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-200"
                }`}
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center justify-center">
                  {isSubmitting ? (
                    "Creating account..."
                  ) : (
                    <>
                      Get Started
                      <motion.span
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="ml-2"
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </>
                  )}
                </div>
              </Button>
            </motion.div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <OAuth title={"Sign up with Google"} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Signup;