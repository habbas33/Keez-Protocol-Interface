import imageToAdd1 from "../../assets/Logos/KP_Submark_White.png";


const AboutUsInfo = () => {
  return (
    <div className="flex py-10 w-full justify-center items-center">
      <div className="flex-column space-y-[0px] flex-wrap">
        <div className="flex-column flex-initial justify-between  text-center">
          <div className="flex justify-center  w-full">
            <h1 className="text-5xl textShadow text-white pb-20">About Us</h1>
          </div>
        </div>
        <div className="flex gap-10 flex-initial items-center flex-wrap justify-between">
          <div
            className="bg-transparent md:flex-1 h-auto object-top
                    2xl:max-w-[400px]
                    lg:max-w-[300px]
                    max-w-[200px]
                    flex-col p-3 rounded-md"
          >
            <div className="flex justify-left items-center">
              <img
                className="object-top justify-center mx-auto"
                src={imageToAdd1}
              />
            </div>
          </div>
          <div className="flex-column w-[100%] md:flex-1 text-white">
            <h1 className="2xl:text-5xl text-3xl text-white py-2">
              Who we are?
            </h1>
            <div className="text-justify text-base">
            The KEEZ Protocol team is a group of six hard working and like 
            minded individuals from the KEEZ DAO community. We value 
            transparency, inclusivity, and participation within our 
            protocol and believe all DAOs should as well. Through the 
            protocol we will unlock new opportunities for DAOs regarding 
            treasury disbursement, member onboarding, and governance 
            structures.
            </div>
            <div className="flex flex-wrap gap-3 flex-row py-10 ">
              <button>
                <h3 className="flex items-center w-44 justify-center text-white font-bold py-2 px-2 border-2 hover:bg-[#8168ff] border-white rounded-full bg-transparent">
                <a href="https://twitter.com/keezDAO">KEEZ TWITTER</a> 
                </h3>
              </button>
              <button>
                <h3 className="flex tems-center w-44 justify-center border-2 border-white text-[#8168ff] hover:bg-[#8168ff] hover:text-white font-bold py-2 px-2 rounded-full bg-white">
                <a href="https://discord.gg/nJjJy6BZ">KEEZ DISCORD</a>
                </h3>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full items-end h-[0.1px] bg-zinc-800 " /> */}
      </div>
    </div>
  );
};

export default AboutUsInfo;
