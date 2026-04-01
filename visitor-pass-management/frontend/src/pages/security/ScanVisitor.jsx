import { notify } from "@/utils/notify";
import API from "../../services/api";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";
import SecurityLayout from "@/layouts/SecurityLayout";

const ScanVisitor = () => {
  const videoRef = useRef(null);
  const [visitor, setVisitor] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    let controls;

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      async (result, err, ctrl) => {
        if (result && !scanned) {
          ctrl.stop();

          setScanned(true);

          const scannedPass = result.getText();

        //   console.log("QR:", scannedPass);

          try {
            const res = await API.get(`/check/pass/${scannedPass}`);

            // console.log("Visitor Data:", res.data);

            setVisitor(res.data);
          } catch (error) {
            // console.log(error);
            notify.error("Invalid Pass");
          }
        }
      },
    );

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [scanned]);


  const handleCheckin = async () => {
    try{
       const res =  await API.post("/check/checkin",{
            passNumber: visitor.passNumber
        });


        notify.success("Visitor Check In successfully")

    }catch(err){
        // console.log(err)
        notify.info('Visitor already Checked in')
    }
  }

  const handleCheckout = async () => {
    try {
      await API.post("/check/checkout", {
        passNumber: visitor.passNumber,
      });

      notify.success("Visitor Checked out");

      setVisitor(null);
      setScanned(false);
    } catch (err) {
        notify.error("Please check in ")
    //   console.log(err);
    }
  };

  const isAppointmentToday = () => {
    if (!visitor?.date) return false;

    const today = new Date().toLocaleDateString();
    const appointmentDate = new Date(visitor?.date).toLocaleDateString();

    return today === appointmentDate;
  };

  return (
    <SecurityLayout>
      <h1 className="text-xl font-bold mb-4">Scan Visitor Pass</h1>

      <div className="mb-6 w-295
      ">
        <video ref={videoRef} className="w-full max-w-md rounded-lg border" />
      </div>

      {scanned && (
        <div className="bg-white shadow rounded-xl p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-3">Visitor Details</h2>

          <p>
            <strong>Name: <span className="text-gray-500">{visitor?.visitorName}</span> </strong>
          </p>
          <p>
            <strong>Host: <span className="text-gray-500">{visitor?.hostName}</span></strong>
          </p>
          <p>
            <strong>Purpose: <span className="text-gray-500">{visitor?.purpose}</span> </strong>
          </p>
          <p>
            <strong>Status: <span className={`text-red-500 ${visitor?.status } === "INSIDE" ? "text-green-600" : "text-red-700"`}>{visitor?.status }</span> </strong>
          </p>
          <p>

            <strong>
              Date: {new Date(visitor?.date).toLocaleDateString("en-IN")}
            </strong>
          </p>

          {!isAppointmentToday() && (
            <p className="text-red-600 font-semibold mt-2">
              ⚠ Appointment is not scheduled for today
            </p>
          )}

          <div className="mt-4 flex gap-3">

           <button 
           onClick={()=>{handleCheckin()}}
           disabled={!isAppointmentToday()}
           className={` text-white px-4 py-2 rounded ${
            isAppointmentToday() ? "bg-green-600 " : "bg-gray-400 cursor-not-allowed"
           }`}
           >
            Check In
           </button>

            <button
              onClick={() => {
                handleCheckout();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Check Out
            </button>

            <button
              onClick={() => {
                setVisitor(null);
                setScanned(false);
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Scan Next
            </button>
          </div>
        </div>
      )}
    </SecurityLayout>
  );
};

export default ScanVisitor;
