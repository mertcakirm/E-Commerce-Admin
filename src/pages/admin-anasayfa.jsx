import Admin_sidebar from '../components/admin-sidebar.jsx';
import { getCookie } from '../components/cookie/cookie.js';
import './admin-css/admin-genel.css';
import PieChart from "../components/child/chart.jsx";
import BarChart from "../components/child/scatter.jsx";
import {useEffect, useState} from "react";
import {formatLocalDate} from "../components/child/LocalDateFormat.js";

const Admin_anasayfa=()=> {
  const [time, setTime] = useState("?");
  const productsData = [
    { id: 1, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:2,small:3,large:5,xlarge:1,xsmall:2}},
    { id: 2, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:5,small:3,large:5,xlarge:1,xsmall:2}},
    { id: 3, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 4, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 5, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 6, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 7, name: "search",        Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 8, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:10,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 9, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 10, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 11, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 12, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
  ];


  const lowStockProducts = productsData.filter(product => {
    const totalStock = Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0);
    return totalStock < 20; 
  });
  const session=getCookie("SESSIONID","ID")




  console.log(session)


  useEffect(() => {
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
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
            <div className="row admin-genel-row">


              <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="row site-icerik-shadow" style={{height:'fit-content',padding:'50px 0px 100px 30px'}} >
                  <div className="col-lg-6 col-12 mb-5" >
                    <PieChart title="Genel Satış Dağılımı" type="general" />
                  </div>
                  <div className="col-lg-6 col-12">
                    <PieChart title="Aylık Satış Dağılımı" type="month" />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12 row">
                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                  <div className="tooltip-container">
                    <div className="row site-icerik-shadow" style={{ height: '200px' }}>
                      <svg
                          className="col-12"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                      >
                        <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
                      </svg>
                      <h3 className="text-center col-12 mb-3 font-weight-bold">1098</h3>
                    </div>
                    <div className="tooltip">Toplam Kullanıcı Sayısı</div>
                  </div>
                </div>

                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                  <div className="tooltip-container">
                    <div className="row align-items-center site-icerik-shadow" style={{ height: '200px' }}>
                      <p className="text-center clock">
                        {time}
                      </p>
                      <div className="date col-12 text-center">
                        {formatLocalDate(new Date(), false)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                  <div className="tooltip-container">
                    <div className="row site-icerik-shadow align-items-center justify-content-center" style={{ height: '200px', paddingTop: '30px' }}>
                      <svg
                          fill="green"
                          width="70"
                          height="70"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.5 23l-8.5-4.535v-3.953l5.4 3.122 3.1-3.406v8.772zm1-.001v-8.806l3.162 3.343 5.338-2.958v3.887l-8.5 4.534zm-10.339-10.125l-2.161-1.244 3-3.302-3-2.823 8.718-4.505 3.215 2.385 3.325-2.385 8.742 4.561-2.995 2.771 2.995 3.443-2.242 1.241v-.001l-5.903 3.27-3.348-3.541 7.416-3.962-7.922-4.372-7.923 4.372 7.422 3.937v.024l-3.297 3.622-5.203-3.008-.16-.092-.679-.393v.002z" />
                      </svg>
                      <h3 className="text-center col-12 mb-3 font-weight-bold">1098</h3>
                    </div>
                    <div className="tooltip">Toplam Ürün Sayısı</div>
                  </div>
                </div>

                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="tooltip-container">
                  <div className="row site-icerik-shadow" style={{ height: '200px' }}>

                  </div>
                  <div className="tooltip">Toplam Kullanıcı Sayısı</div>
                </div>
              </div>
              </div>




              <div className="col-lg-6 justify-content-center col-12 m-0 row">
                <div className="row site-icerik-shadow" style={{height:'fit-content'}} >
                  <div className="col-lg-12 col-12 " >
                    <BarChart title="Genel Finans Dağılımı" type="general" />
                  </div>

                </div>
              </div>


              <div className="col-12 site-icerik-shadow mt-5">
                <h3>Stoğu Azalanlar</h3>
              <div className="table-responsive scroll-table2 mt-5">
                <table className="table ">
                  <thead className="table">
                    <tr>
                      <th scope="col">Ürün Kodu</th>
                      <th scope="col">Ürün Görseli</th>
                      <th scope="col">Ürün Adı</th>
                      <th scope="col">Ürün Kategorisi</th>
                      <th scope="col">Stok Sayısı</th>
                    </tr>
                  </thead>
                  <tbody>
                  {lowStockProducts.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td><img src={product.img} alt={product.name} className="img-fluid" style={{ maxWidth: '50px' }} /></td>
                      <td>{product.name}</td>
                      <td>{product.Kategori}</td>
                      <td style={{color:'red',fontWeight:'700'}}>{Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0)}</td>
                    </tr>
                  ))}



                  </tbody>
                </table>




                </div>
                <div className="col-12 row justify-content-center mt-5"><a className='tumunu-gor-btn-admin col-6' href="/urunler">Tüm Ürünleri Gör</a></div>

                </div>


            </div>
          </div>
      </div>
    )
  }


export default Admin_anasayfa;