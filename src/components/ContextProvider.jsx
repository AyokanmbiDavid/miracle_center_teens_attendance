import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const ChatContext = createContext();

const ContextProvider = ({children}) => {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("staggerUser")) || {username:"",id:"",email:"",});
  const [Messages, setMessages] = useState()
  const [socket, setsocket] = useState(null);
  const [currentChat, setcurrentChat] = useState(null);
  const [selectedUser, setselectedUser] = useState()

  useEffect(() => {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const { data } = await API.get(`/api/messages/${user._id}`);
          setMessages(data);
        } catch (err) {
          console.error("Error fetching messages:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }, []);

  return (
  <ChatContext.Provider value={{user,socket,setsocket,currentChat,setcurrentChat,Messages,selectedUser,setselectedUser}} >
    {children}
    </ChatContext.Provider>
  )
}

export default ContextProvider