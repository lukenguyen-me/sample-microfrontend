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
    return <p>Loading Product Remote...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (RemoteComponent) {
    return <RemoteComponent title="Passed from Host" />;
  }

  return null;
};

export default App;
