import React from "react";
import Cart from "./Cart";

const App: React.FC = () => {
  return (
    <main>
      <div className="fixed top-0 w-full text-center bg-neutral p-2">
        <h1 className="font-semibold text-neutral-content">
          Cart Remote (Standalone Dev Mode)
        </h1>
      </div>
      <Cart />
    </main>
  );
};

export default App;
