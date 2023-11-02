from fastapi import FastAPI, File, UploadFile
import os
import shutil
from moviepy.editor import VideoFileClip
from fastapi.middleware.cors import CORSMiddleware
import speech_recognition as sr
from pydub import AudioSegment
from textblob import TextBlob

app = FastAPI()

# Define CORS settings with your actual frontend URL
origins = ["*"]  # Replace with your frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Define the directory for storing uploaded videos
video_storage_directory = "videos"
audio_storage_directory = "audios"

if not os.path.exists(video_storage_directory):
    os.makedirs(video_storage_directory)

if not os.path.exists(audio_storage_directory):
    os.makedirs(audio_storage_directory)


@app.post("/upload/")
async def upload_video_file(input_video: UploadFile):
    video_path = os.path.join(video_storage_directory, input_video.filename)

    # Save the uploaded video file to the videos folder
    with open(video_path, "wb") as video_file:
        shutil.copyfileobj(input_video.file, video_file)

    # Extract audio from the video
    video_clip = VideoFileClip(video_path)
    audio_path = os.path.join(audio_storage_directory, os.path.splitext(input_video.filename)[0] + ".mp3")
    video_clip.audio.write_audiofile(audio_path)

    # Convert audio to a supported format (e.g., WAV)
    audio_wav_path = os.path.join(audio_storage_directory, os.path.splitext(input_video.filename)[0] + ".wav")
    audio_segment = AudioSegment.from_mp3(audio_path)
    audio_segment.export(audio_wav_path, format="wav")

    # Perform speech-to-text on the converted audio
    recognizer = sr.Recognizer()
    
    # Load the audio file from the saved path
    audio = sr.AudioFile(audio_wav_path)
    
    with audio as source:
        audio_text = recognizer.record(source)
        result = recognizer.recognize_google(audio_text)
        
        # Print the recognized text
        print("Recognized Text:", result)

    # Perform sentiment analysis using TextBlob
    sentiment_analysis = analyze_sentiment(result)

    return {
        "message": "Video uploaded, audio extracted, and text extracted successfully.",
        "video_path": video_path,
        "audio_path": audio_path,
        "speech_to_text": result,
        "sentiment_analysis": sentiment_analysis
    }

def analyze_sentiment(text):
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity  # Range between -1 and 1 (negative to positive sentiment)
    if sentiment > 0:
        return "Positive"
    elif sentiment < 0:
        return "Negative"
    else:
        return "Neutral"
