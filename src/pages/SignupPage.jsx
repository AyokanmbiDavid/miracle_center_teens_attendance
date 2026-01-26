import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { Cloud, CloudUpload, DoorOpen, EyeClosed, EyeIcon, FileIcon, ShoppingCart } from "lucide-react";
import { ShopContext } from "../components/ContextProvider";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "",security_question:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passtype, setpasstype] = useState("password");
  const location = useLocation()

  // passing values from context
  const {notify,cancelErr} = useContext(ShopContext);
  
  async function sendNotify (type,message) {
    notify(type,message);

    setTimeout(() => {
      cancelErr()
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD LENGTH CHECK
    if (formData.password.length < 6) {
      sendNotify("failure","password must be 6 characters long")
      setTimeout(() => { setError(""); }, 3000);
      return; // Stop form submission
    }

    setLoading(true);
    try {
      await API.post("/api/auth/signup", formData).then(data => {
        // if i get a response
        if (data._id) {
          sendNotify("success","user created succesfully")
        } 

        setTimeout(() => {
          API.post("/api/auth/login", {email:formData.email, password:formData.password}).then(data => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data._id);
          sendNotify("success","login successful")
          setTimeout(() => {
            navigate('/')
          }, 1000)
          })
        }, 2000);
      })
      setLoading(false);
       
      
    } catch (err) {
      setLoading(false);
      if (err?.response) {
        sendNotify("failure","")
      } else {
        sendNotify("failure","Network Error")
      }        
    }
  };

  function handleChangeForm (e,name) {
    setFormData({...formData, 
      [name]: e.target.value
    })
  }

  return (
    <>
    <div className=" w-full min-h-screen relative flex justify-center items-center overflow-y-auto">

       {/* main frame */}
       <div className="w-full lg:w-3/10 px-4 mt-5">
        {/* navbar */}
        <div className="w-full mb-3 flex gap-2 justify-between items-center">
          {/* sign In */}
          <Link to={'/login'}
          className="w-full  p-3 text-center text-green-700/70 text-xs rounded-l-3xl rounded-md hover:bg-green-300/50 duration-300 flex items-center gap-3 justify-center">
          Sign In <DoorOpen/>
          </Link>

          {/* signup */}
          <Link to={'/signup'}
          className="w-full p-3 text-center bg-green-200/70 text-green-700/70 text-xs rounded-r-3xl rounded-md hover:bg-green-300/50 duration-300 flex items-center justify-center gap-3">
          Sign Up <CloudUpload/>
          </Link>
        </div>

          <h1 className="font-semiibold flex items-center gap-2 text-green-800 pb-3 mb-3 border-b-2 border-slate-300">Sign Up with ShoppingCart <ShoppingCart/></h1>

          <form onSubmit={handleSubmit}
          className="flex flex-col">
            <label htmlFor="" className="text-sm mt-3 text-gray-800">Email</label>
            {/* email */}
            <input type="email"
            className="bg-slate-100 border-0 py-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="david@gmail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Password</label>
            {/* password */}
            <div className="w-full relative">
              <input type={passtype}
            className="w-full h-full py-4 bg-slate-100 border-0 rounded-xl text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="Password..."
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required/>
            <button type="button"
            className="absolute right-5 top-1 h-full"
            onClick={() => setpasstype(passtype == 'password' ? 'text' : 'password')}>
              {passtype == "password" ? <EyeClosed size={15}/> : <EyeIcon size={15}/>}
            </button>
            </div>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Username</label>
            {/*username*/}
            <input type="text"
            className="bg-slate-100 border-0 py-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="user10335"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Security Question</label>
            {/* security question */}
            <input type="text"
            className="bg-slate-100 border-0 py-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="what i can remember"
            onChange={(e) => setFormData({...formData, security_question: e.target.value})}
            required/>
            <span className="text-yellow-600 text-xs text-center mt-1">security question will be used to reset password, if you forget it</span>

            {/* button for submit */}
            <button 
            className="mt-4 mb-5 w-full rounded-xl text-white flex gap-1 items-center justify-between  cursor-pointer">
                <span className="w-full text-xs bg-green-500 p-3 rounded-l-2xl flex justify-center items-center rounded-md font-semibold hover:shadow-md duration-300">
                  {loading ? <LoadingSmall/> : 'Sign Up'}
                </span>
                <span className="p-3 bg-green-700/80 rounded-r-xl rounded-md hover:shadow-md duration-300">
                  <CloudUpload size={16}/>
                </span>
            </button>
          </form>
       </div>
    </div>
    </>
  );
};

export default SignupPage;