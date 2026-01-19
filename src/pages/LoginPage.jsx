import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { CloudUpload, DoorOpen, EyeIcon, Info, LockIcon, ShoppingCart } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passform, setPassform] = useState({email:"", security_question:"",password:""});
  const [passerror, setPasserror] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passType, setpassType] = useState("password");
  const location = useLocation()

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if(token) {
  //   navigate('/')
  //   }
  // },[])


  function handleChangeForm (e,name) {
    setFormData({...formData,
      [name]:e.target.value
    })
  }
   function handleChangePass (e,name) {
    setPassform({...formData,
      [name]:e.target.value
    })
  }
 const handleSubmit = async (e) => {
  e.preventDefault(); // Moved to the top for better practice
  
  // PASSWORD LENGTH CHECK
  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters long");
    setTimeout(() => { setError(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    const { data } = await API.post("/api/auth/login", formData);
    console.log(data._id);
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    setLoading(false);
    navigate("/"); 
    setTimeout(() => {
        navigate('/')
    }, 500)// Go to the Chat Page
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setError("Invalid credentials");
    } else {
      console.log(err);
      setError(err?.message);
    }        
    setTimeout(() => { setError(""); }, 3000);
  }
};

async function submitPass (e) {
  e.preventDefault();

    
  // PASSWORD LENGTH CHECK
  if (passform.password.length < 6) {
    setPasserror("Password must be at least 6 characters long");
    setTimeout(() => { setPasserror(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    const { data } = await API.post("/api/auth/resetpass", passform.password);
    console.log(data._id);
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    setLoading(false);
    navigate("/", {replace: true}); 
    setTimeout(() => {
        navigate('/')
    }, 500)// Go to the Chat Page
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setPasserror("Invalid security question");
    } else {
      console.log(err);
      setPasserror(err?.message);
    }        
    setTimeout(() => { setPasserror(""); }, 3000);
  }
}
  return (
   <>
    <div className=" w-full h-screen relative flex justify-center items-center">

       {/* main frame */}
       <div className="w-full lg:w-3/10 px-4">
        {/* navbar */}
        <div className="w-full mb-3 flex gap-2 justify-between items-center">
          {/* sign In */}
          <Link to={'/login'}
          className="w-full bg-blue-200/70 p-3 text-center text-blue-700/70 text-xs rounded-l-3xl rounded-md hover:bg-blue-300/50 duration-300 flex items-center gap-3 justify-center">
          Sign In <DoorOpen/>
          </Link>

          {/* signup */}
          <Link to={'/signup'}
          className="w-full p-3 text-center text-blue-700/70 text-xs rounded-r-3xl rounded-md hover:bg-blue-300/50 duration-300 flex items-center justify-center gap-3">
          Sign Up <CloudUpload/>
          </Link>
        </div>

          <h1 className="font-semiibold flex items-center gap-2 text-blue-600/70 mb-3 pb-2 border-b-2 border-slate-300">Login to ShoppingCart <ShoppingCart/></h1>

          <form onSubmit={handleSubmit}
          className="flex flex-col">
            <label htmlFor="" className="text-sm mt-3 text-gray-800">Email</label>
            {/* email */}
            <input type="email"
            className="bg-slate-100 border-0 rounded-xl text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="david@gmail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Password</label>
            {/* password */}
            <input type="password"
            className="bg-slate-100 border-0 rounded-xl text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="Password..."
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required/>

            {/* forgot password */}
            <div className="flex w-full justify-end">
              <a 
              className="text-red-700 p-2 bg-red-200/70 mt-3 rounded-l-full rounded-xl cursor-pointer hover:bg-red-300/50 duration-300 text-xs flex justify-center gap-3 items-center">
                forgot password <Info size={15}/>
              </a>
            </div>

            {/* button for submit */}
            <button 
            className="mt-4 w-full bg-green-500/90 rounded-xl text-white flex items-center justify-between cursor-pointer hover:shadow-md duration-300">
                <span className="w-full">Sign In</span>
                <span className="p-3 bg-green-700/80 rounded-r-xl">
                  <DoorOpen/>
                </span>
            </button>
          </form>
       </div>
    </div>
   </>
  );
};

export default LoginPage;