import React from "react";
import Checkout from "./Checkout";

const App: React.FC = () => {
  return (
    <main>
      <div className="fixed top-0 w-full text-center bg-neutral p-2">
        <h1 className="font-semibold text-neutral-content">
          Checkout Remote (Standalone Dev Mode)
        </h1>
      </div>
      <Checkout />
    </main>
  );
};

export default App;
