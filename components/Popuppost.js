"use client";
import "./css/popuppost.css"
import xmark from "./cimages/xmark.svg"
import Image from "next/image";
import { useState } from "react";

export default function Popuppost(props) {

    const post=()=>{
        props.saveDataToFirestore()
        props.setTrigger(false)
        props.setpopshow2(true)
    }

  return (props.trigger)?(
    <>
        <div className="popup">
            <div className="popupinner w-full sm:w-6/12">
                <button className="close_button" type="button" onClick={()=>props.setTrigger(false)}>
                    <Image src={xmark} width={20} height={20} alt="close"/>
                </button>
                <h1 className="jop_posting_header font-bold text-xl text-center my-4 capitalize">job posting</h1>
                {props.children}
                <form className="job_posting_form flex capitalize m-4 sm:m-7 p-4 sm:p-7">
                    <label className="job_titel">
                        job titel
                        <input type="text" required value={props.job_post} onChange={(e)=>props.setjob_post(e.target.value)} />
                    </label>
                    <label className="job_desc">
                        job description
                        {/* <input type="text" required /> */}
                        <textarea id="job_desc" cols="30" required rows="8" value={props.jobdesc} onChange={(e)=>props.setjob_desc(e.target.value)}></textarea>
                    </label>
                    <button type="button" className={`check_remote_button ${props.toggle?"checked":""} `}  id="check_remote" onClick={()=>props.setToggle(!props.toggle)}>
                        remote
                    </button>
                    <button type="button" className="job_form_post_button" onClick={()=>post()}> post</button>
                </form>
            </div>
        </div>
    </>
  ):"";
}
