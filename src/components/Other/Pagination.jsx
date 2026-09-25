import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({ pageNum, setPageNum, lastPage = 1, pageSize, setPageSize }) => {
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNum(1);
    };

    // Sayfa numaralarını modern aralıklarla (1 ... 4 5 6 ... 10) hesaplama
    const getVisiblePages = () => {
        const delta = 1;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= lastPage; i++) {
            if (i === 1 || i === lastPage || (i >= pageNum - delta && i <= pageNum + delta)) {
                range.push(i);
            }
        }

        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const navBtnStyle = (disabled) => ({
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        backgroundColor: disabled ? "#f8fafc" : "#ffffff",
        color: disabled ? "#cbd5e1" : "#475569",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        padding: 0,
    });

    return (
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 w-100 py-2">
            
            {/* SOL KISIM: Sayfa Başına Kayıt & Bilgilendirme */}
            <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>
                    Kayıt:
                </span>
                <select
                    id="pageSizeSelect"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="form-select form-select-sm"
                    style={{
                        width: "74px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#1e293b",
                        boxShadow: "none",
                        cursor: "pointer",
                        backgroundColor: "#ffffff",
                        padding: "5px 10px"
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                    / sayfa (Toplam {lastPage} sayfa)
                </span>
            </div>

            {/* SAĞ KISIM: Modern Sayfalama Butonları */}
            <div className="d-flex align-items-center gap-1.5">
                
                {/* İlk Sayfa */}
                <button
                    type="button"
                    title="İlk Sayfa"
                    disabled={pageNum <= 1}
                    onClick={() => setPageNum(1)}
                    style={navBtnStyle(pageNum <= 1)}
                    onMouseEnter={(e) => pageNum > 1 && (e.currentTarget.style.borderColor = "#2563eb", e.currentTarget.style.color = "#2563eb")}
                    onMouseLeave={(e) => pageNum > 1 && (e.currentTarget.style.borderColor = "#e2e8f0", e.currentTarget.style.color = "#475569")}
                >
                    <FiChevronsLeft size={16} />
                </button>

                {/* Önceki Sayfa */}
                <button
                    type="button"
                    title="Önceki Sayfa"
                    disabled={pageNum <= 1}
                    onClick={() => setPageNum(pageNum - 1)}
                    style={navBtnStyle(pageNum <= 1)}
                    onMouseEnter={(e) => pageNum > 1 && (e.currentTarget.style.borderColor = "#2563eb", e.currentTarget.style.color = "#2563eb")}
                    onMouseLeave={(e) => pageNum > 1 && (e.currentTarget.style.borderColor = "#e2e8f0", e.currentTarget.style.color = "#475569")}
                >
                    <FiChevronLeft size={16} />
                </button>

                {/* Sayfa Numaraları */}
                <div className="d-flex align-items-center gap-1 mx-1">
                    {getVisiblePages().map((page, index) => {
                        if (page === "...") {
                            return (
                                <span
                                    key={`dots-${index}`}
                                    style={{
                                        width: "32px",
                                        textAlign: "center",
                                        color: "#94a3b8",
                                        fontWeight: 600,
                                        fontSize: "0.85rem"
                                    }}
                                >
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === pageNum;
                        return (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setPageNum(page)}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    border: isActive ? "1px solid #2563eb" : "1px solid #e2e8f0",
                                    backgroundColor: isActive ? "#2563eb" : "#ffffff",
                                    color: isActive ? "#ffffff" : "#334155",
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: isActive ? "0 4px 12px rgba(37, 99, 235, 0.25)" : "none",
                                    transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = "#f8fafc", e.currentTarget.style.color = "#0f172a")}
                                onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = "#ffffff", e.currentTarget.style.color = "#334155")}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Sonraki Sayfa */}
                <button
                    type="button"
                    title="Sonraki Sayfa"
                    disabled={pageNum >= lastPage || lastPage === 0}
                    onClick={() => setPageNum(pageNum + 1)}
                    style={navBtnStyle(pageNum >= lastPage || lastPage === 0)}
                    onMouseEnter={(e) => pageNum < lastPage && (e.currentTarget.style.borderColor = "#2563eb", e.currentTarget.style.color = "#2563eb")}
                    onMouseLeave={(e) => pageNum < lastPage && (e.currentTarget.style.borderColor = "#e2e8f0", e.currentTarget.style.color = "#475569")}
                >
                    <FiChevronRight size={16} />
                </button>

                {/* Son Sayfa */}
                <button
                    type="button"
                    title="Son Sayfa"
                    disabled={pageNum >= lastPage || lastPage === 0}
                    onClick={() => setPageNum(lastPage)}
                    style={navBtnStyle(pageNum >= lastPage || lastPage === 0)}
                    onMouseEnter={(e) => pageNum < lastPage && (e.currentTarget.style.borderColor = "#2563eb", e.currentTarget.style.color = "#2563eb")}
                    onMouseLeave={(e) => pageNum < lastPage && (e.currentTarget.style.borderColor = "#e2e8f0", e.currentTarget.style.color = "#475569")}
                >
                    <FiChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
