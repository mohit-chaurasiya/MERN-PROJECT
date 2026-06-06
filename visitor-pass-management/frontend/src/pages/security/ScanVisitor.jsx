import { notify } from "@/utils/notify";
import API from "../../services/api";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";
import SecurityLayout from "@/layouts/SecurityLayout";
import { QrCode } from "lucide-react";

const ScanVisitor = () => {
  const videoRef = useRef(null);
  const [visitor, setVisitor] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!isScanning) return;

    const codeReader = new BrowserMultiFormatReader();

    let controls;

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      async (result, err, ctrl) => {
        controls = ctrl;

        if (result && !scanned) {
          ctrl.stop();

          setScanned(true);
          setIsScanning(false);

          const scannedPass = result.getText();

          try {
            const res = await API.get(`/check/pass/${scannedPass}`);

            setVisitor(res.data);
            notify.success("Pass Scanned Successfully");
          } catch (error) {
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
  }, [isScanning, scanned]);

  const handleCheckin = async () => {
    try {
      const res = await API.post("/check/checkin", {
        passNumber: visitor.passNumber,
      });

      notify.success("Visitor Check In successfully");
    } catch (err) {
      console.log(err);
      notify.info("Visitor already Checked in");
    }
  };

  const handleCheckout = async () => {
    try {
      await API.post("/check/checkout", {
        passNumber: visitor.passNumber,
      });

      notify.success("Visitor Checked out");

      setVisitor(null);
      setScanned(false);
      setIsScanning(true);
    } catch (err) {
      notify.error("Please check in ");
      //   console.log(err);
    }
  };

  const isAppointmentToday = () => {
    if (!visitor?.date) return false;

    const today = new Date().toLocaleDateString();
    const appointmentDate = new Date(visitor?.date).toLocaleDateString();

    return today === appointmentDate;
  };

  const isDisabled = !isAppointmentToday() || visitor?.status === "checked-out";

  return (
    <SecurityLayout>
      {/* Hero */}

      <div
        className="
      mb-6
      rounded-3xl
      border border-white/10
      bg-gradient-to-r
      from-violet-600/20
      via-blue-600/20
      to-cyan-600/20
      p-6
    "
      >
        <h1 className="text-3xl font-bold text-white">Scan Visitor Pass</h1>

        <p className="text-slate-300 mt-2">
          Scan QR code and manage visitor entry.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scanner */}

        <div
          className="
  bg-[#0f172a]
  border border-white/10
  rounded-3xl
  p-5
"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">QR Scanner</h2>

            <span
              className="
      bg-green-500/20
      text-green-400
      px-3
      py-1
      rounded-full
      text-xs
      font-medium
      "
            >
              Ready
            </span>
          </div>

          {!isScanning ? (
            <div
              className="
      h-[220px]
      flex
      flex-col
      items-center
      justify-center
      rounded-2xl
      border
      border-dashed
      border-white/10
      "
            >
              <p className="text-slate-400 mb-4">Scanner is currently off</p>

              <button
                onClick={() => setIsScanning(true)}
                className="
        bg-violet-600
        hover:bg-violet-700
        text-white
        px-6
        py-3
        rounded-xl
        transition
        "
              >
                Start Scan
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="
      w-full
      h-[220px]
      md:h-[300px]
      xl:h-[350px]
      object-cover
      rounded-2xl
      border
      border-white/10
      "
            />
          )}
        </div>

        {/* Visitor Details */}

        <div
          className="
        bg-[#0f172a]
        border border-white/10
        rounded-3xl
        p-6
      "
        >
          {!visitor ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <QrCode size={60} className="text-violet-400 mb-4" />

              <h3 className="text-white text-xl font-semibold">
                Ready To Scan
              </h3>

              <p className="text-slate-400 mt-2">
                Scan a visitor QR pass to display details
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Visitor Details
              </h2>

              <div className="space-y-4">
                <div>
                  <img
                    className="w-32
    h-32
    md:w-40
    md:h-40
    rounded-3xl
    object-cover
    border-4
    border-green-500/30
    shadow-lg
    shadow-green-500/20
    mx-auto"
                    src={`${import.meta.env.VITE_SERVER_URL}/${visitor?.visitorPhoto}`}
                    alt={visitor?.name}
                  />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Visitor Name</p>

                  <p className="text-white font-medium">
                    {visitor?.visitorName}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Host</p>

                  <p className="text-white font-medium">{visitor?.hostName}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Purpose</p>

                  <p className="text-white font-medium">{visitor?.purpose}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Date</p>

                  <p className="text-white font-medium">
                    {new Date(visitor?.date).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Status</p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      visitor?.status === "INSIDE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {visitor?.status}
                  </span>
                </div>

                {isAppointmentToday() ? (
                  <div
                    className="
                  bg-green-500/10
                  border border-green-500/20
                  text-green-400
                  p-3
                  rounded-xl
                "
                  >
                    ✓ Appointment Scheduled For Today
                  </div>
                ) : (
                  <div
                    className="
                  bg-red-500/10
                  border border-red-500/20
                  text-red-400
                  p-3
                  rounded-xl
                "
                  >
                    ⚠ Appointment Not Scheduled For Today
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <button
                  onClick={handleCheckin}
                  disabled={isDisabled}
                  className={`py-3 rounded-xl font-medium transition ${
                    isAppointmentToday()
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  } ${isDisabled ? "hidden" : "block"}`}
                >
                  Check In
                </button>

                <button
                  onClick={handleCheckout}
                  className={`
                py-3
                rounded-xl
                font-medium
                bg-red-600
                hover:bg-red-700
                text-white
                transition

                ${isDisabled ? "hidden" : "block"}`}
                >
                  Check Out
                </button>

                <button
                  onClick={() => {
                    setVisitor(null);
                    setScanned(false);
                    setIsScanning(true);
                  }}
                  className="
                py-3
                rounded-xl
                font-medium
                bg-slate-700
                hover:bg-slate-600
                text-white
                transition
              "
                >
                  Scan Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </SecurityLayout>
  );
};

export default ScanVisitor;
