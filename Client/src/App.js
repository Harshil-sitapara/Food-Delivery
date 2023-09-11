import { createContext, useState } from "react";
import "./App.css";
import Home from "./Pages/HomePage";
import Register from "./Pages/Register";
import MyRouter from "./components/routes/MyRouter";
import AdminRoutes from "./Admin/Routes/router";
export const CartContext = createContext();
function App() {
  const [cartSize, setCartSize] = useState(0);
  const [userData, setUserData] = useState({});
  const [loginUserData, setLoginUserData] = useState({});
  return (
    <div className="App">
      <CartContext.Provider
        value={{
          setCartSize,
          cartSize,
          setUserData,
          userData,
          setLoginUserData,
          loginUserData,
        }}
      >
        <MyRouter />
        <AdminRoutes />
      </CartContext.Provider>
    </div>
  );
}

export default App;
