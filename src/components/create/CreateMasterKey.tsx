import React, { useContext, useState, useEffect } from "react";
import { ConnectProfileModal } from "../../modals/";
import { ProfileContext } from "../../context/ProfileContext";
import { MdNavigateNext } from "react-icons/md";
import { MultiSelect } from "../../components";
import { FileUploader } from "../../components";
import { Input } from "../../components";
import { toast } from "react-toastify";

const CreateMasterKey = (props: { handleSubmitCreate: any }) => {
  const { handleSubmitCreate } = props;
  const [keyTitle, setKeyTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([
    { value: "DAO", label: "DAO" },
    { value: "Social", label: "Social" },
  ]);

  const handleCategoriesChange = (selectedOption: any) => {
    setCategories(selectedOption);
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("Create masterkey", {
      keyTitle: keyTitle,
      categories: categories,
      description: description,
    });
    // handleSubmitCreate("CreateMasterKey");
  }

  return (
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
      <h1 className="text-white text-sm py-2">Step 2</h1>
      <h1 className="text-white text-lg font-bold">Create Master Key</h1>
      <form onSubmit={handleSubmit}>
        <div className=" py-4">
          <label
            className="block text-slate-200 text-sm font-medium"
            htmlFor="keyTitle"
          >
            Key Title
          </label>
          <Input
            placeholder=""
            name="key_title"
            type="text"
            handleChange={(e: any) => setKeyTitle(e.target.value)}
          />

          <label
            className="block pt-4 text-slate-200 text-sm font-medium"
            htmlFor="categories"
          >
            Categories
          </label>
          {/* <MultiSelect handleCategoriesChange={handleCategoriesChange}/> */}

          <label
            className="block pt-4 text-slate-200 text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
            placeholder=""
            name="description"
            onChange={(e: any) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="flex justify-center rounded-md item-center
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

export default CreateMasterKey;
