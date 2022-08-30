import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

const Wellcome = () => {
  const { connectWallet } = useContext(ProfileContext);
  const navigate = useNavigate();
  return (
    <div className="flex py-10 justify-center items-center px-5 lg:px-20 md:px-20 ">
      <div className="flex-column w-[90%] ">
        <div className="flex flex-col md:flex-row gap-4 flex-initial justify-between py-0">
          <div className="flex-column md:w-1/2 text-white">
            <h1 className="text-4xl py-4 2xl:text-7xl md:text-5xl text-white pt-36 ">
              Create a DAO, propose & vote within the{" "}
              <h1 className="font-bold flex-row inline">LUKSO</h1>{" "}
              <h1 className="flex-column inline">ecosystem</h1>
            </h1>
            <div className="text-justify  text-base py-6">
            KEEZ Protocol, powered by KEEZ DAO, allows individuals to 
            create a DAO using a Universal Profile (UP). Through the 
            smart contract based tools provided by LUKSO, we are able 
            to entirely reinvent how DAOs onboard members, participate
            in governance, and manage their operation. Our mission is to 
            create DAOs built on UPs that are viable as organizations of
            the future.
            </div>
            <div className="flex flex-wrap gap-4 flex-row py-10 ">
              <button onClick={connectWallet}>
                <h3 className="flex items-center w-44 justify-center text-lg text-[#6341ff] font-bold py-2 px-2 rounded-full border-2 border-white bg-white hover:bg-[#8168ff] hover:text-white">
                  CONNECT UP!
                </h3>
              </button>
              <button onClick={() => navigate("/Discover")}>
                <h3 className="flex tems-center w-44 justify-center text-lg text-white font-bold py-2 px-2 border-2 border-white rounded-full bg-transparent hover:bg-[#8168ff]">
                  DISCOVER DAOs
                </h3>
              </button>
            </div>
          </div>

          <div
            className="bg-transparent w-1/2  h-36 py-2
                    2xl:min-w-[550px]
                    2xl:max-w-[600px]
                    sm:min-w-[270px]
                    sm:max-w-[300px]
                    min-w-full
                    flex-col p-3 rounded-md"
          >
            {/* <img src={imageToAdd1}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellcome;
