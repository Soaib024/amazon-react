import { API } from "../backend";

export const signinRequest = async (body) => {
  const response = await fetch(`${API}/users/signin`, {
    method: "POST",

    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  if (json.status !== "error") {
    storeToken(json);
  }
  return json;
};

export const signupRequest = async (body) => {
  const response = await fetch(`${API}/users/signup`, {
    method: "POST",

    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  if (json.status !== "error") {
    storeToken(json);
  }
  return json;
};

export const pushCartChangesToServer = async (body) => {
  const token = body.token;
  await fetch(`${API}/cart`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};

export const checkoutHandler = async (token, products, productCounts) => {
  let checkoutSession;
  const body = {
    products,
    productCounts,
  };
  try {
    checkoutSession = await fetch(`${API}/checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err);
  }

  return checkoutSession;
};

export const fetchOrders = async (token, page) => {
  const orders = await fetch(`${API}/orders?page=${page}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return await orders.json();
};

const storeToken = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(user));
  }
};
