import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

import { useContext } from "react";
import { locateContext } from "./App";

const videoConstraints = {
  width: 20,
  height: 20,
  facingMode: "user",
};

export const MultipleImageCapture: React.FC = () => {
  const { capturedImages, setCapturedImages }: any = useContext(locateContext);
  const [captureCount, setCaptureCount] = useState(0);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages([
        ...capturedImages,
        { id: captureCount, imageSrc: imageSrc || "" },
      ]);
      setCaptureCount(captureCount + 1);
    }
  }, [capturedImages, captureCount]);

  const retake = () => {
    if (capturedImages.length > 0) {
      const updatedImages = [...capturedImages];
      updatedImages.pop(); // Remove the last captured image
      setCapturedImages(updatedImages);
      setCaptureCount(captureCount - 1); // Decrement captureCount
    }
  };

  console.log(capturedImages);
  return (
    <div className="webcam-container">
      <div className="webcam-img">
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={550}
          videoConstraints={videoConstraints}
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "5%",
          gap: "5%",
          justifyContent: "space-evenly",
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          className="webcam-btn"
        >
          Capture Image {captureCount}
        </button>
        {capturedImages.length > 0 && (
          <button onClick={retake} className="webcam-btn">
            Retake
          </button>
        )}
      </div>
    </div>
  );
};
