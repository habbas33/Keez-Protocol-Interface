import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { toast } from "react-toastify";

const Welcome = () => {
  const { accountAddress, connectWallet } = useContext(ProfileContext);
  return (
    <div className="flex pt-32 justify-center items-center px-5 lg:px-20 md:px-20 ">
      <div className="flex-column w-[90%]">
        <div className="flex flex-col md:flex-row gap-4 flex-initial justify-between py-0">
          <div className="flex-column md:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl text-white py-2 font-extrabold">
              Create, propose & vote within the LUKSO ecosystem
            </h1>
            <div className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec elit vehicula, rutrum elit a, luctus nunc. Nullam pharetra ut
              est vitae consectetur. Integer molestie tincidunt mollis. Sed
              vitae ipsum nec diam venenatis vestibulum.
            </div>
            <div className="flex flex-wrap gap-4 flex-row py-10 ">
              <button onClick={connectWallet}>
                <h3 className="flex items-center w-44 justify-center text-white font-bold py-2 px-2 rounded bg-[#C3073F] hover:bg-[#ac0537]">
                  CONNECT UP!
                </h3>
              </button>
              <button onClick={() => console.log("DISCOVER DAOS")}>
                <h3 className="flex tems-center w-44 justify-center text-white font-bold py-2 px-2 rounded bg-[#C3073F] hover:bg-[#ac0537]">
                  DISCOVER DAOs
                </h3>
              </button>
            </div>
          </div>

          <div
            className="bg-[#3f413f] w-1/2  h-80 py-2
                    2xl:min-w-[550px]
                    2xl:max-w-[600px]
                    sm:min-w-[270px]
                    sm:max-w-[300px]
                    min-w-full
                    flex-col p-3 rounded-md hover:shadow-2xl"
          ></div>
        </div>
        <div className="flex w-full items-end h-[0.1px] bg-zinc-800 " />
      </div>
    </div>
  );
};

export default Welcome;
