import { useRef } from "react";

// import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Webcam from "react-webcam";
import { useContext } from "react";
import { locateContext } from "./App";
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};
export const WebcamCapture = () => {
  const { userFormImage, setUserFormImage }: any = useContext(locateContext);
  console.log(userFormImage.image);
  const webcamRef = useRef<Webcam>(null);
  // const navigate = useNavigate();
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc: any = webcamRef.current.getScreenshot();
      setUserFormImage({ ...userFormImage, image: imageSrc });
    }
  }, []);

  return (
    <div className="webcam-container">
      <div
        className="webcam-img"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          width: "900px",
          height: "550px",
          backgroundColor: "white",
          // borderRadius: "50px",
        }}
      >
        {userFormImage.image === null ? (
          <Webcam
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={550}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img
            style={{
              width: "30vw",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              gap: "10px",
            }}
            src={userFormImage.image}
            alt="Captured"
          />
        )}
      </div>
      <div>
        {userFormImage.image !== null ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setUserFormImage({ ...userFormImage, image: null });
            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "420px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "420px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            Capture
          </button>
        )}
        {/* <button
          onClick={() => {
            navigate("/ThankyouPage");
          }}
          className="webcam-btn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "720px",
          }}
        >
          Next
        </button> */}
      </div>
    </div>
    // </div>
  );
};