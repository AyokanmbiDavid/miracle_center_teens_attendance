import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../components/ContextProvider';
import { Camera, Pen} from 'lucide-react';
import img from '../images/WIN_20250812_21_23_08_Pro.jpg'
import { Link } from 'react-router-dom';

const AccountPage = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", security_question:""});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(ChatContext)

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Navbar />

        <div className="w-full h-screen">
          <h1 className="font-semibold text-2xl my-3 text-green-500 pl-3">
            Account Page
          </h1>

          {/* VIEW ACCOUNT INFOS */}
          <div className="px-2">
            <div className="flex w-full justify-center items-center py-2 mb-3">
              {/* profile pic */}
              <img src={img} className="w-5/10 h-[100px] rounded-l-full "/>
              {/* change profile pic button */}
              <button className="w-4/10 h-[100px] rounded-r-full bg-green-500 text-white flex justify-center items-center">
                <Camera size={30} />
              </button>
            </div>
            {/* Username */}
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-sm  pl-5 py-2 bg-gray-200 rounded-tr-3xl rounded-tl-3xl border border-gray-300 max-w-[50%]">Username</label>
              <div className="w-full pl-2 py-2 border font-semibold border-gray-300 rounded-bl-3xl rounded-br-3xl">
                {user.username}
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col w-full mt-3">
              <label htmlFor="" className="text-sm  pl-5 py-2 bg-gray-200 rounded-tr-3xl rounded-tl-3xl border border-gray-300 max-w-[50%]">Email</label>
              <div className="w-full pl-2 py-2 border font-semibold border-gray-300 rounded-bl-3xl rounded-br-3xl">
                {user.email}
              </div>

              {/* edit button */}
              <Link to={'/edit'}
              className="w-full rounded-full flex mt-5">
                <span className="w-full rounded-l-full text-center py-2 pl-3 border border-blue-400">Edit profile</span>
                <span className="bg-blue-500 flex justify-center items-center px-4 rounded-r-full">
                  <Pen />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountPage