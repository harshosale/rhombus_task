const BASE_URL = "http://127.0.0.1:8000/csv";

export const getCsvs = async () => {
  let data = await fetch(`${BASE_URL}/`).then((r) => r.json());
  return data.csv;
};

export const uploadCsv = async ({ uploadData, setLoading }) => {
  setLoading(true);
  let payload = new FormData();
  for (let k in uploadData) {
    payload.append(k, uploadData[k]);
  }

  let data = await fetch(`${BASE_URL}/`, {
    method: "POST",
    body: payload,
  }).then((r) => r.json());
  setLoading(false);
  return data;
};

export const processCsv = async ({ id }) => {
  let data = await fetch(`${BASE_URL}/process/${id}`, {
    method: "POST",
  }).then((r) => r);
  return data.status === 202;
};

export const customizeCsv = async ({ id, customizedTypes }) => {
  let data = await fetch(`${BASE_URL}/process/${id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ data_type: customizedTypes }),
  }).then((r) => r);
  return data;
};

export const deleteCsv = async ({ id }) => {
  let data = await fetch(`${BASE_URL}/process/${id}`, {
    method: "DELETE",
  }).then((r) => r);
  return data.status === 204;
};
