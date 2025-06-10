/* eslint-disable react/prop-types */
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const OAuth = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Example: simulate login or call your own auth API
      const dummyUser = {
        name: "Demo User",
        email: "demo@example.com",
      };

      // Simulate storing credentials in Redux
      dispatch(setCredentials(dummyUser));

      toast.success("Login successful (Dummy)");
      navigate("/");

      // If you want real login, replace above with a fetch to your backend
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  };

  return (
    <Button
      type="button"
      className="bg-blue-600 text-white mx-auto block rounded-md p-2 m-4 justify-center"
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default OAuth;
