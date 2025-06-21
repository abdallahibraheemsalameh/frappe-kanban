import axios from "axios";

const frappeApi = axios.create({
  baseURL: import.meta.env.VITE_FRAPPE_BASE_URL,
  headers: {
    Authorization: `token ${import.meta.env.VITE_FRAPPE_API_KEY}:${
      import.meta.env.VITE_FRAPPE_API_SECRET
    }`,
    "Content-Type": "application/json",
  },
});

export const getSalesOrders = async () => {
  const response = await frappeApi.get("/api/resource/Sales Order", {
    params: {
      fields: JSON.stringify(["name", "customer_name", "delivery_date"]),
      limit_page_length: 100,
    },
  });

  return response.data.data;
};

export const updateDeliveryDate = async (
  orderName: string,
  newDate: string
) => {
  const response = await frappeApi.put(
    `/api/resource/Sales Order/${orderName}`,
    {
      delivery_date: newDate,
    }
  );

  return response.data;
};
