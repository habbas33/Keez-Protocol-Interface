import Popover from "@material-ui/core/Popover";
import { useState } from "react";
import { MdOutlineHelp } from "react-icons/md";
import { StyledPopover } from "../styles";

function InfoPopOver({ info }: { info: string }) {
  const classes = StyledPopover();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <p
        className="px-1"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <MdOutlineHelp className="text-white text-md" />
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
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
          {info}
        </div>
      </Popover>
    </div>
  );
}

export default InfoPopOver;
