import React, { useState, useRef, useEffect } from "react";
import { NegativeSentimentCard, NeutralSentimentCard, PositiveSentimentCard } from "./home";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [sentiment, setSentiment] = useState("");
  const audioRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);

    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsLoading(true);
      setFetched(false)
      const formData = new FormData();
      formData.append("input_video", selectedFile);

      fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setSentiment(data.sentiment_analysis);
          console.log(sentiment)
        })
        .catch((error) => {
          console.error("Error converting video:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setFetched(true);
        });
    }
  };
  
  const ProgressBar = () => {
    const [percentage, setPercentage] = useState(1);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (percentage < 99) {
          setPercentage(percentage + 1);
        }
      }, 50); // Adjust the timer interval as needed
  
      return () => {
        clearInterval(timer);
      };
    }, [percentage]);
  
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center h-[7rem] w-64">
        <div className="text-xl font-semibold mb-4 animate-pulse">Analysing</div>
        <div className="bg-stroke dark:bg-gray-400 relative h-4 w-full rounded-2xl">
          <div
            className="bg-blue-300 absolute text-center rounded-sm text-xs top-0 left-0 flex h-full"
            style={{ width: `${percentage}%` }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
    );
    }

    return (
      <div className="min-h-screen ">
      <header className="bg-white shadow-lg p-4">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
            📽️ Video Sentiments 🎉
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="text-center text-lg border-4 border-dashed border-blue-400 p-8 rounded-md flex justify-center items-center">
            {videoUrl ? (
              <video
                controls
                width="480"
                height="360"
                src={videoUrl}
                className="border-4 border-blue-400 rounded-xl h-96 w-96 object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-xl">
                Drag and drop your video file here or{" "}
                <label className="text-blue-500 cursor-pointer hover:text-blue-700">
                  browse for a video
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
            )}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg m-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 hover:shadow-xl hover:transform hover:scale-105"
            >
              Analyze with Sound
            </button>
            <button
              disabled
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg m-4 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Analyze without Sound
            </button>
          </div>
          {isLoading && (
            <ProgressBar/>
          )}
         
          {isFetched && (
            <div className="flex flex-col text-center justify-center items-center bg-blue-100 p-10 w-auto rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-800">
                🎉 Analysed Sentiment 🎉
              </h3>
              <div className="mt-10">
                {sentiment === "Negative" && (
                  <NegativeSentimentCard />
                )}
                {sentiment === "Neutral" && (
                  <NeutralSentimentCard />
                )}
                {sentiment === "Positive" && (
                  <PositiveSentimentCard />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    
    
    
    );
  
  
 
};

export default App;
