import os
import argparse
import pickle
import pandas as pd
from tensorflow.keras.models import load_model
from pdf_processing import extract_text_from_pdf  # Ensure this function exists
from requirement_extraction import extract_requirements_from_folder  # Correct function

# ==============================
# 1️⃣ SET FILE PATHS (CORRECTED)
# ==============================
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # Points to `backend/`
OUTPUT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "output"))  # Moves one level up to backend/
  # Correct path to `output/`
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")  # Ensure `uploads/` is correctly referenced

MODEL_PATH = os.path.join(OUTPUT_DIR, "requirement_extraction_model.keras")
TOKENIZER_PATH = os.path.join(OUTPUT_DIR, "tokenizer.pkl")

# ==============================
# 2️⃣ CHECK IF MODEL & TOKENIZER EXIST
# ==============================
if not os.path.exists(MODEL_PATH):
    print(f"❌ Model file NOT found at {MODEL_PATH}!")
    exit(1)

if not os.path.exists(TOKENIZER_PATH):
    print(f"❌ Tokenizer file NOT found at {TOKENIZER_PATH}!")
    exit(1)

# ==============================
# 3️⃣ LOAD MODEL & TOKENIZER
# ==============================
print(f"✅ Loading model from {MODEL_PATH}...")
model = load_model(MODEL_PATH)

print(f"✅ Loading tokenizer from {TOKENIZER_PATH}...")
with open(TOKENIZER_PATH, "rb") as f:
    tokenizer = pickle.load(f)

# ==============================
# 4️⃣ ARGUMENT PARSER (FOR CLI)
# ==============================
parser = argparse.ArgumentParser(description="Process an SRS PDF and extract requirements.")
parser.add_argument("--file", required=True, help="Path to the SRS PDF file.")
args = parser.parse_args()

# ==============================
# 5️⃣ VALIDATE PDF FILE PATH
# ==============================
pdf_path = os.path.abspath(args.file)
if not os.path.exists(pdf_path):
    print(f"❌ PDF file NOT found at {pdf_path}!")
    exit(1)

# ==============================
# 6️⃣ EXTRACT TEXT FROM PDF
# ==============================
print(f"📂 Processing: {pdf_path}")
text = extract_text_from_pdf(pdf_path)

if not text.strip():
    print(f"⚠️ Warning: No text extracted from {pdf_path}")
    exit(1)

# ==============================
# 7️⃣ EXTRACT REQUIREMENTS FROM FOLDER
# ==============================
print("🔍 Extracting requirements from folder...")
extracted_data = extract_requirements_from_folder(os.path.dirname(pdf_path))

if not extracted_data:
    print("⚠️ No requirements found in the document!")
    exit(1)

# ==============================
# 8️⃣ SAVE RESULTS TO CSV
# ==============================
output_csv_path = os.path.join(UPLOADS_DIR, os.path.basename(pdf_path).replace(".pdf", "_requirements.csv"))

df = pd.DataFrame(extracted_data)
df.to_csv(output_csv_path, index=False, encoding="utf-8")

print(f"✅ Extracted {len(df)} requirements. Saved to: {output_csv_path}")
