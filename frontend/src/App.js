import "./App.css";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Homepage from "./page/Homepage";
import ChatPage from "./page/ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}></Route>
        <Route exact path="/chats" element={<ChatPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
