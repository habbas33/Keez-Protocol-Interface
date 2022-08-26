import {
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  AiFillClockCircle,
  AiFillHeart,
  AiFillHome,
  AiOutlineBars,
} from "react-icons/ai";
import {
  GrLogout,
  GrOrganization,
  GrSettingsOption,
  GrUser,
} from "react-icons/gr";

function MobileSideNav(props: {
  handleComponent: any;
  profileComponent: string;
}) {
  const { handleComponent, profileComponent } = props;
  const [open, setOpen] = useState(false);
  const handleClose = (event: any) => {
    setOpen(false);
  };
  const handleOpen = (event: any) => {
    setOpen(true);
  };
  const anchorEl = React.useRef(null);
  return (
    <div className="flex-column lg:hidden pt-10 justify-start items-start">
      <div onClick={() => setOpen(true)} ref={anchorEl}>
        <AiOutlineBars className="text-white text-3xl font-bold" />
      </div>
      <Popper
        className="z-10 lg:hidden"
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
            <Paper className="bg-black">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className="bg-black">
                  <MenuItem>
                    <div
                      onClick={() => handleComponent("Proposals")}
                      className={`flex justify-start items-center py-2 cursor-pointer ${
                        profileComponent === "Proposals"
                          ? "text-[#6341ff]"
                          : "text-white"
                      } hover:text-[8168ff]`}
                    >
                      <AiFillHome className="w-6" fontSize={20} />
                      <p className=" px-2">Proposals</p>
                    </div>
                  </MenuItem>
                  <Divider light />
                  <MenuItem onClick={handleClose}>
                    <div
                      onClick={() => handleComponent("About")}
                      className={`flex justify-start items-center py-2 cursor-pointer ${
                        profileComponent === "About"
                          ? "text-[#6341ff]"
                          : "text-white"
                      } text-white hover:text-[#8168ff]`}
                    >
                      <AiFillClockCircle className="w-6" fontSize={20} />
                      <p className="px-2">About</p>
                    </div>
                  </MenuItem>
                  <Divider light />
                  <MenuItem onClick={handleClose}>
                    <div
                      onClick={() => handleComponent("Members")}
                      className={`flex justify-start items-center py-2 cursor-pointer ${
                        profileComponent === "Members"
                          ? "text-[#6341ff]"
                          : "text-white"
                      } text-white hover:text-[#8168ff]`}
                    >
                      <AiFillHeart className="w-6" fontSize={20} />
                      <p className=" px-2">Members</p>
                    </div>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MobileSideNav;
