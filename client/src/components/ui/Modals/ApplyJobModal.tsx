"use client";

import { useRouter } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import { authStore, jobDetailStore } from "~/helpers/store";
import { useApplyJobMutation } from "~/helpers/tanstack/mutations/apply";

interface ApplyJobModalProps {
  hasAlreadyApplied: boolean;
}

export default function ApplyJobModal({
  hasAlreadyApplied,
}: ApplyJobModalProps) {
  const router = useRouter();

  const { isAuth } = authStore();
  const { id, title } = jobDetailStore();

  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [isLoading, setIsLoading] = useState<boolean>(false);

  const applyJobMutation = useApplyJobMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleApply = async () => {
    setIsLoading(true);
    await applyJobMutation.mutateAsync(
      {
        jobId: id,
      },
      {
        onError: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success(`Thank you for applying ${title}.`);
          closeModal();
        },
      }
    );
  };

  return (
    <>
      <button
        disabled={hasAlreadyApplied}
        type="button"
        className={clsx(
          hasAlreadyApplied && "opacity-50 cursor-not-allowed",
          "outline-none rounded-lg px-5 py-3 text-sm text-white bg-blue-600 hover:opacity-50"
        )}
        onClick={() => {
          if (isAuth) {
            openModal();
          } else {
            router.push("/login");
          }
        }}
      >
        {hasAlreadyApplied ? "Applied" : "Apply"}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Applying for this job?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      If you apply to this job, you will be forever blah blah
                      blah.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={isLoading}
                      type="button"
                      className={clsx(
                        isLoading && "opacity-50 cursor-not-allowed",
                        "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-50 outline-none"
                      )}
                      onClick={handleApply}
                    >
                      {isLoading ? "Loading..." : "Got it, Confirm!"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
