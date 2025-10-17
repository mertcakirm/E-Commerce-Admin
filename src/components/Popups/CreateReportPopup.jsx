import { useState } from "react";
import { CreateReportRequest, GetReportByDates } from "../../API/Order.js";
import { toast } from "react-toastify";

const CreateReportPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
    });
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFetch = async () => {
        if (formData.startDate === null || formData.endDate === null) {
            toast.error("Tarih bilgilerini giriniz!");
            return;
        }

        try {
            setLoading(true);
            const response = await GetReportByDates(formData.startDate, formData.endDate);
            setReportData(response.data[0]);
        } catch (error) {
            console.error("Rapor alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReport = async () => {
        if (!reportData) {
            toast.error("Önce raporu getiriniz!");
            return;
        }

        try {
            await CreateReportRequest(reportData);
            toast.success("Rapor başarıyla oluşturuldu!");
            onClose(false);
        } catch (error) {
            console.error("Rapor oluşturma hatası:", error);
            toast.error("Rapor oluşturulamadı!");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content rounded-2" style={{ width: "500px" }} data-aos="zoom-in">
                <div className="model-header">
                    <h3>Rapor Oluştur</h3>
                    <button className="popup-close-btn" onClick={() => onClose(false)}>
                        &times;
                    </button>
                </div>

                <div className="d-flex flex-column align-items-center gap-1 p-3">
                    <label htmlFor="startDate" className="w-100 text-center" style={{ width: "80%" }}>
                        Başlangıç Tarihi
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="form-control"
                        style={{ width: "80%" }}
                    />

                    <label htmlFor="endDate" className="w-100 text-center mt-2" style={{ width: "80%" }}>
                        Bitiş Tarihi
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="form-control"
                        style={{ width: "80%" }}
                    />



                    {reportData && (
                        <div className="mt-3 p-2 text-center border rounded" style={{ width: "80%" }}>
                            <p><strong>Toplam Tutar:</strong> {reportData.totalAmount} ₺</p>
                            <p><strong>Satış Sayısı:</strong> {reportData.ordersCount}</p>
                        </div>
                    )}

                    <div className="d-flex justify-content-between gap-3">
                        <button className="btn btn-secondary mt-3" onClick={handleFetch} disabled={loading}>
                            {loading ? "Yükleniyor..." : "Raporu Getir"}
                        </button>

                        <button className=" tumunu-gor-btn-admin mt-3" onClick={handleCreateReport}>
                            Rapor Oluştur
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateReportPopup;