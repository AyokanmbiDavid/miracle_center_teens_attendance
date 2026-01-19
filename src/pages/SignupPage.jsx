import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { Cloud, CloudUpload, DoorOpen, EyeIcon, FileIcon, ShoppingCart } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "",security_question:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passType, setpassType] = useState("password");
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD LENGTH CHECK
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setTimeout(() => { setError(""); }, 3000);
      return; // Stop form submission
    }

    setLoading(true);
    try {
      await API.post("/api/auth/signup", formData);
      setLoading(false);
      navigate("/login",{replace: true}); // Redirect to login after successful signup
    } catch (err) {
      setLoading(false);
      if (err?.response) {
        setError('Email registered or invalid credentials');
      } else {
        setError("Network Error");
      }        
      setTimeout(() => { setError(""); }, 3000);
    }
  };

  function handleChangeForm (e,name) {
    setFormData({...formData, 
      [name]: e.target.value
    })
  }

  return (
    <>
    <div className=" w-full relative flex justify-center items-center overflow-y-auto">

       {/* main frame */}
       <div className="w-full lg:w-3/10 px-4 mt-5">
        {/* navbar */}
        <div className="w-full mb-3 flex gap-2 justify-between items-center">
          {/* sign In */}
          <Link to={'/login'}
          className="w-full  p-3 text-center text-blue-700/70 text-xs rounded-l-3xl rounded-md hover:bg-blue-300/50 duration-300 flex items-center gap-3 justify-center">
          Sign In <DoorOpen/>
          </Link>

          {/* signup */}
          <Link to={'/signup'}
          className="w-full p-3 text-center bg-blue-200/70 text-blue-700/70 text-xs rounded-r-3xl rounded-md hover:bg-blue-300/50 duration-300 flex items-center justify-center gap-3">
          Sign Up <CloudUpload/>
          </Link>
        </div>

          <h1 className="font-semiibold flex items-center gap-2 text-blue-600/70 pb-3 mb-3 border-b-2 border-slate-300">Sign Up with ShoppingCart <ShoppingCart/></h1>

          <form onSubmit={handleSubmit}
          className="flex flex-col">
            <label htmlFor="" className="text-sm mt-3 text-gray-800">Email</label>
            {/* email */}
            <input type="email"
            className="bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="david@gmail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Password</label>
            {/* password */}
            <input type="password"
            className="bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="Password..."
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Username</label>
            {/*username*/}
            <input type="text"
            className="bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="user10335"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Security Question</label>
            {/* security question */}
            <input type="text"
            className="bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="what i can remember"
            onChange={(e) => setFormData({...formData, security_question: e.target.value})}
            required/>
            <span className="text-yellow-600 text-xs text-center mt-1">security question will be used to reset password, if you forget it</span>

            {/* button for submit */}
            <button 
            className="mt-4 mb-5 w-full bg-green-500/90 rounded-xl text-white flex items-center justify-between cursor-pointer">
                <span className="w-full">Sign Up</span>
                <span className="p-3 bg-green-700/80 rounded-r-xl">
                  <CloudUpload/>
                </span>
            </button>
          </form>
       </div>
    </div>
    </>
  );
};

export default SignupPage;