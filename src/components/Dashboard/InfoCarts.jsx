import {useEffect, useState} from 'react';
import {formatLocalDate} from "../../Helpers/Helper.js";
import {GetProductsRequest} from "../../API/ProductApi.js";
import {GetAllUsersRequest} from "../../API/UserApi.js";
import {GetActiveOrders} from "../../API/Order.js";
import {PiUsersThreeFill} from "react-icons/pi";
import {FaBoxArchive} from "react-icons/fa6";
import {FaClipboardList} from "react-icons/fa";

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
                        <PiUsersThreeFill size={75} color="green" />
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

                        <FaBoxArchive size={65} color="green" />
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

                        <FaClipboardList size={65} color="green" />
                        <h3 className="text-center col-12 mb-3 font-weight-bold">{details.orderCount}</h3>
                        <div className="tooltip">Toplam Aktif Sipariş</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCarts;