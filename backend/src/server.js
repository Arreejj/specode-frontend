const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.json());
app.use(express.static("public"));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 Created uploads directory");
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });

// Upload and process route
app.post("/upload", upload.single("file"), (req, res) => {
    console.log("📥 Received a file upload request...");

    if (!req.file) {
        console.error("❌ No file received! Check the frontend and request format.");
        return res.status(400).json({ error: "No file uploaded." });
    }

    console.log(`✅ File uploaded: ${req.file.path}`);

    // Call the Python script for processing
    const pythonProcess = spawn("python", [
        path.resolve(__dirname, "./scripts/test_model.py"), // Ensure this path is correct
        "--file",
        req.file.path,
    ]);

    let outputData = "";
    pythonProcess.stdout.on("data", (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`❌ Python Error: ${data.toString()}`);
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            console.log("✅ Processing complete.");
            res.json({ success: "File processed successfully!", output: outputData });
        } else {
            console.error("❌ Processing failed.");
            res.status(500).json({ error: "Failed to process the file." });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
