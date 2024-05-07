'use client'
import { FormEvent, useState } from "react";
import { createUrl } from "./functions/actions";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState("Copy");

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  }

  const handleInput = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let days: number;
    if(isChecked || parseInt(formData.get('days') as string) === 0) days = 30;
    else days = parseInt(formData.get('days') as string);

    const res = await createUrl(formData.get('input') as string, days);
    setShortenedUrl(res);

  }
  return (
    <div className="min-h-screen bg-gray-950 text-white grid grid-rows-2">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-medium mb-8 text-center">shorten url</h1>
        <form onSubmit={handleInput} className="max-w-md mx-auto">
          <div className="mb-3">
            <label htmlFor="url" className="block mb-2 font-medium text-sm">
              URL:
            </label>
            <input
              type="text"
              id="url"
              name="input"
              placeholder="enter url to shorten"
              required
              className="text-gray-950 w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="days" className="block mb-2 text-sm font-medium">
              Expiration (in days):
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="days"
                name="days"
                placeholder="or click 'no expiration' "
                className=" text-gray-950 w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isChecked}
                required
              />
              <label className="pl-4 flex items-center flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckbox}
                  className="mr-2 border"
                />
                No expiration
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Shorten
          </button>
        </form>
        {shortenedUrl && (
          <div className="mt-8 max-w-md mx-auto">
            <label htmlFor="shortenedUrl" className="block mb-2 text-sm font-medium">
              Shortened URL:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="shortenedUrl"
                value={shortenedUrl}
                readOnly
                className=" text-slate-950 w-full px-4 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {navigator.clipboard.writeText(shortenedUrl); setCopied("Copied")}}
                className="ml-4 px-4 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {copied}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" mx-auto container flex justify-center self-end">
        <div className="w-full max-w-md pb-5">
            <p className="text-center">emmanuel paz © 2024</p>
        </div>
      </div>
    </div>
  );
}
