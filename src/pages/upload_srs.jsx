import React, { useState } from "react";
import uploadIcon from "../assets/images/upload.png";
import { useNavigate } from "react-router-dom";

const UploadSrs = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // ✅ Prevent multiple uploads

  // ✅ Restrict file types to PDF or TXT
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    const allowedTypes = ["application/pdf", "text/plain"];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("❌ Invalid file type. Only PDF and TXT allowed.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadStatus(""); // Clear any previous error messages
  };

  // ✅ Handle File Upload
  const handleUpload = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setUploadStatus("❌ Please select a file first.");
      return;
    }

    if (isUploaded) {
      setUploadStatus("⚠️ You have already uploaded a file.");
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
        headers: { "Accept": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      
      if (response.ok) {
        setUploadStatus(`✅ Success: ${result.success}`);
        setIsUploaded(true); // ✅ Prevents multiple uploads
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
          Upload your SRS file (PDF or TXT)
        </h2>

        <form 
          className="border-2 border-dashed border-blue-500 p-6 rounded-lg text-center cursor-pointer"
          onSubmit={handleUpload}
        >
          {/* File Input */}
          <input 
            type="file" 
            name="file" 
            hidden 
            id="fileInput" 
            accept=".pdf,.txt" // ✅ Restrict file selection
            onChange={handleFileChange} 
            disabled={isUploaded} // ✅ Disable if file already uploaded
          />
          
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="mb-4">
              <img src={uploadIcon} alt="Upload Icon" className="w-20 h-20 mx-auto" />
            </div>
            <p className="text-blue-500 font-medium">
              {selectedFile ? `📄 ${selectedFile.name}` : "Browse File to upload"}
            </p>
          </label>

          <button 
            type="submit" 
            className={`mt-4 px-4 py-2 text-white rounded-lg transition ${
              isUploaded ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isUploading || isUploaded} // ✅ Prevent multiple uploads
          >
            {isUploading ? "Uploading..." : isUploaded ? "Uploaded ✅" : "Upload"}
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
