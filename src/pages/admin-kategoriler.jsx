import {useState, useEffect, useRef} from 'react';
import Admin_sidebar from '../components/admin-sidebar.jsx';
import {fetchCategories, addCategory, deleteCategory} from './api/kategoriapi';
import {NotificationCard, showNotification} from "../components/notification.jsx";
import LoadingComp from "../components/child/Loading.jsx";
import AddCategoryPopup from "../components/child/addCategoryPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";


const Admin_kategoriler = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setloading] = useState(true);
    const [reloadPage, setReloadPage] = useState(false);
    const notificationRef = useRef(null)

    const getCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategoriesData(data);
            setloading(false)
        } catch (error) {
            console.error('Error fetching categories data:', error);
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
        getCategories();

    }, []);

    useEffect(() => {
        getCategories();

    }, [reloadPage]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = categoriesData.filter((category) =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            console.log('Category deleted:', categoryId);
            const refreshedData = await fetchCategories();
            showNotification(notificationRef, 'Kategori başarıyla silindi!');
            setCategoriesData(refreshedData);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    if (loading) {
        <LoadingComp/>
    }

    return (
        <div>
            <Admin_sidebar/>
            <div className="admin-sag-container">
                <div className="row px-4 justify-content-between align-items-center row-gap-3 admin-genel-row"
                     data-aos="fade-in">
                    <div className="col-12  alt-basliklar-admin">Kategori Listesi</div>
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="admin-search-inp col-3"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className='tumunu-gor-btn-admin col-2' onClick={togglePopup}>Kategori Ekle</button>
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
                                                    style={{width: "100px"}}
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
                                                <button className="user-sil-btn"
                                                        onClick={() => handleDelete(category.id)}>
                                                    <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30"
                                                         fill="white" strokeLinejoin="round" strokeMiterlimit="2"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                                            fillRule="nonzero"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="row col-12 justify-content-center">
                                <div className="row col-12 px-3 justify-content-between">
                                    <button className="tumunu-gor-btn-admin col-1"
                                            onClick={() => setCurrentPage(currentPage - 1)}>Geri
                                    </button>
                                    <button className="tumunu-gor-btn-admin col-1"
                                            onClick={() => setCurrentPage(currentPage + 1)}>İleri
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <AddCategoryPopup
                    popupCloser={(b) => {
                        if (b === false) ;
                        setShowPopup(b);
                    }}
                    reloadPageCat={(a) => {
                        if (a === true) {
                            setReloadPage(a)
                        }
                    }}
                />
            )}
            <NotificationCard ref={notificationRef} message=""/>

        </div>
    );
};

export default Admin_kategoriler;
