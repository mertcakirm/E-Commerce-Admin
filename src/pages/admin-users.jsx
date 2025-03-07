import {useState, useEffect, useRef} from "react";
import Admin_sidebar from "../components/admin-sidebar.jsx";
import "./admin-css/admin-genel.css";
import { getAllUsers, toggleUserActivity as toggleUserActivityAPI } from "./api/userapi";
import {NotificationCard, showNotification} from "../components/notification.jsx";

const Admin_users = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const usersPerPage = 10;
  const notificationRef=useRef(null)


  const getUser = async () => {
    try {
      const data = await getAllUsers(currentPage, usersPerPage);
      setTotalPages(data.totalPages);
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
    toggleUserActivityAPI(userId)
      .then((data) => {
        if (data.ok) {
          setUsersData((prevData) =>
            prevData.map((user) =>
              user.id === userId ? { ...user, active: !user.active } : user
            )

          );
          showNotification(notificationRef, 'Kullanıcı durumu güncellendi!');

        } else {
          console.error("Failed to change user activity");
          showNotification(notificationRef, 'Hata! Kullanıcı durumu güncellenemedi!');

        }

      })
      .catch(
          (error) => {
            console.error(error)
            showNotification(notificationRef, 'Hata! Kullanıcı durumu güncellenemedi!');
          }
      );
  };

  if (loading) {
    return (
        <div
            className="d-flex justify-content-center"
            style={{ height: "100vh", alignItems: "center" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  }

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">
            <p>Kullanıcı Listesi</p>
            <input
              type="text"
              className="admin-search-inp"
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
                <div className="row col-12 px-3 justify-content-between">
                  <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
                  <button className="tumunu-gor-btn-admin col-1" onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <NotificationCard ref={notificationRef} message=""/>

    </div>
  );
};

export default Admin_users;
