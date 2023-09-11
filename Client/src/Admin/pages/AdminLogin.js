import React, { useState } from "react";
import "../admin.css";
import { Alert, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const[alert,setAlert]=useState(false)
    const authAdmin=async()=>{
      try {
        const res = await fetch("http://localhost:8080/admin/login",{
          method:"POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,pass}),
        })
        if(res.status == 200){
          navigate("/admin/dashboard")
        }else{
          setAlert(true)
        }
      } catch (error) {
          console.log("Error while admin login",error)
      }
    }
  return (
    <div className="mainAdminLogin">
     {alert? <Alert severity="error">invalid E-mail or password!</Alert>:""}
      <form>
        <h1 className="admintext">Login</h1>
        <div class="form-group">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "80%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{ width: "80%" }}
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={()=>{authAdmin()}}>LOGIN</Button>
      </form>
    </div>
  );
}
