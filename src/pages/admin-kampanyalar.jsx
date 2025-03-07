import { useEffect, useState } from 'react'
import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css'
import AddOfferPopUp from "../components/child/AddOfferPopUp.jsx";
import {categoryDropdown} from "./api/kategoriapi.js";
import ProcessPopup from "../components/child/processPopup.jsx";

const Admin_kampanyalar =()=> {
    const [categories, setCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDelPopupOpen, setDelIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleDelPopup = () => {
        setDelIsPopupOpen(!isDelPopupOpen);
    };

    useEffect(() => {
            const data = categoryDropdown()
            setCategories(data)
      }, []);


    return (
      <div>
        <Admin_sidebar />
          <div className="admin-sag-container">
                 <div className="row pt-5">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 row mb-5" style={{rowGap:'30px',height:'fit-content'}}>
                                <h3 className="col-6">Kampanya Listesi</h3>
                                <div className="col-6 row justify-content-end">
                                    <button onClick={togglePopup} className='tumunu-gor-btn-admin col-6'>Kampanya Ekle</button>
                                </div>
                            </div>


                            <div className="col-12">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col">Kampanya Başlığı</th>
                                        <th scope="col">Kampanya Başlığı</th>
                                        <th scope="col">Kampanya Görseli</th>
                                        <th scope="col">İşlem</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td><img className="img-fluid w-25" src="data:image/jpeg;base64,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" /></td>
                                        <td style={{position:'relative'}}>
                                            <div style={{position:'absolute'}} className="row w-100 h-75 px-2 align-items-center justify-content-center" >
                                                <button onClick={toggleDelPopup}>Sil</button>
                                            </div>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>


                            {isPopupOpen && (
                                <AddOfferPopUp
                                    popupCloser={(b) => {
                                        if (b === false) setIsPopupOpen(b);
                                    }}
                                />
                            )}

                            {isDelPopupOpen && (
                                <ProcessPopup
                                    onClose={(b) => {
                                        if (b === false) setDelIsPopupOpen(b);
                                    }}
                                    text="Kampanya öğesini silmek istediğinize emin misiniz?"
                                    acceptedText="Silme işlemi onaylandı"
                                    type="offer_delete"
                                    id="1"
                                />
                            )}
                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
}


export default Admin_kampanyalar;