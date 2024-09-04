import React from "react";
import Navbar from "../../../components/navbar";
import { InputForm } from "../../../components/input-form";
import { Menubar } from "./_components/menu-bar";

const DashboardPage = () => {
  return (
    <div className="flex flex-col space-x-4">
      <Navbar />
      <Menubar />
    </div>
  );
};

export default DashboardPage;
