import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import imageToAdd1 from '../components/ProfilePictures/cloneX.png';


const AboutUsInfo = () => {
  return (
      <div className="flex pt-32 w-full justify-center items-center px-5 lg:px-20 md:px-20 ">
        <div className="flex-column ">
        <div className="flex-column flex-initial justify-between py-0 px-20 text-center">
          <h1 className="text-6xl text-white py-2 font-extrabold">About Us</h1>
        </div>
            <div className="flex flex-initial justify-between py-10 px-20">
            <div className="bg-[#3f413f] w-1/2  h-80 py-2
                    2xl:min-w-[550px]
                    2xl:max-w-[600px]
                    sm:min-w-[270px]
                    sm:max-w-[300px]
                    min-w-full
                    flex-col p-3 rounded-md hover:shadow-2xl"
                    >
                     <div className="flex justify-center items-center" >
                        <img className='object-cover '/></div>
                </div>
                <div className="flex-column w-1/2 text-white">
                    <h1 className="text-5xl text-white py-2 font-extrabold">
                        Who we are?
                    </h1>
                    <div className="text-justify">
                    KEEZ Protocol is a team of six like-minded individuals passionate about revolutionizing DAO governance structures and building on the LUKSO network. We value transparency, inclusivity, and participation within our protocol and believe all DAOs must adopt these values. The KEEZ Protocol will unlock non-token gated DAO governance models that allow contributors from all walks of life to join DAOs and start building and creating!
                    </div>
                    <div className="flex flex-row py-10 ">
                        <button >
                            <h3 className="flex items-center w-44 justify-center text-white font-bold py-2 px-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">KEEZ WEBSITE</h3>
                        </button>
                        <button >
                            <h3 className="flex tems-center w-44 justify-center text-white font-bold py-2 px-2 mx-4 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">KEEZ DISCORD</h3>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-end h-[0.1px] bg-zinc-800 " />
        </div>
      </div>
  );
};

export default AboutUsInfo;