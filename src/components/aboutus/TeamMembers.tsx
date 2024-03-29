import imageToAdd1 from "../../assets/profilePictures/cloneX.jpg";
import imageToAdd2 from "../../assets/profilePictures/Sage.jpg";
import imageToAdd3 from "../../assets/profilePictures/B00ste.jpg";
import imageToAdd4 from "../../assets/profilePictures/Fawn.jpg";
import imageToAdd5 from "../../assets/profilePictures/Habbas.jpg";
import imageToAdd6 from "../../assets/profilePictures/WickedCranium.jpg";
import { SiTwitter, SiGithub, SiDiscord } from "react-icons/si";

export const SageMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl "
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd2}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        Sage
      </h1>
      <p className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/improvda">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2  text-white text-center">
        Hi Im Sage! I am interested in team building, leadership, and
        interpersonal relationships. On top of that, DAOs, digital Identity
        solutions, and human coordination fascinate me daily. We are complex
        beings in need of simple solutions to optimize our productivity and
        social interactions.
      </h1>
    </div>
  );
};
export const B00steMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl"
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd3}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        B00ste
      </h1>
      <p className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/b00ste_lyx">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2  text-white text-center">
        I am passionate about solidty and I deeply enjoy working with passionate
        people. Every problem has a solution.
      </h1>
    </div>
  );
};
export const HabbasMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl"
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd5}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        BearSurvivor
      </h1>
      <p className="flex w-full flex-col justify-center items-center text-gray-400 text-center font-bold ">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/BearSurvivor">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2 text-white text-center">
        Founder of foligator.io and PhD in Aerospace Engineering. Passionate about working on interesting Web3 projects. Bringing 6 years of R&D experience to Blockchain.
      </h1>
    </div>
  );
};
export const LandonMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl"
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd1}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        Yellowturtle
      </h1>
      <p className="flex flex-center w-full flex-col justify-center items-center items-align text-white text-center font-bold">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/yellowturtle47">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2  text-white text-center">
        Just a yellow reptile trying to create positive network effect on the
        LUKSO network. Mechanical engineer by day and full-time degen by night.
        Self-taught developer growing his skills in the multiverse with the
        greatest team of all time!!!
      </h1>
    </div>
  );
};
export const FawnMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl"
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd4}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        Fawn
      </h1>
      <p className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/natashalfawn">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2  text-white text-center">
        Fashion-obsessed, RTFKT-maxi from London. Background in building out
        brands and communities for Social Commerce and Creator Economy apps,
        which ultimately led me to discover the wonders of the LUKSOverse!
      </h1>
    </div>
  );
};
export const MumeenMemberCard = () => {
  return (
    <div
      className="bg-[#8168ff] drop-shadow-lg min-h-[450px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-3xl hover:shadow-2xl"
    >
      <div className="flex justify-center items-center p-2 drop-shadow-xl">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd6}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        Mumeen
      </h1>
      <p className="flex w-full flex-col justify-center items-center text-white text-center font-bold">
        <div className="flex justify-center items-center mx-1 h-8 w-8 hover:bg-[#8168ff] rounded-full">
          <a href="https://twitter.com/mumeen_official">
            <SiTwitter fontSize={18} color="#fff" />
          </a>
        </div>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full p-2  text-white text-center">
        I am a passionate self-taught developer hoping to learn more and improve
        on my skills.
      </h1>
    </div>
  );
};
