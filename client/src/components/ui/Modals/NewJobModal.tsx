"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import clsx from "clsx";

import { createJobValidation } from "~/helpers/hooks/useValidations";
import { useCreateJobMutation } from "~/helpers/tanstack/mutations/jobs";

export default function NewJobModal() {
  let [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [createJobFormErrors, setCreateJobFormErrors] = useState<any>(null);

  const [title, setTitle] = useState<string>("");
  const [companyDetails, setCompanyDetails] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createJobMutation = useCreateJobMutation();

  const closeModal = () => {
    setIsOpen(false);
    setDefault();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const setDefault = () => {
    setIsLoading(false);
    setError("");
    setCreateJobFormErrors([]);
    setTitle("");
    setCompanyDetails("");
    setDescription("");
  };

  const handleCreateJob = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createJobValidation.validate(
        { title, company_details: companyDetails, description },
        { abortEarly: false }
      );
      setIsLoading(true);
      await createJobMutation.mutateAsync(
        {
          title,
          company_details: companyDetails,
          description,
        },
        {
          onSuccess: () => {
            closeModal();
          },
          onError: (error) => {
            setIsLoading(false);
            setError(error?.response?.data?.message);
          },
        }
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setCreateJobFormErrors(errors);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="outline-none rounded-lg px-5 py-3 text-sm text-white bg-blue-600 hover:opacity-50"
        onClick={openModal}
      >
        New
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create New Job
                  </Dialog.Title>
                  <form
                    onSubmit={handleCreateJob}
                    className="flex flex-col items-start w-full mt-5 gap-y-3"
                  >
                    <div className="flex flex-col items-start w-full gap-y-1">
                      <label htmlFor="title" className="ml-1 text-sm">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="w-full p-3 rounded-lg outline-none border bg-white"
                        value={title}
                        onChange={(e) => {
                          setError("");
                          setCreateJobFormErrors([]);
                          setTitle(e.currentTarget.value);
                        }}
                      />
                      {createJobFormErrors && createJobFormErrors.title && (
                        <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                          {createJobFormErrors.title}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-start w-full gap-y-1">
                      <label htmlFor="company_details" className="ml-1 text-sm">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_details"
                        id="company_details"
                        className="w-full p-3 rounded-lg outline-none border bg-white"
                        value={companyDetails}
                        onChange={(e) => {
                          setError("");
                          setCreateJobFormErrors([]);
                          setCompanyDetails(e.currentTarget.value);
                        }}
                      />
                      {createJobFormErrors &&
                        createJobFormErrors.company_details && (
                          <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                            {createJobFormErrors.company_details}
                          </span>
                        )}
                    </div>
                    <div className="flex flex-col items-start w-full gap-y-1">
                      <label htmlFor="description" className="ml-1 text-sm">
                        Job Description
                      </label>
                      <textarea
                        id="description"
                        className="w-full p-3 rounded-lg outline-none border bg-white"
                        value={description}
                        onChange={(e) => {
                          setError("");
                          setCreateJobFormErrors([]);
                          setDescription(e.currentTarget.value);
                        }}
                      />
                      {createJobFormErrors &&
                        createJobFormErrors.description && (
                          <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                            {createJobFormErrors.description}
                          </span>
                        )}
                    </div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={clsx(
                        isLoading && "opacity-50 cursor-wait",
                        "w-full p-3 rounded-lg outline-none border border-blue-300 text-white bg-blue-500 hover:opacity-50"
                      )}
                    >
                      {isLoading ? "Loading..." : "Create"}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
