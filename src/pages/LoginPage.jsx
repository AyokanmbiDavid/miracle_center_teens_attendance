import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LoadingSmall } from "../components/Exporting";
import { CloudUpload, DoorOpen, EyeClosed, EyeIcon, Info, LockIcon, ShoppingCart } from "lucide-react";
import { ShopContext } from "../components/ContextProvider";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passform, setPassform] = useState({email:"", security_question:"",password:""});
  const [passerror, setPasserror] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [passtype, setpasstype] = useState('password');

  // passing functions from the context
  const {cancelErr,notify} = useContext(ShopContext)

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if(token) {
  //   navigate('/')
  //   }
  // },[])

  async function sendNotify (type,message) {
    notify(type,message);

    setTimeout(() => {
      cancelErr()
    }, 3000);
  }

 const handleSubmit = async (e) => {
  e.preventDefault(); // Moved to the top for better practice
  
  // PASSWORD LENGTH CHECK
  if (formData.password.length < 6) {
    sendNotify("failure","password must be 6 digit long")
    setTimeout(() => { setError(""); }, 3000);
    return; // This stops the form from submitting
  }

  setLoading(true);
  try {
    await API.post("/api/auth/login", formData).then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      sendNotify("success","login successful")
      setTimeout(() => {
        navigate('/')
      }, 1000)
    })
  } catch (err) {
    setLoading(false);
    if (err?.response?.message) {
      setError("Invalid credentials");
    } else {
      sendNotify("failure","NetworkError")
    }        
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
          className="w-full bg-green-200/70 p-3 text-center text-green-700/70 text-xs rounded-l-3xl rounded-md hover:bg-green-300/50 duration-300 flex items-center gap-3 justify-center">
          Sign In <DoorOpen/>
          </Link>

          {/* signup */}
          <Link to={'/signup'}
          className="w-full p-3 text-center text-green-700/70 text-xs rounded-r-3xl rounded-md hover:bg-green-300/50 duration-300 flex items-center justify-center gap-3">
          Sign Up <CloudUpload/>
          </Link>
        </div>

          <h1 className="font-semiibold flex items-center gap-2 text-blue-600/70 mb-3 pb-2 border-b-2 border-slate-300">Login to ShoppingCart <ShoppingCart/></h1>

          <form onSubmit={handleSubmit}
          className="flex flex-col">
            <label htmlFor="" className="text-sm mt-3 text-gray-800">Email</label>
            {/* email */}
            <input type="email"
            className="bg-slate-100 border-0 py-4 rounded-xl text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="david@gmail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required/>

            <label htmlFor="" className="text-sm mt-3 text-gray-800">Password</label>
            {/* password */}
            <div className="w-full relative">
            <input type={passtype}
            className="w-full h-full bg-slate-100 border-0 py-4 rounded-xl text-xs focus:ring-2 focus:ring-blue-200 mt-2" 
            placeholder="Password..."
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required/>
            <button type="button"
            className="absolute right-5 top-1 h-full"
            onClick={() => setpasstype(passtype == 'password' ? 'text' : 'password')}>
              {passtype == "password" ? <EyeClosed size={15}/> : <EyeIcon size={15}/>}
            </button>
            </div>
           
            {/* forgot password */}
            <div className="flex w-full justify-end">
              <a 
              className="flex items-center gap-2 text-xs mt-2 text-red-600">
                forgot password <Info size={15}/>
              </a>
            </div>

            {/* button for submit */}
            <button 
            className="mt-4 w-full rounded-xl text-white flex items-center gap-1 justify-between cursor-pointer duration-300">
                <span className="w-full bg-green-500 text-xs rounded-l-2xl flex justify-center items-center rounded-md p-3 font-semibold hover:shadow-md duration-300">
                  {loading ? <LoadingSmall/> : 'Sign In'}
                </span>
                <span className="p-3 bg-green-700/80 rounded-r-2xl rounded-md hover:shadow-md duration-300">
                  <DoorOpen size={16}/>
                </span>
            </button>
          </form>
       </div>
    </div>
   </>
  );
};

export default LoginPage;