import api from "./Api.js";

export const GetProductsRequest = (pageNum, pageSize,search) => {
    return api.get(`Admin/products?pageNumber=${pageNum}&pageSize=${pageSize}0&searchTerm=${search}`);
};

export const GetLowStockProductsRequest = (limit) => {
    return api.get(`Admin/low-stock?limit=${limit}`);
};

export const DeleteProductRequest = async (id) => {
    return await api.delete(`Products/${id}`);
};

export const UpdateDiscountRequest = async (discountRate, productCode) => {
    return await api.put(`Products/${productCode}/discount/${discountRate}`)
};

export const AddProductRequest = async (formData) => {
    return await api.post(`Products/add`, formData);
};
export const GetProductDetailRequest = async (urlpop) => {
    return  await api.get(`Admin/Product/${urlpop}`)
};

export const AddProductImageRequest = async (productId,formData) => {
    return await api.post(`Products/${productId}/upload-image`, formData);
};

export const AddStockRequest = (productId,size,quantity) => {
    return api.post(`Products/${productId}/stock/${size}/${quantity}`);
};

export const DeleteStockRequest = (variantId) => {
    return api.delete(`Products/stock/${variantId}`);
};

export const DeleteProductImageRequest = (id) => {
    return api.delete(`Products/image/${id}`);
};

export const UpdateProductRequest = (urlpop, updatedProduct) => {
    return api.put(`Products/${urlpop}`, updatedProduct, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const GetProductQuestionsRequest = async () => {
    return await api.get("QuestionAndAnswer/get-all")
}

export const AnswerQuestionRequest = async (formData) => {
    return await api.post("QuestionAndAnswer/add-answer", formData);
}

export const DeleteQuestionRequest = async (id) => {
    return await api.delete(`QuestionAndAnswer/question/${id}`);
}