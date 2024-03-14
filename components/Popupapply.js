"use client";
import "./css/popuppost.css"
import xmark from "./cimages/xmark.svg"
import Image from "next/image";
import { useState } from "react";
import "./css/popapply.css"

export default function Popuppost(props) {

    const apply=()=>{
        props.setTrigger(false)
        props.setpopshow(true)
    }

  return (props.trigger)?(
    <>
        <div className="popup">
            <div className="popupinner w-full sm:w-6/12">
                <button className="close_button" type="button" onClick={()=>props.setTrigger(false)}>
                    <Image src={xmark} width={20} height={20} alt="close"/>
                </button>
                <h1 className="jop_posting_header font-bold text-xl text-center my-4 capitalize">job applaying</h1>
                {props.children}
                <form className="job_posting_form flex capitalize m-4 sm:m-7 p-4 sm:p-7">
                    <label className="job_titel">
                        name
                        <input type="text" required  />
                    </label>
                    <label className="job_desc">
                        email
                        <input type="text" required />
                        {/* <textarea id="job_desc" cols="30" rows="8" ></textarea> */}
                    </label>
                    <label  className="cv"> 
                    resume
                    <input type="file" id="file" required placeholder="cv"/></label>
                    
                    <button type="submit" className="job_form_post_button" onClick={()=>apply()}> apply</button>
                </form>
            </div>
        </div>
    </>
  ):"";
}
