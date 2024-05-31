import Back from "@/components/action/Back";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center items-center gap-5">
        <h1 className="text-6xl text-center">404</h1>
        <h1 className="text-6xl text-center">Opps Not Found !!!</h1>
        <Back />
      </div>
    </>
  );
};

export default NotFound;
