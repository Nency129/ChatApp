import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Homepage from "./page/Homepage";
import ChatPage from "./page/ChatPage";
import { useEffect, useState } from "react";
import { chatcontext } from "./Context/ChatProvider";
import "react-loading-skeleton/dist/skeleton.css";
import Splashpage from "./page/Splashpage";
import axios from "axios";


function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState([]);

  function PrivateRouter() {
    return user !== null ? (
      <>
        <Outlet />
      </>
    ) : (
      <>
        {JSON.parse(localStorage.getItem("chitchatuser")) === null && (
          <Navigate to="/home" />
        )}
      </>
    );
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("chitchatuser")));
  }, []);

  useEffect(() => {
    const func = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(`http://localhost:5000/api/chat`, config);
      setResult(res.data);
      // setChats(res.data);
    };
    func();
  }, []);

  const value = { user, setUser,result,setResult};
  return (
    <chatcontext.Provider value={value}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Splashpage/>}></Route>
            <Route exact path="/home" element={<Homepage />}></Route>
            {/* <Route exact path="/chats" element={<PrivateRouter />}>
              <Route exact path="/chats" element={<ChatPage />}></Route> 
            </Route> */}
            <Route exact path="/chats/:id" element={<PrivateRouter />}>
              <Route exact path="/chats/:id" element={<ChatPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </chatcontext.Provider>
  );
}

export default App;
