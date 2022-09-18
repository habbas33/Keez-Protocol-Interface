import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Input, SingleSelect } from "../../components";
import { FileUploader } from "../create";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { daoCategoryItems } from "../../constants/daoCategoryItems";
import { VALIDATORS } from "../../constants/globals";
import { StyledPopover } from "../../styles";
import InfoPopOver from "../InfoPopOver";

const CreateDao = (props: { handleSubmitCreate: any }) => {
  const classes = StyledPopover();

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
    console.log(selectedOption);
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
        <InfoPopOver info="Here you will begin to create a Universal Profile for your DAO, add members, assign permissions, create vaults & multisigs, and governance parameters." />
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 md:w-[70%] md:mx-auto">
          <div className="flex justify-left w-full">
            <label
              className="block text-white text-sm font-normal"
              htmlFor="daoName"
            >
              DAO Name
            </label>
            <InfoPopOver
              info="The name displayed on the DAO profile card/page. Currently, it
                can not be changed after the creation process."
            />
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
            <InfoPopOver
              info="This logo will be displayed on the DAO profile card/page.
                Currently, it can not be changed after the creation process."
            />
          </div>
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
            <InfoPopOver
              info="These categories will help users find the DAO when searching
                through the discovery page. Please select the category that best
                describes the DAO."
            />
          </div>
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
            <InfoPopOver
              info="This description will be displayed on the DAO profile card/page
                and can be edited anytime. There is a 200-word limit."
            />
          </div>
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
