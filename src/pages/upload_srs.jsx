import React, { useState } from "react";
import uploadIcon from "../assets/images/upload.png";
import { useNavigate } from "react-router-dom";

const UploadSrs = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setUploadStatus("❌ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);
    setUploadStatus("⏳ Uploading...");

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      
      if (response.ok) {
        setUploadStatus(`✅ Success: ${result.success}`);
      } else {
        setUploadStatus(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus("❌ Failed to upload. Check server connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
          Upload your SRS file
        </h2>
        <form 
          className="border-2 border-dashed border-blue-500 p-6 rounded-lg text-center cursor-pointer"
          onSubmit={handleUpload}
        >
          <input type="file" name="file" hidden id="fileInput" onChange={handleFileChange} />
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="mb-4">
              <img src={uploadIcon} alt="Upload Icon" className="w-20 h-20 mx-auto" />
            </div>
            <p className="text-blue-500 font-medium">Browse File to upload</p>
          </label>
          <button 
            type="submit" 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        
        {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
      </div>

      <button
        onClick={() => navigate("/upload-code")}
        className="mt-6 px-6 py-2 bg-white text-blue-500 font-medium border border-blue-500 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200"
      >
        Click here to add Source Code
      </button>
    </div>
  );
};

export default UploadSrs;
