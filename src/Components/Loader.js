import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]">
      <div className="flex gap-5 text-6xl font-semibold">
        <h1 className="text-secondary M">M</h1>
        <h1 className="text-white D">D</h1>
        <h1 className="text-tertiary G">G</h1>
      </div>
    </div>
  );
}

export default Loader;
