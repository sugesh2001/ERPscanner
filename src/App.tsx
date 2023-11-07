import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyForm from "./DataFrom.tsx";
//  import Test from "./postReader";
import LaptopDetails from "./LaptopDetails";
import { WebcamCapture } from "./WebCamCapture";
import FormWithCheckbox from "./FormWithCheckbox";
import { ThankyouPage } from "./ThankyouPage";
import { WelcomePage } from "./WelcomePage";
import ExitCheckBox from "./ExitCheckBox";
import { ThankYouExit } from "./ThankYouExit.tsx";
import { SecurityLogin } from "./SecurityLogin";
import StandardListImage from "./StandardListImage";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { createContext, useContext, useState } from "react";
import Notifiction from "./Notification";
import EmployeeChart from "./EmployeeChart.tsx";

// import { StandardListImageExit } from "./StandardListImageExit";

export const locateContext = createContext({});

function App() {
  localStorage.formdata;
  const [showLabel, setShowLabel] = useState(true);
  const [formDataLaptop, setFormDataLaptop] = useState({
    laptopBrand: "",
    laptopSerialNumber: "",
    laptopLocation: "",
    laptopImage: "",
  });

  const [userFormImage, setUserFormImage] = useState({
    image: null,
  });

  const [formDataEmployee, setFormDataEmployee] = useState({
    name: "",
    id: "",
    laptopSerialNumber: "",
    inTime: "",
    status: "",
  });

  const [formDataCheckBox, setFormDataCheckBox] = useState({
    scissors: false,
    pendrive: false,
    hardDisk: false,
    cutter: false,
    others: false,
    otherText: "",
  });
  interface CapturedImage {
    id: number;
    imageSrc?: string | null;
  }
  const [currentDate, setCurrentDate] = useState("");
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [successCount, setSuccessCount] = useState<number>(0);

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <locateContext.Provider
        value={{
          formDataLaptop: formDataLaptop,
          setFormDataLaptop: setFormDataLaptop,
          userFormImage: userFormImage,
          setUserFormImage: setUserFormImage,
          formDataEmployee: formDataEmployee,
          setFormDataEmployee: setFormDataEmployee,
          formDataCheckBox: formDataCheckBox,
          setFormDataCheckBox: setFormDataCheckBox,
          currentDate: currentDate,
          setCurrentDate: setCurrentDate,
          showLabel: showLabel,
          setShowLabel: setShowLabel,
          capturedImages: capturedImages,
          setCapturedImages: setCapturedImages,
          successCount: successCount,
          setSuccessCount: setSuccessCount,
          //  extractEmployeeInfo :extractEmployeeInfo ,
        }}
      >
        <Routes>
          <Route path="/" element={<SecurityLogin />} />
          <Route path="/post" element={<MyForm />} />
          <Route path="/LaptopDetails" element={<LaptopDetails />} />
          <Route path="/WebCamCapture" element={<WebcamCapture />} />
          <Route path="/FormWithCheckbox" element={<FormWithCheckbox />} />
          <Route path="/ThankyouPage" element={<ThankyouPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/ExitCheckBox" element={<ExitCheckBox />} />
          <Route path="/ThankYouExit" element={<ThankYouExit />} />
          <Route path="/SecurityLogin" element={<SecurityLogin />} />
          <Route path="/StandardListImage" element={<StandardListImage />} />
          <Route path="/Notification" element={<Notifiction />} />
          <Route path="/EmployeeChart" element={<EmployeeChart />} />*{" "}
          {/* <Route path="/StandardListImageExit" element={<StandardListImageExit />} /> */}
          <Route
            path="/MultipleImageCapture"
            element={<MultipleImageCapture />}
          />
        </Routes>
      </locateContext.Provider>
    </BrowserRouter>
  );
}
export default App;
