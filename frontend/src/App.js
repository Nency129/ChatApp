import "./App.css";
import {BrowserRouter,Navigate,Outlet,Route,Routes} from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Homepage from "./page/Homepage";
import ChatPage from "./page/ChatPage";
import {  useEffect, useState } from "react";
import { chatcontext } from "./Context/ChatProvider";
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [user, setUser] = useState(null)
  
  function PrivateRouter() {
    return user !== null ? <>
      <Outlet />
  </> : <>
      {
        JSON.parse(localStorage.getItem("chitchatuser")) === null && <Navigate to="/" />
      }
  </>
}

useEffect(() => {
  setUser(JSON.parse(localStorage.getItem("chitchatuser")))
}, [])

const value = {user, setUser}
  return (
    <chatcontext.Provider value={value}>
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element= {<Homepage/>}></Route>
          <Route exact path="/chats" element={<PrivateRouter/>}>
          <Route exact path="/chats" element={<ChatPage/>}></Route>
          </Route>
        </Routes>
        </BrowserRouter>
    </div>
    </chatcontext.Provider>

  );
}

export default App;
