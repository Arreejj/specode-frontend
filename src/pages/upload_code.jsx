import React from "react";
import uploadIcon from "../assets/images/code.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const UploadSourceCode = () => {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
          Upload your source code
        </h2>
        <form className="border-2 border-dashed border-blue-500 p-6 rounded-lg text-center cursor-pointer">
          <input type="file" name="file" hidden />
          <div className="mb-4">
            <img src={uploadIcon} alt="Upload Icon" className="w-20 h-20 mx-auto" />
          </div>
          <p className="text-blue-500 font-medium">Browse File to upload</p>
        </form>
        <section className="loading-area mt-4">
          <ul className="space-y-4">
            <li className="row flex items-center bg-blue-100 p-4 rounded-lg">
              <i className="fas fa-file-alt text-blue-500 text-2xl mr-4"></i>
              <div className="content flex-1">
                <div className="details flex justify-between items-center mb-2">
                  <span className="name font-medium text-gray-700">source_code.zip</span>
                  <span className="size text-sm text-gray-500">1.2 MB</span>
                </div>
              </div>
              <i className="fas fa-check text-green-500 text-xl ml-4"></i>
            </li>
          </ul>
        </section>
      </div>
      <button
        onClick={() => navigate("/upload-srs")}
        className="mt-6 px-6 py-2 bg-white text-blue-500 font-medium border border-blue-500 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200"
      >
        Click here for compatibility Report
      </button>
    </div>
  );
};

export default UploadSourceCode;
