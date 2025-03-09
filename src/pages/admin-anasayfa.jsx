import Admin_sidebar from '../components/admin-sidebar.jsx';
import './admin-css/admin-genel.css';
import PieChart from "../components/child/chart.jsx";
import BarChart from "../components/child/scatter.jsx";
import {useEffect, useState} from "react";
import {formatLocalDate} from "../components/child/LocalDateFormat.js";

const Admin_anasayfa=()=> {
  const [time, setTime] = useState("?");
  const productsData = [
    { id: 1, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:2,small:3,large:1,xlarge:1,xsmall:2}},
    { id: 2, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:1,small:1,large:1,xlarge:1,xsmall:1}},
    { id: 3, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 4, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 5, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 6, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 19  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 7, name: "search",        Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 8, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:5,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 9, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 10, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 11, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 12, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 13, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 14, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 15, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 16, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 17, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
    { id: 18, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:2,large:5,xlarge:1,xsmall:2}},
  ];


  const lowStockProducts = productsData
      .map(product => ({
        ...product,
        totalStock: Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0)
      }))
      .filter(product => product.totalStock < 20)
      .sort((a, b) => a.totalStock - b.totalStock);

  console.log(lowStockProducts);


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

  const GoProduct=(id)=>{
    window.location.href=`/urunler-guncelle/${id}`;
  }

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
                      <h3 className="text-center col-12 mb-3 font-weight-bold">2918</h3>
                    </div>
                    <div className="tooltip">Toplam Ürün Sayısı</div>
                  </div>
                </div>

                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                  <div className="tooltip-container">
                    <div className="row site-icerik-shadow align-items-center justify-content-center" style={{ height: '200px', paddingTop: '30px' }}>
                      <svg fill="green" width="70" viewBox="0 0 24 24" height="70" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/></svg>
                      <h3 className="text-center col-12 mb-3 font-weight-bold">102</h3>
                    </div>
                    <div className="tooltip">Toplam Aktif Sipariş</div>
                  </div>
                </div>
                </div>

                <div className="col-lg-6 justify-content-center col-12 m-0 row">
                  <div className="row site-icerik-shadow" style={{height:'fit-content'}} >
                    <div className="col-lg-12 col-12 " >
                      <BarChart title="Yıllık Finans Grafiği" type="general" />
                    </div>

                  </div>
                </div>


              <div className="col-6 site-icerik-shadow" style={{padding:'2% 2%'}}>
                <h3 className="text-center">Stoğu Azalan Ürünler</h3>
              <div className="table-responsive scroll-table2 mt-1">
                <table className="table text-center  table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Ürün Kodu</th>
                      <th scope="col">Ürün Kategorisi</th>
                      <th scope="col">Stok Sayısı</th>
                    </tr>
                  </thead>
                  <tbody>
                  {lowStockProducts.map(product => (
                    <tr onClick={()=>GoProduct(product.id)} style={{cursor:'pointer'}} key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td
                          style={{
                            color: Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0) < 10 ? 'red' : 'orange',
                            fontWeight: '700'
                          }}
                      >
                        {Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0)}
                      </td>
                    </tr>
                  ))}

                  </tbody>
                </table>
                </div>

                </div>


            </div>
            </div>
        </div>
    )
}


export default Admin_anasayfa;