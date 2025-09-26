import { useEffect, useState } from 'react';
import { GetCategoriesRequest } from '../API/CategoriesApi.js';
import LoadingComp from "../components/Other/Loading.jsx";
import AddCategoryPopup from "../components/Popups/AddCategoryPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const toggleProcess = ({ text, type, id }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
        });
    };

    const getCategories = async () => {
        setLoading(true);
        try {
            const data = await GetCategoriesRequest();
            setCategoriesData(data.data);
        } catch (error) {
            console.error('Error fetching categories data:', error);
            toast.error("Kategoriler alınamadı.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
        getCategories();
    }, []);

    useEffect(() => {
            getCategories();
    }, [refresh]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) return <LoadingComp />;

    return (
        <div className="admin-sag-container">
            <div className="row px-4 justify-content-between align-items-center row-gap-3 admin-genel-row" data-aos="fade-in">
                <div className="col-12 alt-basliklar-admin">Kategori Listesi</div>

                <input
                    type="text"
                    placeholder="Ara..."
                    className="admin-search-inp col-3"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <button className='tumunu-gor-btn-admin col-2' onClick={() => setShowPopup(true)}>Kategori Ekle</button>

                <div className="col-12 mt-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Kategori ID</th>
                                <th>Kategori Kapağı</th>
                                <th>Kategori Adı</th>
                                <th>İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriesData
                                .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>
                                            <img
                                                src={category.imageUrl ? `https://localhost:7050${category.imageUrl}` : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"}
                                                alt={category.name}
                                                className="img-fluid"
                                                style={{ width: "100px" }}
                                            />
                                        </td>
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="user-duzenle-row">
                                                <button
                                                    className="user-sil-btn"
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: "Bu kategoriyi silmek istediğinize emin misiniz?",
                                                            type: "category_delete",
                                                            id: category.id,
                                                        })
                                                    }
                                                >
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
                    </div>
                </div>
            </div>

            {showPopup && (
                <AddCategoryPopup
                    popupCloser={(state) => setShowPopup(state)}
                    reloadPageCat={() => setRefresh(true)}
                />
            )}

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setProcessConfig({ ...processConfig, isOpen: false })
                        setRefresh(!refresh)
                    }}
                />
            )}
        </div>
    );
};

export default Categories;