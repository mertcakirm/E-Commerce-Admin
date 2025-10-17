import {useEffect, useState} from 'react';
import {GetCategoriesRequest} from '../API/CategoriesApi.js';
import LoadingComp from "../components/Other/Loading.jsx";
import AddCategoryPopup from "../components/Popups/AddCategoryPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const toggleProcess = ({text, type, id}) => {
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
        getCategories();
    }, []);

    useEffect(() => {
        getCategories();
    }, [refresh]);

    if (loading) return <LoadingComp/>;

    return (
        <div className="admin-sag-container">
            <div className="row px-4 justify-content-between align-items-center row-gap-3 admin-genel-row"
                 data-aos="fade-in">
                <div className="d-flex justify-content-between">
                    <div className="alt-basliklar-admin">Kategori Listesi</div>

                    <button className='tumunu-gor-btn-admin' onClick={() => setShowPopup(true)}>Kategori Ekle</button>
                </div>


                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                            <tr className="border-0">
                                <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Kategori
                                    ID
                                </th>
                                <th className="border-0">Kategori Kapağı</th>
                                <th className="border-0">Kategori Adı</th>
                                <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriesData && categoriesData.length > 0 ? (
                                categoriesData.map(category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>
                                            <img
                                                src={
                                                    category.imageUrl
                                                        ? `https://localhost:7050${category.imageUrl}`
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                alt={category.name}
                                                className="img-fluid"
                                                style={{width: "100px"}}
                                            />
                                        </td>
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="duzenle-row">
                                                <button
                                                    className="delete-btn rounded-2"
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: "Bu kategoriyi silmek istediğinize emin misiniz?",
                                                            type: "category_delete",
                                                            id: category.id,
                                                        })
                                                    }
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-3">
                                        Kategori bulunamadı.
                                    </td>
                                </tr>
                            )}
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
                        setProcessConfig({...processConfig, isOpen: false})
                        setRefresh(!refresh)
                    }}
                />
            )}
        </div>
    );
};

export default Categories;