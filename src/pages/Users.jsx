import { useState, useEffect, useMemo } from "react";
import "./css/General.css";
import { GetAllUsersRequest } from "../API/UserApi.js";
import { toast } from "react-toastify";
import LoadingComp from "../components/Other/Loading.jsx";
import Pagination from "../components/Other/Pagination.jsx";
import ProcessPopup from "../components/Popups/ProcessPopup.jsx";
import { 
    FiUsers, 
    FiSearch, 
    FiMail, 
    FiPhone, 
    FiCheckCircle, 
    FiXCircle, 
    FiRefreshCw, 
    FiInbox 
} from "react-icons/fi";

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [processConfig, setProcessConfig] = useState({
        isOpen: false,
        text: "",
        type: "",
        id: null,
    });

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await GetAllUsersRequest(currentPage, pageSize, searchQuery);
            const data = response?.data?.data;
            setLastPage(data?.totalPages || 1);
            setUsersData(data?.items || []);
        } catch (error) {
            console.error("Kullanıcı verisi hatası:", error);
            toast.error("Kullanıcılar alınamadı!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [currentPage, refresh, pageSize]);

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return usersData;
        const query = searchQuery.toLowerCase();
        return usersData.filter(
            (user) =>
                user.name?.toLowerCase().includes(query) ||
                user.email?.toLowerCase().includes(query) ||
                user.phoneNumber?.includes(query) ||
                user.id?.toString().includes(query)
        );
    }, [usersData, searchQuery]);

    const toggleProcess = ({ text, type, id }) => {
        setProcessConfig({
            isOpen: true,
            text,
            type,
            id,
        });
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    if (loading && usersData.length === 0) return <LoadingComp />;

    return (
        <div className="admin-sag-container">
            {/* ÜST BAŞLIK ALANI */}
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FiUsers size={24} />
                    </div>
                    <div>
                        <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.4px" }}>
                            Kullanıcı Yönetimi
                        </h4>
                        <small className="text-secondary" style={{ fontSize: "0.82rem" }}>
                            Kayıtlı kullanıcı hesapları, iletişim izinleri ve hesap erişim durumları
                        </small>
                    </div>
                </div>
            </div>

            {/* TABLO KARTI */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                    padding: "1.25rem",
                    overflow: "hidden"
                }}
            >
                {/* HIZLI ARAMA ALANI */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="position-relative" style={{ maxWidth: "320px", width: "100%" }}>
                        <FiSearch
                            size={16}
                            style={{
                                position: "absolute",
                                left: "14px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8"
                            }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="İsim, e-posta veya telefon ile ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                paddingLeft: "38px",
                                fontSize: "0.88rem",
                                border: "1px solid #cbd5e1",
                                boxShadow: "none"
                            }}
                        />
                    </div>
                </div>

                <div className="table-responsive p-0 m-0 border-0">
                    <table className="table align-middle m-0 table-hover">
                        <thead style={{ backgroundColor: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.78rem", borderBottom: "1px solid #e2e8f0" }}>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ width: "90px" }}>ID</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "220px" }}>Kullanıcı</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold" style={{ minWidth: "200px" }}>İletişim</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-center" style={{ width: "160px" }}>E-Posta İznİ</th>
                                <th className="py-3 px-3 text-secondary text-uppercase fw-semibold text-end" style={{ width: "160px" }}>Hesap Durumu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const isInactive = Boolean(user.isDeleted);
                                    const acceptsMail = Boolean(user.acceptEmails);

                                    return (
                                        <tr key={user.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.88rem" }}>
                                            {/* Kullanıcı ID */}
                                            <td className="px-3">
                                                <span
                                                    className="fw-bold"
                                                    style={{
                                                        fontFamily: "monospace",
                                                        color: "#64748b",
                                                        backgroundColor: "#f1f5f9",
                                                        padding: "3px 8px",
                                                        borderRadius: "6px",
                                                        fontSize: "0.8rem"
                                                    }}
                                                >
                                                    #{user.id}
                                                </span>
                                            </td>

                                            {/* Kullanıcı Ad Soyad & Avatar */}
                                            <td className="px-3 py-2">
                                                <div className="d-flex align-items-center gap-2.5">
                                                    <div
                                                        style={{
                                                            width: "38px",
                                                            height: "38px",
                                                            borderRadius: "10px",
                                                            backgroundColor: "#eff6ff",
                                                            color: "#2563eb",
                                                            fontWeight: 700,
                                                            fontSize: "0.82rem",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0,
                                                            border: "1px solid #dbeafe"
                                                        }}
                                                    >
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <span className="fw-semibold text-dark d-block">
                                                            {user.name || "İsimsiz Kullanıcı"}
                                                        </span>
                                                        <small className="text-secondary" style={{ fontSize: "0.76rem" }}>
                                                            Kayıtlı Müşteri
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Mail & Telefon */}
                                            <td className="px-3">
                                                <div className="d-flex flex-column gap-1">
                                                    <div className="d-flex align-items-center gap-1.5 text-secondary" style={{ fontSize: "0.82rem" }}>
                                                        <FiMail size={13} className="text-muted flex-shrink-0" />
                                                        <span className="text-truncate" style={{ maxWidth: "190px" }} title={user.email}>
                                                            {user.email || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1.5 text-secondary" style={{ fontSize: "0.82rem" }}>
                                                        <FiPhone size={13} className="text-muted flex-shrink-0" />
                                                        <span>{user.phoneNumber || "-"}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* E-Posta Onayı Rozeti */}
                                            <td className="px-3 text-center">
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                        backgroundColor: acceptsMail ? "#ecfdf5" : "#f8fafc",
                                                        color: acceptsMail ? "#059669" : "#64748b",
                                                        border: `1px solid ${acceptsMail ? "#a7f3d0" : "#e2e8f0"}`,
                                                        borderRadius: "999px",
                                                        padding: "3px 10px",
                                                        fontSize: "0.74rem",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {acceptsMail ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                                                    {acceptsMail ? "Kabul Edildi" : "Onaysız"}
                                                </span>
                                            </td>

                                            {/* Aktiflik Durumu & Güncelleme Butonu */}
                                            <td className="px-3 text-end">
                                                <div className="d-inline-flex align-items-center gap-2">
                                                    <span
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "4px",
                                                            backgroundColor: isInactive ? "#fef2f2" : "#ecfdf5",
                                                            color: isInactive ? "#dc2626" : "#059669",
                                                            border: `1px solid ${isInactive ? "#fecaca" : "#a7f3d0"}`,
                                                            borderRadius: "999px",
                                                            padding: "3px 10px",
                                                            fontSize: "0.74rem",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {isInactive ? <FiXCircle size={12} /> : <FiCheckCircle size={12} />}
                                                        {isInactive ? "Pasif" : "Aktif"}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        title="Durumu Değiştir"
                                                        onClick={() =>
                                                            toggleProcess({
                                                                text: `"${user.name || 'Bu kullanıcı'}" hesabını ${isInactive ? "aktif" : "pasif"} duruma getirmek istiyor musunuz?`,
                                                                type: "toggle_user",
                                                                id: user.id
                                                            })
                                                        }
                                                        style={{
                                                            backgroundColor: "#f8fafc",
                                                            border: "1px solid #e2e8f0",
                                                            color: "#64748b",
                                                            borderRadius: "8px",
                                                            width: "30px",
                                                            height: "30px",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                            transition: "all 0.15s ease"
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#eff6ff";
                                                            e.currentTarget.style.color = "#2563eb";
                                                            e.currentTarget.style.borderColor = "#bfdbfe";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#f8fafc";
                                                            e.currentTarget.style.color = "#64748b";
                                                            e.currentTarget.style.borderColor = "#e2e8f0";
                                                        }}
                                                    >
                                                        <FiRefreshCw size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <FiInbox size={32} className="text-muted mb-2" />
                                            <span>{searchQuery ? "Arama kriterine uygun kullanıcı bulunamadı." : "Kayıtlı kullanıcı bulunmuyor."}</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SAYFALAMA */}
                {filteredUsers.length > 0 && (
                    <div className="pt-3 border-top mt-3">
                        <Pagination
                            pageNum={currentPage}
                            setPageNum={setCurrentPage}
                            lastPage={lastPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                    </div>
                )}
            </div>

            {/* ONAY POPUP */}
            {processConfig.isOpen && (
                <ProcessPopup
                    text={processConfig.text}
                    type={processConfig.type}
                    id={processConfig.id}
                    onClose={() => {
                        setProcessConfig((prev) => ({ ...prev, isOpen: false }));
                        setRefresh((prev) => !prev);
                    }}
                />
            )}
        </div>
    );
};

export default Users;
