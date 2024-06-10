import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { HiOutlineDownload } from "react-icons/hi";

const LandingPage = () => (
  <div className="flex items-center justify-between mt-20">
    <div>
      <h3 className="text-xl">Hey there, I am</h3>
      <h1 className="text-4xl font-bold leading-relaxed">
        Charles Obimnaetochukwu Egesionu
      </h1>
      <h3 className="text-xl">Full Stack Software Developer</h3>

      <div className="mt-6 flex items-center gap-4 text-4xl">
        <a href="">
          <FaSquareXTwitter />
        </a>

        <a href="">
          <FaLinkedin />
        </a>

        <a href="">
          <FaGithubSquare />
        </a>

        <a href="">
          <TbMailFilled />
        </a>
      </div>

      <button className="flex items-center gap-1 mt-6 bg-gray-700 text-white px-6 py-3 rounded font-bold ">
        Resume
        <HiOutlineDownload className="text-xl animate-bounce" />
      </button>
    </div>

    <div>
      <img
        src="./img/Naeto.jpg"
        alt="Naeto"
        className="w-[400px] h-[400px] rounded-lg"
      />
    </div>
  </div>
);

export default LandingPage;
