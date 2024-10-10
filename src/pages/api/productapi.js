// api.js
const API_BASE_URL = "http://213.142.159.49:8083/api/admin/product";

export const fetchProducts = async (token, nextPage) => {
  const response = await fetch(nextPage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  
  return await response.json();
};

export const deleteProduct = async (token, productCode) => {
  const response = await fetch(`${API_BASE_URL}/delete/${productCode}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting product");
  }
};

export const updateDiscount = async (discountRate, productCode) => {
  const discountDTO = { discount: discountRate };
  
  const response = await fetch(`${API_BASE_URL}/update/discount/${productCode}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discountDTO),
  });

  if (!response.ok) {
    throw new Error("Error applying discount");
  }
  
  return await response.json();
};

export const addProduct = async (productDTO) => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to send data");
  }
  
  return await response.json();
};
