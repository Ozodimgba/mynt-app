import { useEffect, useState } from "react";

export const useFetch = (authToken: string | null) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      await fetch("http://localhost:9000/api", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(response => response.json()).then(setData);
    }

    fetchApi()
  }, [authToken]);

  return { data };
};
