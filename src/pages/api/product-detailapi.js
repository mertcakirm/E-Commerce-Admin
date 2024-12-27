const API_BASE_URL = 'http://213.142.159.49:8000/api/admin/product';

export const fetchProductDetail = (urlpop) => {
    return fetch(`${API_BASE_URL}/get/${urlpop}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching product:', error);
            throw error;
        });
};

export const deleteProductImage = (id) => {
    return fetch(`${API_BASE_URL}/image/delete/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .catch(error => {
            console.log('Error deleting image:',error);
        });
};

export const updateProduct = (urlpop, updatedProduct) => {
    const jsonItem = JSON.stringify(updatedProduct);
    return fetch(`http://213.142.159.49:8083/api/admin/product/update/${urlpop}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonItem,
    })
        .then(response => response)
};