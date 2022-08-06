import { useEffect, useState,useContext } from 'react';
import{loginApi} from './Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate ,Link} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login =()=>{
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isShowPassword, setisShowPassword] = useState(false);
    const [loadingAPI, setloadingAPI]=useState(false);

const handleLogin=async()=>{
   // alert("me");
if(!email || !password)
{
    toast.error('Email/Password required');
    return;
}
setloadingAPI(true);
let res= await loginApi(email.trim(),password);
if(res && res.token)
{
   loginContext(email,res.token);
    navigate("/")
}
else{
    if(res && res.status === 400){
        toast.error(res.data.error);
    }
   
}
setloadingAPI(false);
//console.log(">>> get email && password", res);
}

const handlePressEnter = (event)=>{
    if(event && event.key==='Enter')
    {
         handleLogin();
    }
    
}
    return(
    <>
    <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or Username ( eve.holt@reqres.in )</div>
        <input type="text" placeholder="Email or Username"
        value={email} 
        onChange={(event)=>setEmail(event.target.value)}
        />
        <div className="input-2">
        <input type={isShowPassword===true? "text":"password"} placeholder="Password"
        value={password} 
        onChange={(event)=>setPassword(event.target.value)}
        onKeyDown={(event)=>{handlePressEnter(event)}}
        />
        <i className={isShowPassword===true ?"fa-solid fa-eye":"fa-solid fa-eye-slash"}
        onClick={()=>setisShowPassword(!isShowPassword)}
        ></i>
        </div>
        <button className={email && password ? "active":""}
                disabled = {email && password ? false:true}
                onClick ={()=>handleLogin()}
        >{loadingAPI && <i className="fas fa-sync fa-spin"></i>}
        
        &nbsp;&nbsp; &nbsp;Login</button>
        <div className="back"><i className="fa-solid fa-angles-left"></i> 
        <Link to="/">Go back</Link>
        </div>
    </div>
    </>)
}
export default Login;