import React, { useContext, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { SiEthereum } from "react-icons/si";
import { IoDiamond } from "react-icons/io5";
import {
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineDown,
} from "react-icons/ai";
import { ProfileContext } from "../../context/ProfileContext";
import { menuItems } from "../../constants/menuItems";
import NavItems from "./NavItems";
import { NavLink } from "react-router-dom";
import { IPFS_GATEWAY } from "../../constants/globals";
import Skeleton from "@material-ui/lab/Skeleton";

const NavbarItem = ({ title }: any, { classProps }: any) => {
  return (
    <li
      className={`flex items-center mx-10 font-semibold hover:text-[#ac0537] transition duration-300 cursor-pointer ${classProps}`}
    >
      {title}
      {title == "Get Started" && (
        <div className="pl-2">
          <AiOutlineDown fontSize={12} />
          {/* <div className="flex absolute translate-y-6">
            <a href="#">Create</a>
            <a href="#">Propose</a>
            <a href="#">Vote</a>
          </div> */}
        </div>
      )}
    </li>
  );
};

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);
  const [profileName, setProfileName] = React.useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = React.useState<string>("");
  const { accountAddress, disconnectWallet, connectWallet, profileData } =
    useContext(ProfileContext);
  let profileImgUrl = profileData?.value?.LSP3Profile?.profileImage[4]?.url;

  useEffect(() => {
    if (!profileData) return;
    const profile = profileData?.value?.LSP3Profile;
    profileImgUrl = IPFS_GATEWAY.concat(profile?.profileImage[4]?.url.slice(7));
    setProfileName(profile?.name);
    setProfileImageUrl(profileImgUrl);
  }, [profileData]);

  return (
    <nav className="w-full bg-[#1A1A1D] fixed ">
      <div className="px-5 lg:px-20 md:px-20 py-5">
        <div className="flex md:justify-between justify-between items-center">
          <NavLink className="hover:text-[#ac0537]" to={`/`}>
            <div className="flex md:flex flex-initial justify-center items-center">
              <IoDiamond fontSize={30} color="#ac0537" />
              <h1 className="text-3xl text-white font-extrabold px-2">KEEZ</h1>
            </div>
          </NavLink>

          <ul className="text-white md:flex list-none hidden flex-column justify-between items-center flex-initial">
            {menuItems.map((menu: any, index: number) => {
              const depthLevel = 0;
              return (
                <NavItems items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          </ul>

          <div className="md:flex flex-initial justify-end items-center">
            <ul className="text-white md:flex hidden list-none flex-row justify-center items-center flex-initial">
              {!accountAddress ? (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="flex flex-row items-center w-44 justify-center text-white font-bold py-2 px-2 rounded bg-[#C3073F] hover:bg-[#ac0537]"
                >
                  <AiOutlineLogin className="text-white mr-2" />
                  <p className="text-white text-base font-semibold">
                    Connect Profile
                  </p>
                </button>
              ) : (
                <button
                  type="button"
                  // onClick={ ()=>{console.log("open profile menu")} }
                  onClick={disconnectWallet}
                  className="flex items-center w-44 justify-center text-white font-bold py-1 px-2 border rounded bg-red border-[#4E4E50] hover:border-[#ac0537]"
                >
                  {profileImgUrl ? (
                    <>
                      <div className="w-7 h-7 rounded-full border-2 border-light flex justify-center items-center">
                        <img
                          className="object-cover rounded-full "
                          src={profileImageUrl}
                        />
                      </div>
                      <p className="text-base px-2 font-semibold">
                        {profileName}
                      </p>
                    </>
                  ) : (
                    <>
                      <Skeleton
                        style={{ backgroundColor: "#4E4E50" }}
                        animation="wave"
                        variant="circle"
                        width={24}
                        height={24}
                      />
                      <Skeleton
                        style={{
                          backgroundColor: "#4E4E50",
                          borderRadius: "25px",
                          marginLeft: "4px",
                        }}
                        animation="wave"
                        className="px-2"
                        variant="rect"
                        width={110}
                        height={24}
                      />
                    </>
                  )}
                </button>
              )}
            </ul>
          </div>

          <div className="flex relative md:hidden">
            {toggleMenu ? (
              <AiOutlineClose
                fontSize={28}
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <HiMenuAlt4
                fontSize={28}
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu(true)}
              />
            )}

            {toggleMenu && (
              <ul
                className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                  flex flex-col justigy-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
                "
              >
                <li className="text-xl w-full my-2">
                  <AiOutlineClose onClick={() => setToggleMenu(false)} />
                </li>
                {[].map((item, index) => (
                  <NavbarItem
                    key={item + index}
                    title={item}
                    classProps="my-2 text-lg"
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="sm:w-[100%] w-full h-[0.1px] bg-zinc-800 " />
    </nav>
  );
}
