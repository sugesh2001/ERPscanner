import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import { locateContext } from "./App";

function Test() {
  const [scanResult, setScanResult] = useState(null);
  const { showLabel }: any = useContext(locateContext);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 450,
          height: 450,
        },
        fps: 2,
      },
      true
    );

    function success(result: any) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }

    scanner.render(success, error);

    return () => {
      // Clean up the scanner when component is unmounted
      scanner.clear();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      window.location.replace(scanResult);
    }
  }, [scanResult]);

  return (
    <div className="scanner-container">
      <div id="reader" className="custom-reader"></div>
    </div>
  );
}

export default Test;