import Navbar from "../components/homePage/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            Visitor Pass Management System
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome to our company visitor management portal
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
