import {useState, useEffect} from "react";
import "./css/General.css";
import {
    GetAllUsersRequest,
} from "../API/UserApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import LoadingComp from "../components/Other/Loading.jsx";
import Pagination from "../components/Other/Pagination.jsx";
import ProcessPopup from "../components/Popups/processPopup.jsx"; // ✨ EKLENDİ

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const usersPerPage = 10;

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const getUser = async () => {
        setLoading(false);
        try {
            const data = await GetAllUsersRequest(currentPage, usersPerPage);
            setUsersData(data.content || []);
        } catch (error) {
            console.error(error);
            toast.error("Kullanıcılar alınamadı!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [currentPage,refresh]);

    const filteredUsers = usersData.filter(
        (user) =>
            user.nameSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phoneNumber.includes(searchQuery)
    );

    const toggleProcess = ({text, type, id}) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
        });
    };

    if (loading) return <LoadingComp/>;

    return (
        <div>
            <div className="admin-sag-container" data-aos="fade-in">
                <div className="row admin-genel-row">
                    <div className="col-12 alt-basliklar-admin">
                        <p>Kullanıcı Listesi</p>
                        <input
                            type="text"
                            className="admin-search-inp col-3"
                            placeholder="Ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mt-5">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ad Soyad</th>
                                    <th>Telefon</th>
                                    <th>Toplam Harcama</th>
                                    <th>Toplam Sipariş</th>
                                    <th>Aktiflik Durumu</th>
                                    <th>İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nameSurname}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.totalSpent}</td>
                                            <td>{user.totalOrder}</td>
                                            <td>{user.active ? "Aktif" : "Pasif"}</td>
                                            <td>
                                                <div className="user-duzenle-row">
                                                    <button
                                                        className="user-sil-btn"
                                                        style={{background: "#000", fontWeight: "600"}}
                                                        onClick={() =>
                                                            toggleProcess({
                                                                text: `Bu kullanıcıyı ${user.active ? "pasif" : "aktif"} yapmak istiyor musunuz?`,
                                                                type: "toggle_user",
                                                                id: user.id
                                                            })
                                                        }
                                                    >
                                                        {user.active ? "Pasif Yap" : "Aktif Yap"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Kullanıcı bulunamadı.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage="5"/>
                        </div>
                    </div>
                </div>
            </div>

            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setRefresh(true)
                        setProcessConfig((prev) => ({...prev, isOpen: false}));
                    }}
                />
            )}
        </div>
    );
};

export default Users;