import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

const LastOrdersPopup = ({popupCloser}) => {

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in" style={{width: "1200px", maxHeight: "800px"}}>
                <div className="popup-header">
                    <h2>Geçmiş Siparişler Listesi</h2>
                    <button className="popup-close-btn" onClick={() => popupCloser(false)}>
                        &times;
                    </button>
                </div>

                <table className="table m-0 p-0 mt-3 table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Sipariş Kodu</th>
                        <th scope="col">Sipariş Tutarı</th>
                        <th scope="col">Belge İndir</th>
                    </tr>
                    </thead>
                </table>

                <div style={{maxHeight: '600px', overflow: 'hidden', overflowY: 'auto'}}>
                    <table className="table m-0  table-striped">
                        <tbody>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>


                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>


                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>


                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>


                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ANW2KA5</th>
                            <td>1233331$</td>
                            <td>
                                <button className="border-0 bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                        <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default LastOrdersPopup;