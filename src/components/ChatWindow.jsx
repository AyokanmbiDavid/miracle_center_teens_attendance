import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Image, Mic, Trash2, MoreVertical, Edit2, X, File, Paperclip, Edit2Icon, MoreVerticalIcon, Reply, Bookmark } from "lucide-react";
import API from "../api/axios";
import axios from "axios";
import { LoadingSmall } from '../components/Exporting.jsx'

const ChatWindow = ({ user, onBack, socket, isTyping }) => {
  const [messages, setMessages] = useState([
    {id:12213122312,senderId:"69527761f8bf476e998d31fc",receiverId:"2131xqwke3",text:"How do you do"},
    {id:56444747477,senderId:"2131xqwke307n43545xw4w4x",receiverId:"69527761f8bf476e998d31fc",text:"Am good"},
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null); // Tracks which message is being edited
  const [activeMenu, setActiveMenu] = useState(null); // Tracks which message menu is open
  
  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const typingTimeoutRef = useRef(null);

  // --- 1. History & Scrolling ---
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
  }, [user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 2. Socket Listeners ---
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (incomingMsg) => {
      if (incomingMsg.senderId === user._id) {
        setMessages((prev) => [...prev, incomingMsg]);
      }
    });
    
    // Listen for deletions/edits from the other side
    socket.on("message_deleted", (messageId) => {
        setMessages((prev) => prev.filter(m => m._id !== messageId));
    });

    socket.on("message_edited", (updatedMsg) => {
        setMessages((prev) => prev.map(m => m._id === updatedMsg._id ? updatedMsg : m));
    });

    return () => {
        socket.off("receive_message");
        socket.off("message_deleted");
        socket.off("message_edited");
    };
  }, [socket, user._id]);

  // --- 3. CRUD Actions ---

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);

    try {
      if (editingMessage) {
        // EDIT MODE
        const { data } = await API.put(`/api/messages/edit/${editingMessage._id}`, { text: newMessage });
        setMessages(prev => prev.map(m => m._id === data._id ? data : m));
        socket.emit("edit_message", data);
        setEditingMessage(null);
      } else {
        // SEND MODE
        const messageData = { receiverId: user._id, text: newMessage, messageType: "text" };
        const { data } = await API.post("/api/messages/send", messageData);
        socket.emit("send_message", data);
        setMessages((prev) => [...prev, data]);
      }
      setNewMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/api/messages/delete/${messageId}`);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      socket.emit("delete_message", { messageId, receiverId: user._id });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm("Clear all messages with this user?")) return;
    try {
      await API.delete(`/api/messages/clear/${user._id}`);
      setMessages([]);
    } catch (err) {
      console.error("Clear chat failed", err);
    }
  };

  const startEdit = (msg) => {
    setEditingMessage(msg);
    setNewMessage(msg.text);
    setActiveMenu(null);
  };

  // --- UI Helpers ---
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (!socket) return;
    socket.emit("typing", { receiverId: user._id });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { receiverId: user._id });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5] relative">
      
      {/* Header */}
      <div className="h-16 flex items-center px-4 gap-3 bg-white shadow-sm shrink-0">
        <button onClick={onBack} className="md:hidden text-gray-600"><ArrowLeft size={24} /></button>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-700">{user.username}</span>
          <span className={`text-xs ${isTyping ? "text-green-500 italic animate-pulse" : "text-gray-400"}`}>
            {isTyping ? "typing..." : "online"}
          </span>
        </div>
        {/* Clear Chat Button */}
        <div className="flex items-center justify-center">
          <button onClick={handleClearChat} className="border border-gray-200 rounded-l-full px-3 p-1 text-gray-700 hover:bg-gray-200 cursor-pointer">
            <Trash2 size={20} />
        </button>
        {/* Edit Chat Name */}
          <button className="border border-gray-200 px-3 p-1 text-gray-700 hover:bg-gray-200 cursor-pointer">
            <Edit2Icon size={20} />
        </button>
        {/* More Icon */}
          <button  className="border border-gray-200 rounded-r-full px-3 p-1 text-gray-700 hover:bg-gray-200 cursor-pointer">
            <MoreVerticalIcon size={20} />
        </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex flex-col justify-center ${msg.senderId === user._id ? "items-start" : "items-end"} group relative`}>
            <div className={`max-w-[75%] flex items-end gap-2 p-1 px-3 rounded-2xl shadow-sm relative ${msg.senderId === user._id ? "bg-white text-gray-800 rounded-sm " : "bg-blue-600 text-white rounded-3xl  rounded-br-md"}`}>
              
              {/* Message Context Menu (Only for your own messages) */}
              {msg.senderId !== user._id && (
                  <button 
                    onClick={() => setActiveMenu(activeMenu === msg._id ? null : msg._id)}
                    className="absolute -left-8 top-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={16} />
                  </button>
              )}

              {msg.text && <p className="text-sm">{msg.text}</p>}
              {msg.messageType === "image" && <img src={msg.mediaUrl} className="rounded-lg mt-1" alt="" />}
              {msg.messageType === "audio" && <audio src={msg.mediaUrl} controls className="mt-1 h-8" />}
              
              <div className="flex items-center justify-end gap-1 mt-1 opacity-60 text-[10px]">
                {msg.isEdited && <span>(edited)</span>}
                <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* tools */}
             {msg.senderId !== user._id && (
              <div className="flex mt-2">
                      <button className="-px-3 p-2 rounded-l-full border border-gray-400 cursor-pointer hover:bg-gray-200"><Reply size={12} /></button>
                      <button onClick={() => startEdit(msg)} className="border border-gray-400 px-3 p-2 cursor-pointer hover:bg-gray-200"><Edit2 size={12}/></button>
                      <button onClick={() => handleDeleteMessage(msg._id)} className="border border-gray-400 px-3 p-2 cursor-pointer hover:bg-gray-200"><Trash2 size={12}/> </button>
                      <button className="px-3 p-2 border border-gray-400 rounded-r-full cursor-pointer hover:bg-gray-200"><Bookmark size={12} /></button>
                  </div>
             )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Form */}
      <div className="bg-white p-2 absolute bottom-0 w-full">
          {editingMessage && (
              <div className="flex items-center justify-between px-4 py-1 bg-gray-50 text-xs text-blue-600 rounded-t-lg">
                  <span>Editing message...</span>
                  <button onClick={() => {setEditingMessage(null); setNewMessage("");}}><X size={14}/></button>
              </div>
          )}
          <form onSubmit={handleSend} className="p-2 flex items-center justify-center">
            <label 
            className="cursor-pointer border-2 border-gray-200 px-3 p-2 rounded-l-full">
              <Paperclip size={20} /><input type="file" className="hidden" onChange={(e) => {/* your upload logic */}} /></label>
            <input
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="w-full border-2 border-gray-200 focus:outline-none p-2 text-sm"
            />
            <button type="submit" disabled={loading} 
            className="p-2 px-6 bg-green-500 text-white border-2 border-green-500 rounded-r-full">
              {loading ? <LoadingSmall /> : <Send size={18} />}
            </button>
          </form>
      </div>
    </div>
  );
};

export default ChatWindow;