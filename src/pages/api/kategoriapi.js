const API_BASE_URL = 'http://213.142.159.49:8000/api';

export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/category/admin/get/all`);
    if (!response.ok) {
        throw new Error('Error fetching categories');
    }
    return response.json();
};

export const addCategory = async (categoryDTO) => {
    const response = await fetch(`${API_BASE_URL}/category/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryDTO),
    });
    if (!response.ok) {
        throw new Error('Error adding category');
    }
    return response;
};

export const deleteCategory = async (categoryId) => {
    const response = await fetch(`${API_BASE_URL}/admin/category/delete?categoryId=${categoryId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting category');
    }
    return response;
};

export const categoryDropdown = async () => {
    try {
        const response = await fetch("http://213.142.159.49:8000/api/category/get/all");
        if (!response.ok) {
            throw new Error("Kategoriler alınırken hata oluştu");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
