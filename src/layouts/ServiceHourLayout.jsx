import { useState } from "react";
import Sidebar from "../components/serviceHours/Sidebar";
import Header from "../components/serviceHours/Header";
import Main from "../components/serviceHours/Main";
import Footer from "../components/serviceHours/Footer";

function ServiceHourLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 font-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Contenido principal */}
      <div
        className={`flex flex-col flex-1 transition-[margin] duration-500 ease-in-out`}
      >
        <Header />
        <div className="flex-1  overflow-auto min-w-0">
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ServiceHourLayout;
