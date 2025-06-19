import {useState, useEffect} from "react";
import "./css/General.css";
import {getAllUsers, toggleUserActivity as toggleUserActivityAPI} from "../API/UserApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
import LoadingComp from "../components/other/Loading.jsx";
import Pagination from "../components/other/Pagination.jsx";

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const usersPerPage = 10;

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const getUser = async () => {
        try {
            const data = await getAllUsers(currentPage, usersPerPage);
            setUsersData(data.content || []);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();

    }, [currentPage]);

    const filteredUsers = usersData.filter(
        (user) =>
            user.nameSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phoneNumber.includes(searchQuery)
    );

    const toggleUserActivity = (userId) => {
        try {
            toggleUserActivityAPI(userId)
                .then((data) => {
                    if (data.ok) {
                        setUsersData((prevData) =>
                            prevData.map((user) =>
                                user.id === userId ? {...user, active: !user.active} : user
                            )
                        );
                        toast.success("Kullanıcı durumu başarıyla değiştirildi!")
                    } else {
                        console.error("Failed to change user activity");
                        toast.error("Kullanıcı durumu değiştirilemedi lütfen daha sonra tekrar deneyin!")

                    }

                })
                .catch(
                    (error) => {
                        console.error(error)
                        toast.error("Kullanıcı durumu değiştirilemedi lütfen daha sonra tekrar deneyin!")
                    }
                );
        }catch (error) {
            console.error(error);
            toast.error("Kullanıcı durumu değiştirilemedi lütfen daha sonra tekrar deneyin!")
        }

    };

    if (loading) {
        <LoadingComp />
    }

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
                                    <th scope="col">ID</th>
                                    <th scope="col">Ad Soyad</th>
                                    <th scope="col">Telefon</th>
                                    <th scope="col">Toplam Harcama</th>
                                    <th scope="col">Toplam Sipariş</th>
                                    <th scope="col">Aktiflik Durumu</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <th scope="row">{user.id}</th>
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
                                                        onClick={() => toggleUserActivity(user.id)}
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

        </div>
    );
};

export default Users;
