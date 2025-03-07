import './css/accepted.css';
import {deleteProduct} from "../../pages/api/productapi.js";

const DeletePopup = ({ type, id, onClose }) => {
    const handleDelete = async () => {

        document.querySelector(".accepted-content-popup").style.display = 'flex';
        document.querySelector(".checked-content-popup").style.display = 'none';


        switch (type) {
            case "product":
                console.log("test")
                break;
            case "category":
                console.log("test");
                break;
            case "Kampanya":
                deleteProduct(id);
                break;
            default:
                console.error("Unknown type");
                return;
        }

    };

    return (
        <div className="popup-overlay">
            <div className="popup-content checked-content-popup" >
                <p>{`${type} öğesini silmek istediğinize emin misiniz?`}</p>
                <div className="delete-popup-buttons row justify-content-between">
                    <button className="add-btn col-4" style={{background:'red',border:'none',height:'50px'}} onClick={()=>onClose(false)}><svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg></button>
                    <button className="add-btn col-4" style={{background:'green',border:'none',height:'50px'}} onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg></button>
                </div>
            </div>
            <div className="popup-content accepted-content-popup">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <div className="row w-100 p-0 m-0 justify-content-center">
                    <p className="col-12 text-center">Silme işlemi onaylandı</p>
                    <button className="mt-3 col-4 add-btn" onClick={()=>onClose(false)}>Tamam</button>

                </div>
            </div>

        </div>
    );
};

export default DeletePopup;
