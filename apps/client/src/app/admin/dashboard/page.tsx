import React from "react";
import DashboardCard from "../_components/items/DashboardCard";

const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <DashboardCard tittle="Sales" subtittle="0" body="0" />
        <DashboardCard tittle="Customer" subtittle="0" body="0" />
        <DashboardCard tittle="Active Product" subtittle="0" body="0" />
      </div>
    </>
  );
};

export default DashboardPage;
