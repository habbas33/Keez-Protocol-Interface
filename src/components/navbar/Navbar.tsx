import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt4, HiUser } from "react-icons/hi";
import { IoDiamond } from "react-icons/io5";
import { AiOutlineClose, AiOutlineLogin, AiOutlineDown } from "react-icons/ai";
// import { HiUserCircle } from "react-icons/hi";
import {
  GrOrganization,
  GrSettingsOption,
  GrLogout,
  GrUser,
} from "react-icons/gr";
import { ProfileContext } from "../../context/ProfileContext";
import { menuItems } from "../../constants/menuItems";
import NavItems from "./NavItems";
import { NavLink } from "react-router-dom";
import { IPFS_GATEWAY } from "../../constants/globals";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  MenuItem,
  MenuList,
  ClickAwayListener,
  Popper,
  Paper,
  Grow,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { StyledMenuItem } from "../../styles";

const NavbarItem = ({ title }: any, { classProps }: any) => {
  return (
    <li
      className={`flex items-center font-semibold hover:text-[#ac0537] transition duration-300 cursor-pointer ${classProps}`}
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
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const { accountAddress, disconnectWallet, connectWallet, profileData } =
    useContext(ProfileContext);
  let profileImgUrl = profileData?.value?.LSP3Profile?.profileImage[4]?.url;

  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profileData) return;
    const profile = profileData?.value?.LSP3Profile;
    profileImgUrl = IPFS_GATEWAY.concat(profile?.profileImage[4]?.url.slice(7));
    setProfileName(profile?.name);
    setProfileImageUrl(profileImgUrl);
  }, [profileData]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event: any) => {
    setOpen(false);
  };

  const handleDisconnectWallet = (event: any) => {
    handleClose(event);
    navigate("/");
    disconnectWallet();
  };

  const handleViewProfile = (event: any) => {
    handleClose(event);
    navigate("/Profile");
    // disconnectWallet();
  };

  return (
    <nav className="w-full bg-[#1A1A1D] fixed z-10">
      <div className="px-5 lg:px-20 py-5">
        <div className="flex md:justify-between justify-between items-center">
          <NavLink className="hover:text-[#ac0537]" to={`/`}>
            <div className="flex md:flex flex-initial justify-center items-center">
              <IoDiamond fontSize={30} color="#ac0537" />
              <h1 className="text-3xl text-white font-extrabold px-2">KEEZ</h1>
            </div>
          </NavLink>

          <ul className="text-white md:flex list-none hidden justify-between items-center">
            {menuItems.map((menu: any, index: number) => {
              const depthLevel = 0;
              return (
                <NavItems items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          </ul>

          <div className="md:flex flex-initial justify-end items-center ">
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
                  ref={anchorEl}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  className="flex items-center w-44 justify-end text-white font-bold py-1 px-2 border rounded bg-red border-transparent "
                >
                  {profileImgUrl ? (
                    <>
                      <p className="text-base px-2 font-semibold">
                        {profileName}
                      </p>
                      <div className="w-7 h-7 rounded-full border-2 border-light flex justify-center hover:border-[#ac0537] items-center">
                        <img
                          className="object-cover rounded-full "
                          src={profileImageUrl}
                          alt="altimg"
                        />
                      </div>
                    </>
                  ) : (
                    <>
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
                      <Skeleton
                        style={{ backgroundColor: "#4E4E50" }}
                        animation="wave"
                        variant="circle"
                        width={24}
                        height={24}
                      />
                    </>
                  )}
                </button>
              )}
            </ul>
          </div>

          <Popper
            className="z-10"
            open={open}
            anchorEl={anchorEl.current}
            transition
            placement={"bottom-end"}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "right top",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleViewProfile}>
                        <ListItemIcon style={{ minWidth: "0", padding: "0" }}>
                          <GrUser className={"text-[#000000DE] text-lg"} />
                        </ListItemIcon>
                        <ListItemText
                          style={{
                            padding: "0 8px",
                            margin: "0 ",
                            fontFamily: "Open Sans",
                          }}
                          inset
                          primary="View Profile"
                        />
                      </MenuItem>
                      <Divider light />
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon style={{ minWidth: "0", padding: "0" }}>
                          <GrOrganization
                            className={"text-[#000000DE] text-lg"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          style={{
                            padding: "0 8px",
                            margin: "0 ",
                            fontFamily: "Open Sans",
                          }}
                          inset
                          primary="My DAOs"
                        />
                      </MenuItem>
                      <Divider light />
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon style={{ minWidth: "0", padding: "0" }}>
                          <GrSettingsOption
                            className={"text-[#000000DE] text-lg"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          style={{
                            padding: "0 8px",
                            margin: "0 ",
                            fontFamily: "Open Sans",
                          }}
                          inset
                          primary="Settings"
                        />
                      </MenuItem>
                      <Divider light />
                      <MenuItem onClick={handleDisconnectWallet}>
                        <ListItemIcon style={{ minWidth: "0", padding: "0" }}>
                          <GrLogout className={"text-[#000000DE] text-lg"} />
                        </ListItemIcon>
                        <ListItemText
                          style={{
                            padding: "0 8px",
                            margin: "0 ",
                            fontFamily: "Open Sans",
                          }}
                          inset
                          primary="Logout"
                        />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <div className="flex z-50 relative md:hidden">
            {toggleMenu ? (
              <AiOutlineClose
                fontSize={28}
                className="text-white md:hidden z-50 cursor-pointer"
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
                className="z-10 fixed top-0 bg-slate-900 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                  flex flex-col justify-start items-start gap-3 pt-[50px] rounded-md blue-glassmorphism text-white animate-slide-in
                "
              >
                {/* <li className="text-xl w-full my-2">
                  <AiOutlineClose onClick={() => setToggleMenu(false)} />
                </li> */}
                {[
                  { name: "Create", title: "Create" },
                  {
                    title: "Governance",
                    name: "Governance",
                  },
                  {
                    title: "Discover",
                    name: "Discover",
                  },
                  {
                    title: "About Us",
                    name: "AboutUs",
                  },
                  {
                    title: "FAQ",
                    name: "FAQ",
                  },
                ].map((item, index: number) => (
                  <NavItems key={index} items={item} depthLevel={0} />
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
