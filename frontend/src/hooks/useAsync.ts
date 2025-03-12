import { useState, useCallback } from "react";

/**
 * Interface for async operation result
 */
interface AsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for handling asynchronous operations with loading and error states
 * @returns Object with execute function, loading, and error states
 */
export const useAsync = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute an async function with loading and error handling
   * @param asyncFunction Async function to execute
   * @returns Result of the async function or null on error
   */
  const execute = useCallback(
    async (asyncFunction: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction();
        return result;
      } catch (err: any) {
        setError(err?.message || "An unknown error occurred");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Execute an async function with data storage and return the stored data
   * @param asyncFunction Async function to execute
   * @param initialData Initial data to use while loading
   * @returns Object with data, loading, and error states
   */
  const executeWithState = useCallback(
    async <D>(
      asyncFunction: () => Promise<D>,
      initialData: D | null = null
    ): Promise<AsyncResult<D>> => {
      const result: AsyncResult<D> = {
        data: initialData,
        loading: true,
        error: null,
      };

      try {
        result.loading = true;
        result.error = null;
        result.data = await asyncFunction();
        return result;
      } catch (err: any) {
        result.error = err?.message || "An unknown error occurred";
        return result;
      } finally {
        result.loading = false;
      }
    },
    []
  );

  /**
   * Wrap an async function to handle loading and error states
   * @param asyncFunction Async function to wrap
   * @returns Wrapped function that handles loading and error states
   */
  const wrapAsync = useCallback(
    <D, P extends any[]>(asyncFunction: (...args: P) => Promise<D>) => {
      return async (...args: P): Promise<D | null> => {
        try {
          setLoading(true);
          setError(null);
          const result = await asyncFunction(...args);
          return result;
        } catch (err: any) {
          setError(err?.message || "An unknown error occurred");
          return null;
        } finally {
          setLoading(false);
        }
      };
    },
    []
  );

  return {
    execute,
    executeWithState,
    wrapAsync,
    loading,
    error,
  };
};

/**
 * Hook for debouncing a value
 * @param value Value to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for managing local storage with a typed value
 * @param key Local storage key
 * @param initialValue Initial value if key doesn't exist
 * @returns Tuple of [storedValue, setValue]
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  };

  return [storedValue, setValue];
};

// Required import
import { useEffect } from "react";

/**
 * Hook that calls a function when the component mounts
 * @param fn Function to call on mount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

/**
 * Hook that calls a function when the component unmounts
 * @param fn Function to call on unmount
 */
export const useUnmount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn();
    };
  }, []);
};

/**
 * Hook to track a value's previous state
 * @param value Current value
 * @returns Previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

// Required import
import { useRef } from "react";

/**
 * Hook for using interval with clean up
 * @param callback Function to call on each interval
 * @param delay Delay in milliseconds (null to pause)
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
