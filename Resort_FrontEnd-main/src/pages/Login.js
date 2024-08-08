import { Link } from "react-router-dom";
import '../App.css';
import React from "react";
import NavBar from '../components/login_page/NavBar';
import Introduction from '../components/login_page/Introduction';
import Background from '../components/login_page/Background';
import LoginForm from '../components/login_page/login_form';


const Login = () => {


    return (
        <div>
            
                <>
        <Background></Background>
        <NavBar></NavBar>
        <div className="flexbox">
        <Introduction></Introduction>
        <LoginForm></LoginForm>
        </div>   
        </>
        
        </div>
    )
};

export default Login;