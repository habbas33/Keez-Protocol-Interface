import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Popover from "@material-ui/core/Popover";
// import { Popover } from '@headlessui/react'
import { MdOutlineHelp } from "react-icons/md";
import imageToAdd1 from "../../assets/Logos/KP Submark White.png";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

const AboutUsInfo = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="flex pt-10 w-full justify-center items-center py-0 px-5 lg:px-20 md:px-20 ">
      <div className="flex-column space-y-[0px] py-0 flex-wrap">
        <div className="flex-column flex-initial justify-between  py-0 px-20 text-center">
          <div className="flex justify-center  w-full">
            <h1 className="md:text-6xl text-4xl text-white py-0">About Us</h1>

            {/* <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-[#000000DE] text-lg"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  i used popover
              </Popover> */}
          </div>
        </div>
        <div className="flex gap-3 flex-initial items-center flex-wrap justify-between py-0">
          <div
            className="bg-transparent md:flex-1 py-0 h-auto object-top
                    2xl:min-w-[550px]
                    2xl:max-w-[600px]
                    w-[100%]
                    flex-col p-3 rounded-md"
          >
            <div className="flex justify-center items-center">
              <img
                className=" object-top justify-center mx-auto"
                src={imageToAdd1}
              />
            </div>
          </div>
          <div className="flex-column w-[100%] md:flex-1 text-white">
            <h1 className="md:text-5xl text-3xl text-white py-2">
              Who we are?
            </h1>
            <div className="text-justify text-base">
              KEEZ Protocol is a team of six like-minded individuals passionate
              about revolutionizing DAO governance structures and building on
              the LUKSO network. We value transparency, inclusivity, and
              participation within our protocol and believe all DAOs must adopt
              these values. The KEEZ Protocol will unlock non-token gated DAO
              governance models that allow contributors from all walks of life
              to join DAOs and start building and creating!
            </div>
            <div className="flex flex-wrap gap-3 flex-row py-10 ">
              <button>
                <h3 className="flex items-center w-44 justify-center text-white font-bold py-2 px-2 border-2 hover:bg-[#8168ff] border-white rounded-full bg-transparent">
                  KEEZ TWITTER
                </h3>
              </button>
              <button>
                <h3 className="flex tems-center w-44 justify-center border-2 border-white text-[#8168ff] hover:bg-[#8168ff] hover:text-white font-bold py-2 px-2 rounded-full bg-white">
                  KEEZ DISCORD
                </h3>
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
