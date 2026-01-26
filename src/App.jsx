import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SearchItem from "./pages/SearchItem";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { ShopContext } from "./components/ContextProvider";
import { X } from "lucide-react";
import {motion} from "framer-motion"

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const {err,cancelErr,} = useContext(ShopContext)

  return (
      <>
        <div className="">
          {/* notification */}
          {err && 
          <div
          className="fixed z-50 w-full py-2 flex justify-end px-3 items-center gap-2">
            {err.type && <>
              <motion.div 
                initial={{x:250}}
                animate={{x:0}}
                transition={{delay:0.2}}
                className={`${err.type == "success" ? 'bg-green-500' : 'bg-red-500'} text-white text-sm p-2 rounded-xl flex px-3 items-center gap-2 max-md:max-w-3/5`}>
                {err.message}
            
              <button
              onClick={() => cancelErr()}
              className="cursor-pointer">
                <X  size={15}/>
              </button>
              </motion.div>

              
            </>}
          </div>}

          {/* routes */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Only allow access to Chat if logged in */}
            {/* home page */}
            <Route 
              path="/" 
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
            />
            {/* search page */}
            <Route 
              path="/search" 
              element={isAuthenticated ? <SearchItem /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile/> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </>
  );
}

export default App;