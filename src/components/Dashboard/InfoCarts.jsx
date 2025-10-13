import {useEffect, useState} from 'react';
import {formatLocalDate} from "../../Helpers/Helper.js";
import {GetProductsRequest} from "../../API/ProductApi.js";
import {GetAllUsersRequest} from "../../API/UserApi.js";
import {GetActiveOrders} from "../../API/Order.js";

const InfoCarts = () => {
    const [time, setTime] = useState("?");
    const [details, setDetails] = useState({
        productCount: 0,
        userCount: 0,
        orderCount: 0
    });

    const getDetail = async () => {
        try {
            const product = await GetProductsRequest(1, 0,"");
            const user = await GetAllUsersRequest(1,0,"")
            const order = await GetActiveOrders(1,0)
            console.log(user)

            setDetails((prev) => ({
                ...prev,
                productCount: product.data.data.totalCount,
                userCount: user.data.data.totalCount,
                orderCount: order.data.totalCount
            }));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetail();
        const timer = setInterval(() => {
            const now = new Date();
            const localTime = now.toLocaleTimeString("en-US", {
                hour12: false,
            });

            const split = localTime.split(":");
            setTime(split[0] + ":" + split[1]);
        }, 1000);

        return () => clearInterval(timer);
    }, []);



    return (
        <div className="col-lg-6 col-12 d-flex flex-wrap">
            <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="tooltip-container">
                    <div
                        className="d-flex flex-column gap-2 align-items-center justify-content-center border shadow rounded-5 site-icerik-shadow"
                        style={{height: '200px'}}>
                        <svg
                            className="col-12"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="green"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/>
                        </svg>
                        <h3 className="text-center col-12 mb-3 font-weight-bold">{details.userCount}</h3>
                        <div className="tooltip">Toplam Kullanıcı Sayısı</div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="tooltip-container">
                    <div className="d-flex flex-column gap-2 align-items-center border shadow rounded-5 site-icerik-shadow pt-4"
                         style={{height: '200px'}}>
                        <p className="text-center clock">
                            {time}
                        </p>
                        <div className="date w-100 text-center">
                            {formatLocalDate(new Date(), false)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="tooltip-container">
                    <div
                        className="d-flex flex-column gap-2 site-icerik-shadow align-items-center border shadow rounded-5 justify-content-center"
                        style={{height: '200px'}}>
                        <svg
                            fill="green"
                            width="70"
                            height="70"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z"/>
                        </svg>
                        <h3 className="text-center col-12 mb-3 font-weight-bold">{details.productCount}</h3>
                        <div className="tooltip">Toplam Ürün Sayısı</div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="tooltip-container">
                    <div
                        className="d-flex flex-column gap-2 site-icerik-shadow align-items-center border shadow rounded-5 justify-content-center"
                        style={{height: '200px'}}>
                        <svg fill="green" width="70" viewBox="0 0 24 24" height="70"
                             xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                            <path
                                d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/>
                        </svg>
                        <h3 className="text-center col-12 mb-3 font-weight-bold">{details.orderCount}</h3>
                        <div className="tooltip">Toplam Aktif Sipariş</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCarts;