import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import {
  MultiSelect,
  FileUploader,
  Input,
  SingleSelect,
} from "../../components";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { daoCategoryItems } from "../../constants/daoCategoryItems";
import { VALIDATORS } from "../../constants/globals";
import { StyledPopover } from "../../styles";
import { MdOutlineHelp }  from "react-icons/md";
import Popover from '@material-ui/core/Popover';

const CreateDao = (props: { handleSubmitCreate: any }) => {
  const classes = StyledPopover();
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen1 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const handlePopoverOpen2 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const handlePopoverOpen3 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl3(event.currentTarget);
  };
  const handlePopoverClose3 = () => {
    setAnchorEl3(null);
  };

  const handlePopoverOpen4 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl4(event.currentTarget);
  };
  const handlePopoverClose4 = () => {
    setAnchorEl4(null);
  };

  const handlePopoverOpen5 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl5(event.currentTarget);
  };

  const handlePopoverClose5 = () => {
    setAnchorEl5(null);
  };
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  
  const { handleSubmitCreate } = props;
  const {
    daoName,
    setDaoName,
    logoImageFile,
    setLogoImageFile,
    categories,
    setCategories,
    description,
    setDescription,
  } = useContext(CreateDaoContext);

  toast.configure();

  const handleCategoriesChange = (selectedOption: any) => {
    setCategories([selectedOption]);
    console.log(selectedOption)
  };

  const formSubmitValidations = () => {
    if (!daoName || daoName.length === 0) {
      return "Please enter a DAO Name";
    }

    if (!logoImageFile || logoImageFile.size === 0) {
      return "Please select a logo for the DAO";
    }

    if (!categories || categories.length === 0) {
      return "Please select atleast one category for the DAO";
    }

    if (!description || description.length === 0) {
      return "Please add description for the DAO";
    }

    return "success";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (VALIDATORS) {
      const validationResult = formSubmitValidations();
      if (validationResult !== "success") {
        return toast.error(validationResult, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    handleSubmitCreate("CreateKeyPermissions");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-other w-full px-5 md:px-[20%]">
      <h1 className="text-white text-3xl py-2">Step 1</h1>
      <div className="flex justify-left  w-full">
      <h1 className="text-white text-4xl font-bold">Create your DAO</h1>
      <p aria-owns={open1 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen1} onMouseLeave={handlePopoverClose1} className="px-1">
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open1}
                  anchorEl={anchorEl1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose1}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                Here you will begin to create a Universal Profile for your DAO,
                add members, assign permissions, create vaults & multisigs, 
                and governance parameters.</div>
              </Popover></div>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 md:w-[70%] md:mx-auto">
        <div className="flex justify-left w-full">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="daoName"
          >
            DAO Name
          </label>
          <p aria-owns={open2 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen2} onMouseLeave={handlePopoverClose2} className="px-1">
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open2}
                  anchorEl={anchorEl2}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose2}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The name of your DAO. This will be the name that is displayed on your profile card/page. 
                  There is currently no way to change it after the creation 
                  process is completed so choose wisely.</div>
              </Popover>
          </div>
          <Input
            value={daoName}
            name="dao_name"
            type="text"
            maxLength={50}
            handleChange={(e: any) => setDaoName(e.target.value)}
          />
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="daoLogo"
          >
            DAO Logo
          </label>
          <p aria-owns={open3 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen3} onMouseLeave={handlePopoverClose3} className="px-1">
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open3}
                  anchorEl={anchorEl3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose3}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  This logo will be displayed on your profile card/page. 
                  This image cannot currently be changed after the creation 
                  process is completed so choose wisely.</div>
              </Popover></div>
          <FileUploader
            onFileSelectSuccess={(file: any) => setLogoImageFile(file)}
            onFileSelectError={(error: string) =>
              toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT })
            }
          />
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="categories"
          >
            Category
          </label>
          <p aria-owns={open4 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen4} onMouseLeave={handlePopoverClose4} className="px-1">
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open4}
                  anchorEl={anchorEl4}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose4}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  These categories will help users find your DAO when searching
                  through the discovery page. Please select the category that
                  best describes your DAO.</div>
              </Popover></div>
          {/* <MultiSelect
            handleChange={handleCategoriesChange}
            listItems={daoCategoryItems}
            categories={categories}
            name={"daoCategories"}
          /> */}
          <SingleSelect
            handleChange={handleCategoriesChange}
            listItems={daoCategoryItems}
            name={"daoCategories"}
          />
          <p
            className="text-sm text-white dark:text-white"
            id="file_input_help"
          >
            {/* Maximum three categories in following order [Primary, Secondary,
            Tertiary] */}
          </p>
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="description"
          >
            Description
          </label>
          <p aria-owns={open5 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen5} onMouseLeave={handlePopoverClose5} className="px-1">
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open5}
                  anchorEl={anchorEl5}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose1}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  This description will be displayed on your profile card/page
                  and can be edited anytime. There is a 500-word limit.</div>
              </Popover></div>
          <textarea
            className="my-1 h-28 w-full rounded-lg p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
            value={description}
            name="description"
            onChange={(e: any) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="flex justify-center rounded-full item-center mt-[12px]
                    border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                    text-base font-medium text-white hover:bg-[#6341ff]
                    sm:w-auto sm:text-sm"
          >
            Next
            <MdNavigateNext
              className="pl-[2px] w-6"
              color="#fff"
              fontSize={20}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDao;

// await fetch(IPFS_INFURA_URL.concat(resultDaoUpMetadata.path)).then(response => response.json()).then(data => {
//     const imageURL = data.daoProfile.profileImage.url.concat(data.daoProfile.profileImage.hash);
//     console.log(imageURL);
// });
