import { useRef, useState, useEffect, useCallback } from "react";

export const useAbortController = () => {
  const controllerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (asyncFn, params = {}) => {
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn({ ...params, signal: controller.signal });
      return result;
    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        console.log("Request Cancelled");
        return null;
      }
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  return { fetchData, loading, error };
};
