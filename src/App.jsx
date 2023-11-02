import React, { useState, useRef } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

      const formData = new FormData();
      formData.append("input_video", selectedFile);

      fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setSentiment(data.sentiment_analysis);
        })
        .catch((error) => {
          console.error("Error converting video:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-3/4 p-4 space-y-4 flex flex-col justify-center">
        <div className="border-2 border-dashed border-gray-400 h-80 w-80 rounded-lg p-4 text-center relative">
          {videoUrl ? (
            <video
              controls
              width="320"
              height="240"
              src={videoUrl}
              className="border-2 border-gray-400 rounded-lg h-80 w-80 object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-lg">
              Drag and drop your video file here or{" "}
              <label className="text-blue-500 cursor-pointer">
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

          {isLoading && (
            <div className="absolute w-full h-2 bg-blue-500">
              <div className="w-1/3 h-full bg-blue-600 animate-slide" />
            </div>
          )}
        </div>

        <button
          className="bg-blue-500 text-white rounded-md p-2 w-64"
          onClick={handleUpload}
        >
          Sentiment Analysis
        </button>

        {isLoading && (
          <div className="text-blue-500 text-lg">Analyzing... Please wait.</div>
        )}

       
      </div>

      <div className="w-1/4 h-3/4 bg-blue-100 rounded-md p-4 border-2 border-gray-400">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Sentiment Analysis</h2>
        <div className="text-xl">{sentiment}</div>
      </div>
    </div>
  );
};

export default App;
