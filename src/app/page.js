"use client";
import Link from "next/link"
import Image from "next/image"
import bars from "./images/bars-solid.svg"
import Job from "@/components/Job";
import facebook from "./images/facebook.svg"
import twitter from "./images/twitter.svg"
import linkedin from "./images/linkedin.svg"
import { useEffect, useState } from "react";
import Popuppost from "@/components/Popuppost";
import { getFirestore, addDoc, collection } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import Popupapply from "@/components/Popupapply";

export default function page() {
    const [name,setName]=useState("")
    const [pop,setPop]=useState(false)
    const [pop2,setPop2]=useState(false)
    const router = useRouter()
    const [popshow,setpopshow]=useState(false)
    const [popshow2,setpopshow2]=useState(false)
    if(popshow){
        setTimeout(() => {
            setpopshow(false)
        },2000);
    }
    if(popshow2){
        setTimeout(() => {
            setpopshow2(false)
        },2000);
    }

    let [storedValues, setStoredValues] = useState([]);
    const [job_post, setjob_post] = useState('');
    const [job_desc, setjob_desc] = useState('');
    const [toggle,setToggle]=useState(false)
    console.log(job_post)
    console.log(job_desc)

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

    const db = getFirestore();

    const saveDataToFirestore = async () => {
        const docRef = await addDoc(collection(db, "posts"), {
            job_desc:job_desc,
            job_titel:job_post,
            remote:toggle,
            job_owner:name
        });
        setPop(false)
        fetchDataFromFirestore()
    };


    const fetchDataFromFirestore = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const temporaryArr = [];
        querySnapshot.forEach((doc) => {
              temporaryArr.push(doc.data());
        });
        setStoredValues(temporaryArr);
  };

    // setTimeout(() => {
    //     fetchDataFromFirestore()
    // }, 5000);
    useEffect(()=>{
        let name= JSON.parse(window.sessionStorage.getItem("user-info"));
        fetchDataFromFirestore()
        if(name){
            setName(name.fullname) 
        }
    },[])

    let signout=()=>{
        
        setName(null);
        window.sessionStorage.removeItem("user-info");
    }
    
    const golog=()=>{
        router.push("./Login")
    }

  return (
    <>
    <div className="container-2xl">
        <section className="landing">

            <nav className="flex sm:justify-around justify-between p-4 items-center">
                <div className="nav_icon capitalize font-bold text-2xl">
                    jobs
                </div>

                <div className="nav_content flex items-center ml-5">
                    <div className="nav_list flex">
                        <input type="text" id="job_search" placeholder="search for job" className="job_search_bar"/>
                    </div>
                    {name?(<>
                     <p className="font-bold ml-8 text-xs sm:text-base">welcome {name}</p>
                        <button className="sm:ml-6 ml-3 log_button capitalize text-xs sm:text-base" onClick={()=>{signout()}}>sign out</button>
                   

                    </>):(<>
                    <Link href="./Login">
                    <button className="ml-6 log_button capitalize">log in</button></Link>
                    </>)}
                    
                </div>

                <div className="bar hidden"> 
                    <Image src={bars} width={30} height={30} alt="bars" className="" />
                </div>
            </nav>

            <div className="landing_content">
                <p className="my-3 " style={{color:"gray"}}>Easiest way to find a perfect job</p>
                <h1 className="font-bold my-3 text-2xl">Find Your Next Dream Job</h1>
                <button style={{backgroundColor:"#023047"}} className="my-5  log_button capitalize" onClick={()=>name? setPop(true):golog()}>post a job</button>

            </div>
            
        </section>
        <Popuppost trigger={pop} setpopshow2={setpopshow2} saveDataToFirestore={saveDataToFirestore} setTrigger={setPop} toggle={toggle} setToggle={setToggle} job_post={job_post} setStoredValues={setStoredValues} job_desc={job_desc} setjob_post={setjob_post} setjob_desc={setjob_desc}></Popuppost>
        {popshow2?(<><div className="popsucsses">
    <div className="alert alert-success" role="alert">
    <h4 className="alert-heading m-auto font-bold text-xl " style={{width:"fit-content"}}>Successfully!</h4>
    <p className="mb-0 mt-2">The job has been post successfully.</p>
    </div></div></>)
    :(<></>)
    }
    </div>

    <section className="jobs_section">
        <div className="jobs_header my-8  ">
        Browse From Our Top Jobs
        </div>
        <div className="jobs my-16   mx-4 flex flex-wrap gap-3">
            {storedValues.map(post=>(
                <Job name={name} setPop2={setPop2} golog={golog} job_titel={post.job_titel} job_desc={post.job_desc} remote={post.remote} job_owner={post.job_owner}/>
            ))}
        </div>
        <Popupapply trigger={pop2} setTrigger={setPop2} setpopshow={setpopshow}/>
        
        {popshow?(<><div className="popsucsses">
    <div className="alert alert-success" role="alert">
    <h4 className="alert-heading m-auto font-bold text-xl " style={{width:"fit-content"}}>Successfully!</h4>
    <p className="mb-0 mt-2">The application has been sent successfully.</p>
    </div></div></>)
    :(<></>)
    }
    </section>

    <section className="footer">
        <div className="footer_content flex justify-center sm:justify-between flex-wrap">

            <div className="social w-full sm:w-2/4">
                <div className="social_header m-5 flex sm:block justify-center gap-20">
                    <h1 className="font-bold text-xl my-4">jobs</h1>
                    <p className="w-2/4 my-4">The automated process starts as soon as your clothes go into the machine.The outcome is gleaming clothes.</p>
                </div>
                <div className="social_links m-5 flex gap-3 justify-center sm:justify-start ">
                    <Link href="#"><Image src={facebook} width={20} height={20}  alt="icon" className="social_icon"/></Link>
                    <Link href="#"><Image src={twitter} width={20} height={20}  alt="icon" className="social_icon"/></Link>
                    <Link href="#"><Image src={linkedin} width={20} height={20} style={{height:"20px"}}  alt="icon" className="social_icon"/></Link>
                </div>
            </div>

            <div className="subscribe w-full sm:w-2/4 flex justify-end">
                <div className="sub_header m-5">
                    <h1 style={{width:"fit-content"}} className="font-bold my-3 mx-auto sm:mx-1">Subscribe Newsletter</h1>
                    <p>Subscribe newsletter to get updates about new jobs.</p>
                    <input type="email" className="sup_input block my-4 mx-auto sm:mx-1" placeholder="Enter your email"/>
                    <button type="button" className="log_button capitalize flex mx-auto sm:mx-1 my-4">subscribe</button>
                </div>
            </div>

            <div className="cobyright">
            &copy:{new Date().getFullYear()};powerd by mohamed hisham
            </div>
        </div>
    </section>
    </>
  )
}
