import './css/Pagination.css'

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
                        <svg
                            fill="white"
                            width="34"
                            height="36"
                            clipRule="evenodd"
                            fillRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
                        </svg>
                    </button>
                )}
                <div className="my-notes-process-see text-center" style={{ width: '40px', lineHeight: '40px' }}>
                    {pageNum}
                </div>
                {(lastPage > pageNum && lastPage !== 0) && (
                    <button onClick={() => setPageNum(pageNum + 1)} className="my-notes-process-see">
                        <svg
                            fill="white"
                            width="34"
                            height="36"
                            clipRule="evenodd"
                            fillRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;