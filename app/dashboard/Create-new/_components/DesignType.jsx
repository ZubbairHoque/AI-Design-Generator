import Image from "next/image";
import React, { useState } from "react";

function DesignType({selectedDesignType}) {
  const Designs = [
        { 
            name: 'Modern', 
            images: '/modern.jpg' },
        { 
            name: 'Minimalist', 
            images: '/minimalist.jpg' },
        { 
            name: 'Industrial', 
            images: '/industrial.jpg' },
        { 
            name: 'Bohemian', 
            images: '/bohemian.jpg' },
        { 
            name: 'Urban Loft', 
            images: '/urbanloft.jpg' },
        { 
            name: 'Victorian', 
            images: '/victorian.jpg' },
        { 
            name: 'Tropical', 
            images: '/tropical.jpg' },
        { 
            name: 'Gothic', 
            images: '/gothic.jpg' },
        {
            name: 'Moroccan', 
            images: '/moroccan.jpg' },

  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-5">
    <label className="text-slate-400">Select Design Type *</label>
    <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">   
        {Designs.map((design, index) => (
            <div key = {index} onClick={() =>{setSelectedOption(design.name);selectedDesignType(design.name)}} className="flex flex-col items-center">
                <Image alt="" src={design.images} width={100} height={100} 
                className={` h-[80px] rounded-md hover:scale-105 
            transition-all cursor-pointer ${design.name === selectedOption&&'border-2 border-primary rounded-md p-1' }`}/>
        <h2>{design.name}</h2>
            </div>
        ))}
    </div>
  </div>
  );
}

export default DesignType;