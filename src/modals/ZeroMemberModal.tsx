import React, { Fragment, useRef, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ZeroMemberModal() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (!open) {
      navigate("/Discover");
    }
  }, [open, navigate]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block text-white align-bottom bg-[#2B2C50] rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
            >
              <div className="bg-inherent">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center  sm:mt-0 sm:ml-0 sm:text-left">
                    <div className="px-6 py-5 bg-[#2B2C50] flex justify-between items-center">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-medium text-white"
                      >
                        No DAO Membership
                      </Dialog.Title>
                      <AiOutlineClose
                        fontSize={24}
                        className="text-white hover:bg-[#382C71] p-[2px] rounded-full cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <div className="py-4 px-6 font-light bg-[#382C71]">
                      <p className="text-base text-white-500">
                        In order to propose or vote you must be a member of a
                        DAO or create a new DAO for your team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-[#382C71] px-2 pb-4 sm:flex justify-center">
                <button
                  type="button"
                  className="justify-center rounded-md item-center
                   border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                    text-base font-medium text-white hover:border-white hover:bg-[#8168ff] 
                     sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => navigate("/Discover")}
                >
                  Discover DAOs
                </button>
                <button
                  type="button"
                  className="justify-center rounded-md item-center
                   border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                    text-base font-medium text-white hover:border-white hover:bg-[#8168ff] 
                     sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => navigate("/Create")}
                >
                  Create DAOs
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
