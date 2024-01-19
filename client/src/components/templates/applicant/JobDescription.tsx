"use client";

import { jobDetailStore } from "~/helpers/store";

export default function JobDescription(): JSX.Element {
  const { title, description, company_details } = jobDetailStore();

  return (
    <div className="flex flex-col items-start w-full h-full p-5 gap-y-5 overflow-x-hidden overflow-y-auto">
      {!title ? (
        <></>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between w-full gap-x-5">
            <div className="flex flex-col items-start w-full gap-y-1">
              <h1 className="font-bold text-xl">{title}</h1>
              <h2 className="font-semibold text-sm text-neutral-500">
                {company_details}
              </h2>
            </div>
            <button
              type="button"
              className="rounded-lg px-5 py-3 text-sm text-white bg-blue-600 hover:opacity-50"
            >
              Apply
            </button>
          </div>
          <p className="font-light text-sm text-justify">{description}</p>
          <button
            type="button"
            className="rounded-lg px-5 py-3 text-sm text-white bg-blue-600 hover:opacity-50"
          >
            Apply
          </button>
        </>
      )}
    </div>
  );
}
