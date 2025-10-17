import './css/Pagination.css'
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const Pagination = ({ pageNum, setPageNum, lastPage, pageSize, setPageSize }) => {
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNum(1); // yeni pageSize seçilince 1. sayfaya dön
    };

    return (
        <div className="row">
            <div className="col-lg-3 d-flex align-items-center justify-content-start">
                <select
                    id="pageSizeSelect"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="form-select"
                    style={{
                        width: "80px",
                        color: "black",
                        border: "1px solid #000000",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div className="my-notes-process-flex col-lg-6" style={{ height: 'fit-content' }}>
                {pageNum > 1 && (
                    <button onClick={() => setPageNum(pageNum - 1)} className="my-notes-process-see">
                        <IoIosArrowBack size={25} color="white" />
                    </button>
                )}
                <div className="my-notes-process-see text-center" style={{ width: '40px', lineHeight: '40px' }}>
                    {pageNum}
                </div>
                {(lastPage > pageNum && lastPage !== 0) && (
                    <button onClick={() => setPageNum(pageNum + 1)} className="my-notes-process-see">
                        <IoIosArrowForward size={25} color="white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;