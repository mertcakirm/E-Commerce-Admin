const API_BASE_URL = "http://213.142.159.49:8000/api/admin/user";

export const getAllUsers = async (currentPage, usersPerPage) => {
  return await fetch(`${API_BASE_URL}/all?page=${currentPage - 1}&size=${usersPerPage}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });
};

export const toggleUserActivity = (userId) => {
  return fetch(`${API_BASE_URL}/inactive?userId=${userId}`, {
    method: "PUT",
  })
    .then((response) => response)
    .catch((error) => {
      console.error("Error toggling user activity:", error);
      throw error;
    });
};
