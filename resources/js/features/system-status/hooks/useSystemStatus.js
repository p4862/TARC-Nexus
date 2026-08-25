import { useEffect, useState } from "react";

import { getSystemStatus } from "@/features/system-status/services/systemStatusApi";

const INITIAL_STATE = {
  status: "loading",
  message: "Checking the Laravel API…",
};

export function useSystemStatus() {
  const [systemStatus, setSystemStatus] = useState(INITIAL_STATE);

  useEffect(() => {
    const abortController = new AbortController();

    getSystemStatus({ signal: abortController.signal })
      .then((response) => {
        setSystemStatus({
          status: response.data.status,
          message: response.message,
        });
      })
      .catch((error) => {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        setSystemStatus({
          status: "error",
          message: "The API health check could not be completed.",
        });
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return systemStatus;
}
