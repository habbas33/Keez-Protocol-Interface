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
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd2}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        Sage
      </h1>
      <p className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        <a className="flex flex-center" href="https://twitter.com/improvda">
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
        Hi Im Sage! I am interested in team building, leadership, and
        interpersonal relationships. On top of that, DAOs, Digital Identity
        solutions, and human coordination fascinate me daily. we are complex
        beings in need of simple solutions to optimize our productivity and
        social interactions.
      </h1>
    </div>
  );
};
export const B00steMemberCard = () => {
  return (
    <div
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd3}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        B00ste
      </h1>
      <p className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        <a className="flex flex-center" href="https://twitter.com/b00ste_lyx">
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
        I am passionate about solidty and I deeply enjoy working with passionate
        people. Every problem has a solution.
      </h1>
    </div>
  );
};
export const HabbasMemberCard = () => {
  return (
    <div
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd5}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        Haider
      </h1>
      <p className="flex w-full flex-col justify-center items-center h-50 text-gray-400 text-center font-bold">
        <a className="flex flex-center" href="https://twitter.com/BearSurvivor">
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
        Dr. Abbas is the founder of foligator.io. He has 6 years of R&D
        experience and received PhD in Aerospace Engineering from Korea Advanced
        Institute of Science and Technology (KAIST).
      </h1>
    </div>
  );
};
export const LandonMemberCard = () => {
  return (
    <div
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd1}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        Yellowturtle
      </h1>
      <p className="flex flex-center w-full flex-col justify-center items-center items-align h-50 text-white text-center font-bold">
        <a
          className="flex flex-center"
          href="https://twitter.com/yellowturtle47"
        >
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
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
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd4}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        Fawn
      </h1>
      <p className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        <a className="flex flex-center" href="https://twitter.com/natashalfawn">
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
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
      className="bg-indigo-500 min-h-[385px] my-10 flex flex-1 
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex justify-center items-center">
        <img
          className="object-center max-w-full h-28 rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={imageToAdd6}
        />
      </div>
      <h1 className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        Mumeen
      </h1>
      <p className="flex w-full flex-col justify-center items-center h-50 text-white text-center font-bold">
        <a
          className="flex flex-center"
          href="https://twitter.com/mumeen_official"
        >
          <SiTwitter fontSize={18} color="#fff" />
        </a>
      </p>
      <h1 className="flex w-full flex-col justify-center items-center h-full px-12  text-white text-center">
        hello
      </h1>
    </div>
  );
};
