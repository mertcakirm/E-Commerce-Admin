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
import ProcessPopup from "../components/Popups/processPopup.jsx";
import {GrUpdate} from "react-icons/gr";

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });


    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const getUser = async () => {
        setLoading(false);
        try {
            const response = await GetAllUsersRequest(currentPage, pageSize,searchQuery);
            setLastPage(response.data.data.totalPages)
            setUsersData(response.data.data.items || []);
        } catch (error) {
            console.error(error);
            toast.error("Kullanıcılar alınamadı!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [currentPage, refresh,pageSize]);

    const filteredUsers = usersData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                    <div className="col-12 alt-basliklar-admin">Kullanıcı Listesi</div>
                    <div className="col-12">
                        <div className="table-responsive overflow-hidden">
                            <input
                                type="text"
                                className="admin-search-inp mb-3"
                                placeholder="Ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <table className="table overflow-hidden  ">
                                <thead>
                                <tr className="border-0">
                                    <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>ID</th>
                                    <th className="border-0">Ad Soyad</th>
                                    <th className="border-0">Mail</th>
                                    <th className="border-0">Telefon</th>
                                    <th className="border-0">E-Posta Onayı</th>
                                    <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>Aktiflik Durumu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>#{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.acceptEmails ? "Kabul Edildi" : "Red Edildi"}</td>
                                            <td className="d-flex gap-2 align-items-center">
                                                <span>{user.isDeleted ? "Pasif " : "Aktif "}</span>
                                                <button
                                                    className="btn p-0"
                                                    onClick={() =>
                                                        toggleProcess({
                                                            text: `Bu kullanıcıyı ${user.isDeleted ? "aktif" : "pasif"} yapmak istiyor musunuz?`,
                                                            type: "toggle_user",
                                                            id: user.id
                                                        })
                                                    }
                                                >
                                                    <GrUpdate size={15} />
                                                </button>
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
                            <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage={lastPage} pageSize={pageSize} setPageSize={setPageSize} />
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
                        setProcessConfig(prev => ({ ...prev, isOpen: false }));
                        setRefresh(!refresh);
                    }}
                />
            )}
        </div>
    );
};

export default Users;