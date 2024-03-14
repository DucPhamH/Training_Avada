export const URL = {
  BASE_URL: "http://localhost:5000/api",
};

export const fetchApi = async ({ endpoint, method, data }) => {
  const res = await fetch(`${URL.BASE_URL}${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  });
  const finalRes = await res.json();
  return finalRes;
};
