"use client";

import { Poppins } from "next/font/google"
import { ChangeEvent, useState } from "react";

const poppins = Poppins({ subsets: ['latin'], weight: '500' })
export default function Home() {
  const [originalUrl, setOriginalUrl] = useState<string | number | readonly string[] | undefined>("");
  const [shortened, setShortened] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  }

  const shortenURL = async (): Promise<void> => {
    if (originalUrl == "") {
      alert("Please enter a URL");
    } else {
      try {
        const response = await fetch('http://localhost:8080/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ originalUrl }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setShortened(true);
        setShortUrl(data.shortUrl);
        // Handle the response data as needed
      } catch (error: any) {
        console.error('Error during POST request:', error.message);
        // Handle errors
      }
    }
  }

  return (
    <div className={poppins.className + " flex flex-col justify-center items-center w-full gap-8 bg-gray-50"}>
      <div className="flex justify-center items-center w-full py-8">
        <h1 className="text-center text-blue-500 text-5xl font-bold">URL Shortener</h1>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center bg-white border p-4 w-2/3 rounded-lg gap-8">
          <h2 className="text-left text-gray-700 text-3xl font-bold">Paste the URL to be shortened</h2>
          {!shortened
            ? <div className="flex justify-center items-center w-full">
              <input
                type="text"
                className="text-black bg-white rounded-l-md p-4 border border-gray-400 min-w-[420px]"
                name="originalUrl"
                value={originalUrl}
                onChange={handleChange}
                placeholder="Enter you URL here"
              />
              <button onClick={shortenURL} className="text-white bg-blue-500 p-4 rounded-r-md border border-blue-500">Shorten URL</button>
            </div>
            : <div className="flex justify-center items-center">
              <div className="flex flex-col justify-start items-center w-full gap-6">
                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <h3 className="text-left text-gray-700 text-xl font-semibold">Your Long URL</h3>
                  <input
                    type="text"
                    className="text-black bg-white rounded-md p-4 border border-gray-400 min-w-[420px]"
                    readOnly
                    value={originalUrl}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full gap-2">
                  <h3 className="text-left text-blue-500 text-2xl font-bold">Your shortened URL</h3>
                  <input
                    type="text"
                    className="text-black bg-white rounded-md p-4 border border-gray-400 min-w-[420px]"
                    readOnly
                    value={shortUrl}
                  />
                </div>
                <button
                  onClick={() => {
                    setShortUrl("");
                    setOriginalUrl("");
                    setShortened(false);
                  }}
                  className="text-white bg-blue-500 p-4 rounded-md border border-blue-500"
                >
                  Shorten Another
                </button>
              </div>
            </div>
          }
          <p className="text-center max-w-xl">URL Shortener is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share</p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center bg-white border p-4 w-2/3 rounded-lg gap-8">
          <h3 className="text-left text-gray-700 text-2xl font-bold">Want More? Try Premium Features!</h3>
          <p className="text-center max-w-xl">Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes, browser extension, app integrations and support</p>
          <button className="text-white bg-blue-500 p-4 rounded-md">Create an account</button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full mb-24">
        <div className="flex flex-col justify-center items-start w-2/3 gap-4">
          <h2 className="ml-4 text-2xl text-left text-gray-700 font-bold">Shorten, share and track</h2>
          <p className="ml-8 text-left">Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Track statistics for your business and projects by monitoring the number of hits from your URL with our click counter.</p>
        </div>
      </div>

      <div className="bottom-0 flex flex-col justify-center items-center w-full bg-gray-700 py-4">
        <h3 className="text-center text-md font-medium text-white">© 2023 URL Shortener - Tool to shorten a long link</h3>

      </div>
    </div>
  )
}
