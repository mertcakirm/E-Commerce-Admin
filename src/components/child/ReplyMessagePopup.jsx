
const ReplyMessagePopup = ({ popupCloser,id,processReady}) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        popupCloser(false);
        processReady(true)

    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ width: "600px" }}>
                <div className="popup-header">
                    <h2>Mesaj Gönder</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>
                <div className="form-group row row-gap-4  justify-content-around align-items-center mt-4">
                    <textarea className="col-12 popup-inp" style={{height:'200px' ,resize:'none'}} placeholder="Mesaj cevabını yazınız..."></textarea>


                    <div className="row justify-content-between align-items-center">
                        <button onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">
                            Mesajı Gönder
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReplyMessagePopup;
