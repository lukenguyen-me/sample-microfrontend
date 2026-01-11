import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<{
    title: string;
  }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRemoteComponent = async () => {
      try {
        // Dynamically import the remote module
        const module = await import("product_remote/ProductList");
        // Get the default export
        const Component = module.default || module;
        setRemoteComponent(() => Component);
        setLoading(false);
      } catch (e) {
        console.error("Error loading remote:", e);
        setError((e as Error).message);
        setLoading(false);
      }
    };

    loadRemoteComponent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4 text-lg">Loading Product Remote...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          {RemoteComponent && <RemoteComponent title="Previewing Catalog" />}
        </div>
        <div className="flex flex-col">
          <div className="card">Cart</div>
          <div className="card">Checkout</div>
        </div>
      </div>
    </main>
  );
};

export default App;
