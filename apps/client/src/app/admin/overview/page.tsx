import React from "react";
import DashboardCard from "../_components/items/DashboardCard";

const OverviewPage = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <section id="dashboard" className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            <span className="text-accent">D</span>asboard
          </h1>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <DashboardCard tittle="Sales" subtittle="0" body="0" />
            <DashboardCard tittle="Customer" subtittle="0" body="0" />
            <DashboardCard tittle="Active Product" subtittle="0" body="0" />
          </div>
        </section>
      </div>
    </>
  );
};

export default OverviewPage;
