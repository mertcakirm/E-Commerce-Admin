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

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(0);
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
            const response = await GetAllUsersRequest(currentPage, usersPerPage,searchQuery);
            console.log(response.data.data.items)
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
    }, [currentPage, refresh]);

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
                            <table className="table table-striped table-bordered overflow-hidden">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ad Soyad</th>
                                    <th>Mail</th>
                                    <th>Aktiflik Durumu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
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
                                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z" fillRule="nonzero" /></svg>
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
                            <Pagination pageNum={currentPage} setPageNum={setCurrentPage} lastPage={lastPage}/>
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