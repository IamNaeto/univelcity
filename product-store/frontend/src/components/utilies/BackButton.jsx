import React from "react";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const BackButton = ({route}) => {
    return ( 
        <Link to={route} className="max-w-[100px] flex items-center gap-2  text-white hover:text-gray-400 transition-all delay-150">
           <TiArrowBack className="text-4xl"/> Back
        </Link>
     );
}
 
export default BackButton;