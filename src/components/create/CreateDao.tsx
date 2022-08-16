import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MultiSelect, FileUploader, Input } from "../../components";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { daoCategoryItems } from "../../constants/daoCategoryItems";
import { VALIDATORS } from "../../constants/globals";

const CreateDao = (props: { handleSubmitCreate: any }) => {
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
    setCategories(selectedOption);
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
    <div className="bg-welcome w-full px-5 md:px-[20%]">
      <h1 className="text-white text-sm py-2">Step 1</h1>
      <h1 className="text-white text-lg font-bold">Create your DAO</h1>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 md:w-[70%] md:mx-auto">
          <label
            className="block text-slate-400 text-sm font-normal"
            htmlFor="daoName"
          >
            DAO Name
          </label>
          <Input
            value={daoName}
            name="dao_name"
            type="text"
            maxLength={50}
            handleChange={(e: any) => setDaoName(e.target.value)}
          />

          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="daoLogo"
          >
            DAO Logo
          </label>
          <FileUploader
            onFileSelectSuccess={(file: any) => setLogoImageFile(file)}
            onFileSelectError={(error: string) =>
              toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT })
            }
          />
          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="categories"
          >
            Categories
          </label>
          <MultiSelect
            handleChange={handleCategoriesChange}
            listItems={daoCategoryItems}
            categories={categories}
            name={"daoCategories"}
          />
          <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Maximum three categories in following order [Primary, Secondary, Tertiary]</p>

          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
            value={description}
            name="description"
            onChange={(e: any) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="flex justify-center rounded-md item-center mt-[12px]
                    border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                    text-base font-medium text-white hover:bg-[#ac0537] 
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
