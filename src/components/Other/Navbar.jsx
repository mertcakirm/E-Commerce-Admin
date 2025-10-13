import './css/Navbar.css';
import logo from '../../assets/mob_logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {deleteCookie} from "../cookie/Cookie.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NotificationButton from "./NotificationButton.jsx";

const Navbar = () => {
    const navigate = useNavigate();

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.admin-sidebar-parent');
        if (!sidebar) return;

        if (sidebar.classList.contains('w-100')) {
            sidebar.classList.remove('w-100');
            sidebar.classList.add('collapsed');
        }
        else {
            sidebar.classList.add('w-100');
            sidebar.classList.remove('collapsed');
        }
    };

    const LogOut = async () => {
        await deleteCookie("token")
        navigate('/');
    };
    const url = window.location.pathname.split("/").filter(Boolean).pop();

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="position-fixed">
            {/* NAVBAR */}
            <div className="admin-navbar">
                <div className="d-flex  w-100 justify-content-between">
                    <h3 className="navbar-title align-items-center gap-3 d-flex m-0">
                        <div>Yönetim Paneli</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                        </svg>
                        <div>{url.toUpperCase()}</div>
                    </h3>
                    <div className="d-flex-justify-content-end">
                        <NotificationButton/>
                        <button onClick={LogOut} className="navbar-logout">Çıkış Yap</button>
                    </div>

                </div>
            </div>
            {/* SIDEBAR */}
            <div className="admin-sidebar-parent" data-aos="fade-in">
                <div className='admin-sidebar-logo-part'>
                    <img src={logo} className='img-fluid logo' alt=""/>
                </div>
                <div className='admin-sidebar-links'>
                    <Link className={`admin-sidebar-link ${url === "ana-panel" ? "active-link" : ""}`} to="/ana-panel">
                        <div className="links-row align-items-center">
                            <div className={`${url === "ana-panel" ? "link-stick" : ""}`}></div>
                            <svg clipRule="evenodd" fill="white" width="40" height="40" fillRule="evenodd"
                                 strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 27 27"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z"
                                    fillRule="nonzero"/>
                            </svg>
                            <div className="admin-sidebar-link-text p-0">Ana Panel</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "urunler" ? "active-link" : ""}`} to="/urunler">
                        <div className="links-row align-items-center">
                            <div className={`${url === "urunler" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" viewBox="0 0 27 27" fill="white"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z"/>
                            </svg>
                            <div className="admin-sidebar-link-text ">Ürünler</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "aktif-siparisler" ? "active-link" : ""}`}
                          to="/aktif-siparisler">
                        <div className="links-row align-items-center">
                            <div className={`${url === "aktif-siparisler" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" viewBox="0 0 27 27" fill="white"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Aktif Siparişler</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "kategoriler" ? "active-link" : ""}`}
                          to="/kategoriler">
                        <div className="links-row align-items-center">
                            <div className={`${url === "kategoriler" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" fill="white" viewBox="0 0 24 24" clipRule="evenodd"
                                 fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z"
                                    fillRule="nonzero"/>
                            </svg>
                            <div className="admin-sidebar-link-text ">Kategoriler</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "kullanicilar" ? "active-link" : ""}`}
                          to="/kullanicilar">
                        <div className="links-row align-items-center">
                            <div className={`${url === "kullanicilar" ? "link-stick" : ""}`}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white"
                                 viewBox="0 0 27 27">
                                <path
                                    d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Kullanıcılar</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "kampanyalar" ? "active-link" : ""}`}
                          to="/kampanyalar">
                        <div className="links-row align-items-center">
                            <div className={`${url === "kampanyalar" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" fill="white" viewBox="0 0 27 27"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M12.628 21.412l5.969-5.97 1.458 3.71-12.34 4.848-4.808-12.238 9.721 9.65zm-1.276-21.412h-9.352v9.453l10.625 10.547 9.375-9.375-10.648-10.625zm4.025 9.476c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.804-.682.41-1.118.584-1.456.584-.361 0-1.083-.408-.961-1.218.052-.345.25-.697.572-1.02.652-.651 1.544-.848 2.276-.106l.744-.744c-.476-.476-1.096-.792-1.761-.792-.566 0-1.125.227-1.663.677l-.626-.627-.698.699.653.652c-.569.826-.842 2.021.076 2.938 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589 0 1.18.498 1.078 1.258-.052.386-.26.763-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.678-7.476c.938 0 1.699.761 1.699 1.699 0 .938-.761 1.699-1.699 1.699-.938 0-1.699-.761-1.699-1.699 0-.938.761-1.699 1.699-1.699z"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Kampanyalar</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "sayfalar" ? "active-link" : ""}`} to="/sayfalar">
                        <div className="links-row align-items-center">
                            <div className={`${url === "sayfalar" ? "link-stick" : ""}`}></div>
                            <svg clipRule="evenodd" fillRule="evenodd" width="40" height="40" fill="white"
                                 viewBox="0 0 27 27" strokeLinejoin="round" strokeMiterlimit="2"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m17 17.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm5-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-9-4c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                                    fillRule="nonzero"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Sayfa İçerikleri</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "soru-cevap" ? "active-link" : ""}`}
                          to="/soru-cevap">
                        <div className="links-row align-items-center">
                            <div className={`${url === "soru-cevap" ? "link-stick" : ""}`}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40"
                                 viewBox="0 0 27 27">
                                <path
                                    d="M20 9.352c0-4.852-4.75-8.352-10-8.352-5.281 0-10 3.527-10 8.352 0 1.71.615 3.39 1.705 4.695.047 1.527-.85 3.719-1.66 5.312 2.168-.391 5.252-1.258 6.648-2.115 7.698 1.877 13.307-2.842 13.307-7.892zm-14.5 1.381c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm4.5 0c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm4.5 0c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25zm7.036 1.441c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348z"/>
                            </svg>
                            <div className="admin-sidebar-link-text p-0">Soru Cevap</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "raporlar" ? "active-link" : ""}`} to="/raporlar">
                        <div className="links-row align-items-center">
                            <div className={`${url === "raporlar" ? "link-stick" : ""}`}></div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white"
                                 viewBox="0 0 27 27">
                                <path
                                    d="M17 12c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm.5 8.474v.526h-.5v-.499c-.518-.009-1.053-.132-1.5-.363l.228-.822c.478.186 1.114.383 1.612.27.574-.13.692-.721.057-1.005-.465-.217-1.889-.402-1.889-1.622 0-.681.52-1.292 1.492-1.425v-.534h.5v.509c.362.01.768.073 1.221.21l-.181.824c-.384-.135-.808-.257-1.222-.232-.744.043-.81.688-.29.958.856.402 1.972.7 1.972 1.773.001.858-.672 1.315-1.5 1.432zm1.624-10.179c1.132-.223 2.162-.626 2.876-1.197v.652c0 .499-.386.955-1.007 1.328-.581-.337-1.208-.6-1.869-.783zm-2.124-5.795c2.673 0 5-1.007 5-2.25s-2.327-2.25-5-2.25c-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.334-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.116.342c-.221-.051-.467-.099-.708-.099l-.072.001c-.482.02-.521.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.328-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.369-.053.443-.3.035-.418zm-11.093 13.009c1.445 0 2.775-.301 3.705-.768.311-.69.714-1.329 1.198-1.899-.451-1.043-2.539-1.833-4.903-1.833-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.335-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.117.342c-.22-.051-.466-.099-.707-.099l-.072.001c-.482.02-.52.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.329-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.368-.053.443-.3.035-.418zm4.003 8.531c-.919.59-2.44.978-4.096.978-2.672 0-5-1.007-5-2.25v-.652c1.146.918 3.109 1.402 5 1.402 1.236 0 2.499-.211 3.549-.611.153.394.336.773.547 1.133zm-9.096-3.772v-.651c1.146.917 3.109 1.401 5 1.401 1.039 0 2.094-.151 3.028-.435.033.469.107.926.218 1.37-.888.347-2.024.565-3.246.565-2.672 0-5-1.007-5-2.25zm0-2.5v-.652c1.146.918 3.109 1.402 5 1.402 1.127 0 2.275-.176 3.266-.509-.128.493-.21 1.002-.241 1.526-.854.298-1.903.483-3.025.483-2.672 0-5-1.007-5-2.25zm11-11v-.652c1.146.918 3.109 1.402 5 1.402 1.892 0 3.854-.484 5-1.402v.652c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25zm0 5v-.652c.713.571 1.744.974 2.876 1.197-.661.183-1.287.446-1.868.783-.622-.373-1.008-.829-1.008-1.328zm0-2.5v-.651c1.146.917 3.109 1.401 5 1.401 1.892 0 3.854-.484 5-1.401v.651c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25z"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Finansal Durum</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "mesajlar" ? "active-link" : ""}`} to="/mesajlar">
                        <div className="links-row align-items-center">
                            <div className={`${url === "mesajlar" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" fill="white" viewBox="0 0 27 27"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M24 23h-24v-13.275l2-1.455v-7.27h20v7.272l2 1.453v13.275zm-20-10.472v-9.528h16v9.527l-8 5.473-8-5.472zm14-.528h-12v-1h12v1zm0-3v1h-12v-1h12zm-7-1h-5v-3h5v3zm7 0h-6v-1h6v1zm0-2h-6v-1h6v1z"/>
                            </svg>
                            <div className="admin-sidebar-link-text  p-0">Mesajlar</div>
                        </div>
                    </Link>
                    <Link className={`admin-sidebar-link ${url === "hareketler" ? "active-link" : ""}`}
                          to="/hareketler">
                        <div className="links-row align-items-center">
                            <div className={`${url === "hareketler" ? "link-stick" : ""}`}></div>
                            <svg width="40" height="40" fill="white" viewBox="0 0 27 27"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M24 19h-1v-2.2c-1.853 4.237-6.083 7.2-11 7.2-6.623 0-12-5.377-12-12h1c0 6.071 4.929 11 11 11 4.66 0 8.647-2.904 10.249-7h-2.249v-1h4v4zm-11.036 0h-1.886c-.34-.957-.437-1.571-1.177-1.878h-.001c-.743-.308-1.251.061-2.162.494l-1.333-1.333c.427-.899.804-1.415.494-2.163-.308-.74-.926-.839-1.878-1.177v-1.886c.954-.339 1.57-.437 1.878-1.178.308-.743-.06-1.248-.494-2.162l1.333-1.333c.918.436 1.421.801 2.162.494l.001-.001c.74-.307.838-.924 1.177-1.877h1.886c.34.958.437 1.57 1.177 1.877l.001.001c.743.308 1.252-.062 2.162-.494l1.333 1.333c-.435.917-.801 1.421-.494 2.161v.001c.307.739.915.835 1.878 1.178v1.886c-.953.338-1.571.437-1.878 1.178-.308.743.06 1.249.494 2.162l-1.333 1.333c-.92-.438-1.42-.802-2.157-.496-.746.31-.844.926-1.183 1.88zm-.943-4.667c-1.289 0-2.333-1.044-2.333-2.333 0-1.289 1.044-2.334 2.333-2.334 1.289 0 2.333 1.045 2.333 2.334 0 1.289-1.044 2.333-2.333 2.333zm-8.021-5.333h-4v-4h1v2.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12h-1c0-6.071-4.929-11-11-11-4.66 0-8.647 2.904-10.249 7h2.249v1z"/>
                            </svg>
                            <div className="admin-sidebar-link-text p-0">Hareketler</div>
                        </div>
                    </Link>

                </div>
            </div>

            <div className="mobile-nav">
                <div className="d-flex  w-100 justify-content-between">
                    <button onClick={toggleSidebar} className="btn">
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="40" height="40" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                    </button>
                    <div className="d-flex-justify-content-end">
                        <NotificationButton/>
                        <button onClick={LogOut} className="navbar-logout">Çıkış Yap</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Navbar;