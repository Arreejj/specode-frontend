import os
import logging
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Bidirectional, Embedding, SpatialDropout1D
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import matplotlib.pyplot as plt
import joblib  # For saving/loading tokenizer

# Setup logging
logging.basicConfig(
    filename="train_model_main.log",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Define paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CSV_PATH = os.path.join(BASE_DIR, "data", "extracted_requirements.csv")
MODEL_PATH = os.path.join(BASE_DIR, "output", "requirement_extraction_model.keras")
TOKENIZER_PATH = os.path.join(BASE_DIR, "output", "tokenizer.pkl")

# Ensure output directory exists
os.makedirs(os.path.join(BASE_DIR, "output"), exist_ok=True)

def train_model():
    """Train a BiLSTM model for requirement classification."""
    logging.info("🚀 Starting model training process.")

    # Check if CSV exists
    if not os.path.exists(CSV_PATH):
        raise FileNotFoundError(f"❌ CSV file not found at {CSV_PATH}. Run requirement extraction first.")

    # Load extracted requirements
    df = pd.read_csv(CSV_PATH)

    # Ensure required columns exist
    required_columns = ['requirement', 'label']
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        raise ValueError(f"❌ CSV is missing required columns: {', '.join(missing_columns)}")

    # Convert labels ('Functional' → 1, 'Non-Functional' → 0)
    df['label'] = df['label'].map({'Functional': 1, 'Non-Functional': 0})

    # Drop NaN values (if any)
    df = df.dropna(subset=['label'])
    df['label'] = df['label'].astype(int)  # Ensure integer format

    # Extract features and labels
    X = df['requirement'].values
    y = df['label'].values  # Labels: functional (1) or non-functional (0)

    # Text preprocessing
    max_features = 20000  # Max number of words in tokenizer
    max_len = 100  # Max sequence length

    tokenizer = Tokenizer(num_words=max_features)
    tokenizer.fit_on_texts(X)

    # Save tokenizer
    joblib.dump(tokenizer, TOKENIZER_PATH)

    # Convert text to sequences
    X_seq = tokenizer.texts_to_sequences(X)
    X_pad = pad_sequences(X_seq, maxlen=max_len)

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X_pad, y, test_size=0.2, random_state=42)

    # Build BiLSTM model
    model = Sequential([
        Embedding(input_dim=max_features, output_dim=128, input_length=max_len),
        SpatialDropout1D(0.2),
        Bidirectional(LSTM(100, dropout=0.2, recurrent_dropout=0.2)),
        Dense(64, activation='relu'),
        Dense(32, activation='relu'),
        Dense(1, activation='sigmoid')  # Binary classification
    ])

    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Train the model
    history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

    # Predictions
    y_pred_prob = model.predict(X_test)
    y_pred = (y_pred_prob >= 0.5).astype(int)  # Convert probabilities to binary labels

    # Calculate evaluation metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    logging.info(f"✅ Accuracy: {accuracy:.4f}")
    logging.info(f"✅ Precision: {precision:.4f}")
    logging.info(f"✅ Recall: {recall:.4f}")
    logging.info(f"✅ F1 Score: {f1:.4f}")

    print(f"✅ Accuracy: {accuracy:.4f}")
    print(f"✅ Precision: {precision:.4f}")
    print(f"✅ Recall: {recall:.4f}")
    print(f"✅ F1 Score: {f1:.4f}")

    # Save the model
    model.save(MODEL_PATH)
    logging.info("🎯 Model saved successfully!")
    print("🎯 Model saved successfully!")

    # Plot training/validation accuracy and loss
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()

    plt.show()

def main():
    logging.info("🚀 Train model script started.")

    # Validate required file existence
    if not os.path.exists(CSV_PATH):
        logging.error(f"❌ Required CSV file not found at: {CSV_PATH}")
        print(f"❌ CSV file missing. Make sure '{CSV_PATH}' is generated by the requirement extraction process.")
        return

    try:
        # Call the train_model() function
        train_model()
    except Exception as e:
        logging.exception("❌ An error occurred during model training.")
        print("❌ Model training failed. Check logs for details.")
    else:
        logging.info("🎉 Train model script completed successfully.")
        print("🎉 Model training completed successfully!")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logging.exception("❌ Unhandled exception in the main script.")
        print("❌ A critical error occurred. Check logs for details.")
