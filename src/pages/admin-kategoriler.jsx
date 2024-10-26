import React, { useState, useEffect } from 'react';
import Admin_sidebar from './admin-sidebar';
import { fetchCategories, addCategory, deleteCategory } from './api/kategoriapi';
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const Admin_kategoriler = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const categoriesPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  

  

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategoriesData(data);
        setTotalPages(Math.ceil(data.length / categoriesPerPage));
      } catch (error) {
        console.error('Error fetching categories data:', error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(categoriesData.length / categoriesPerPage));
  }, [categoriesData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categoriesData.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      console.log('Category deleted:', categoryId);

      // Refresh categories after delete
      const refreshedData = await fetchCategories();
      setCategoriesData(refreshedData);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  

  
  

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setNewCategoryImage(files ? files[0] : null);
    } else if (name === "name") {
      setNewCategoryName(value);
    } else if (name === "type") {
      setNewCategoryType(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const base64Image = await convertImageToBase64(newCategoryImage);
    const base64new = base64Image.split(",")[1];

    const categoryDTO = {
      image: { "bytes": base64new },
      typeName: newCategoryType,
      categoryName: newCategoryName,
    };

    try {
      await addCategory(categoryDTO);

      // Refresh categories after adding
      const refreshedData = await fetchCategories();
      setCategoriesData(refreshedData);
      togglePopup();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">Kategori Listesi</div>
          <div>
            <br />
            <input
              type="text"
              placeholder="Ara..."
              className="admin-search-inp"
              value={searchTerm}
              onChange={handleSearch}
              style={{ height: '50px' }}
            />
          </div>
          <button className='tumunu-gor-btn-admin' style={{ width: '300px', marginTop: '30px' }} onClick={togglePopup}>Kategori Ekle</button>
          <div className="col-12 mt-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Kategori ID</th>
                    <th scope="col">Kategori Kapağı</th>
                    <th scope="col">Kategori Adı</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map(category => (
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td>
                      {category.image ? (
                          <img 
                            src={`data:${category.image.type};base64,${category.image.bytes}`}
                            alt={category.categoryName}
                            className='img-fluid' 
                            style={{width:"100px"}}
                          />
                        ) : (
                          <span>No image available</span> // Placeholder text when no image
                        )}
                      </td>
                      <td>{category.categoryName}</td>
                      <td>
                        <div className="user-duzenle-row">
                          {/* <a href="/admin-kategori-guncelle" className="user-edit-btn">
                          <svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
                            </svg>
                          </a> */}
                          <button className="user-sil-btn" onClick={()=>handleDelete(category.id)} >
                          <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" fill="white" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                            </svg>
                          </button>
                        </div>  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row col-12 justify-content-center">
                <nav aria-label="Page navigation example" className="col-5">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleClick(e, currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                      <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => handleClick(e, number + 1)}>
                          {number + 1}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleClick(e, currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup form for adding a new category */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className='popup-header'>
            <h2>Kategori Ekle</h2>

            <button className="popup-close-btn" onClick={togglePopup}>&times;</button>
            </div>
            <form className='popup-form' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Kategori Adı:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="type">Kategori Türü:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newCategoryType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="image">Kategori Resmi:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Ekle</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_kategoriler;
