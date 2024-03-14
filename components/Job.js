"use client";
import "./css/job.css"
import Image from "next/image"
import user from "./cimages/usersolid.svg"
import { useState } from "react";

export default function Job(props) {


  return (
    <>
    
    
    <div className="job_card"> 
    <div className="job_card_content p-5">
        <div className="job_icon flex gap-4 items-baseline">
            <Image src={user} width={20} height={20} alt="logo"/>
            <span className="capitalize font-bold">{props.job_owner}</span>
        </div>
        <div className="job_titel my-3 text-xl font-bold capitalize"> {props.job_titel}</div>
        <div className="job_desc my-3">{props.job_desc}</div>
        <button type="button" className="apply_button" onClick={()=>props.name? props.setPop2(true):props.golog()}>Apply</button>
        <p className={`${props.remote?"remote":"hidden"}`}>remote</p>
        </div>
    </div>
    </>
  )
}
