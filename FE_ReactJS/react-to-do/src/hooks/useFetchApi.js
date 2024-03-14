import { useEffect, useState } from "react";
import { URL } from "../config/api";

export default function useFetchApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = `${URL.BASE_URL}${endpoint}`;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const finalRes = await res.json();
        setData(finalRes.data);
        setLoading(false);
      } catch (err) {
        console.log("Error");
      }
    };
    getData();
  }, [url]);

  return { loading, data };
}
