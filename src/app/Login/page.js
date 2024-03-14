"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./login.css"
import Image from "next/image";
import user from "../images/user.png"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,set,ref,get,child} from "firebase/database"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "next/navigation";




export default function page() {
    const[action,setAction]=useState("login");
    const router = useRouter()

    const firebaseConfig = {
        apiKey: "AIzaSyBSaBPOEMZ-AmSuYhGmPX9CE785X1WZbjs",
        authDomain: "jobs-13fcf.firebaseapp.com",
        projectId: "jobs-13fcf",
        storageBucket: "jobs-13fcf.appspot.com",
        messagingSenderId: "630286997969",
        appId: "1:630286997969:web:adbccfb2c2083b063828f0",
        measurementId: "G-020QS72N3X"
        // databaseURL:"https://jobs-13fcf-default-rtdb.firebaseio.com/"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db=getDatabase()
      const auth = getAuth(app)
      const dbref = ref(db)


        let Register=event=>{
            let RegesterEmail = document.getElementById("email")
            let RegesterPassword = document.getElementById("password")
            let Regestername = document.getElementById("userName")
            // event.preventDefault()
        
            createUserWithEmailAndPassword(auth,RegesterEmail.value,RegesterPassword.value)
            .then((Credentials)=>{
                set(ref(db,'UsersAuthList/'+Credentials.user.uid),{
                    fullname:Regestername.value
                })
            })
            .catch((error)=>{
                alert(error.message);
                console.log(error.code);
                console.log(error.message)
            })
            console.log(RegesterEmail);
            console.log(RegesterPassword);
            setAction("login")
        }
        let Login=event=>{
            let RegesterEmail = document.getElementById("logemail")
            let RegesterPassword = document.getElementById("logpassword")
            // event.preventDefault()
        
            signInWithEmailAndPassword(auth,RegesterEmail.value,RegesterPassword.value)
            .then((Credentials)=>{
                console.log(get(child(dbref,'UsersAuthList/'+Credentials.user.uid)))
                get(child(dbref,`UsersAuthList/${Credentials.user.uid}`)).then((snapshot)=>{
                    if(snapshot){
                        sessionStorage.setItem("user-info",JSON.stringify({
                            fullname:snapshot.val().fullname
                        }))
                        router.push("./")
                        console.log(snapshot.val().fullname);}
                    }
                )
    })
            .catch((error)=>{
                alert(error.message);
                console.log(error.code);
                console.log(error.message)
            })
        }

  return (
    <div>
        <section className='l-section'>
        <div className="container-xxl">
            <div className="login-form">
                <div className="login-img">
                    <Image src={user} width={40} height={40} alt="user"/>
                </div>
                {action==="sign up"?(<>
                    <div className="login-header">sign up</div>
                </>):(<>
                    <div className="login-header">log in</div>
                </>)}
            
            <form >
                {action==="sign up"?(<>
                <label className='login-lable'>
                <input type="text" name="name" id="userName" placeholder='Name' required/>
                </label>
                <label className='login-lable'>

                <input type="email" name="email" id="email" placeholder='Email' required/>

                </label>
                <label className='login-lable' style={{marginBottom:"0px"}}>

                <input type="password" name="password" id="password" placeholder='Password' required/>

                </label>
                <Link style={{margin:"0px 20px"}} href="#" className='f-password'>forget Password ?</Link>
                
                <input id='continue' type="button" className={action==="login"?"login-active":"gray"}  value="continue" onClick={()=>Register()} />
                </>)
                :(<>
                    <label  className='login-lable'>
                
                <input type="email" name="email" id="logemail" placeholder='Email' required/>
                </label>
                <label  className='login-lable' style={{marginBottom:"0px"}}>

                <input type="password" name="password" id="logpassword" placeholder='Password' required/>
                </label>
                <Link style={{margin:"0px 20px"}} href="#" className='f-password'>forget Password ?</Link>
                
                <input id='continue' type="button" className={action==="login"?"login-active":"gray"} value="continue" onClick={()=>{Login()}} />
                </>)}
                
                
            </form>
            
        </div>
                    
                    {action==="sign up"?null:<>
                    <div className="new-to-mzone">
                        <p>New to jobs?</p>
                    </div>
                    <input id='sign-up' className={action==="sign up"?"login-active":"gray"} type="submit" value="sign up" onClick={()=>{setAction("sign up")}}/></>}
                    
                    </div>
    </section>
    </div>
  )
}
