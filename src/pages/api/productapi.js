// api.js
const API_BASE_URL = "http://213.142.159.49:8083/api/admin/product";
const token = localStorage.getItem("token")

export const fetchProducts = async (nextPage) => {
  const response = await fetch(nextPage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Ürünler gösterilirken hata oluştu",response);
    return;
  }
  return await response.json();
};

export const deleteProduct = async (productCode) => {
  const response = await fetch(`${API_BASE_URL}/delete/${productCode}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Ürün silme işlemi başarısız oldu");
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
    console.log("indirim uygulanamadı");
    return null;
  }
  
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
    console.error("Ürün eklenemedi",response);
    return;
  }
  };