import { useState } from "react";
import clipboardCopy from "clipboard-copy";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textBlocks, setTextBlocks] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("pptxFile", file);

      try {
        const response = await fetch(
          "https://pptx-to-text-server0.vercel.app/api/upload/convert-pptx-to-text",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTextBlocks(data.pptxTextBlocks);
        } else {
          console.error("Error converting PPTX to text");
          toast.error("Error converting PPTX to text");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("please provide an file");
    }
  };

  const handleCopyToClipboard = (text) => {
    clipboardCopy(text);
    toast.success("copied!");
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div>
        <Toaster />
      </div>
      <div className="mb-6">
        <label className="block text-xl mb-2">Select a PPTX File:</label>
        <input
          type="file"
          accept=".pptx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full md:w-auto ${
          isLoading
            ? "bg-gray-300 text-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } px-4 py-2 rounded-md mt-2 md:mt-0 focus:outline-none ${
          isLoading ? "ring-gray-400 ring-2" : "ring focus:ring-blue-300"
        }`}
      >
        {isLoading ? (
          <div>
            <Loader /> Loading
          </div>
        ) : (
          "Convert"
        )}
      </button>
      {isLoading ? (
        ""
      ) : (
        <div className="text-sm md:text-base lg:text-lg xl:text-xl mt-8">
          {textBlocks.map((block, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Slide {index + 1}</span>
                <button
                  onClick={() => handleCopyToClipboard(block)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                >
                  Copy
                </button>
              </div>
              <div className="text-gray-800">{block}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
