import {forwardRef, useEffect, useState, useRef} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import "../Popups/css/NotificationButton.css";
import {GetAuditLogsRequest} from "../../API/AuditLogApi.js";
import LoadingComp from "../Other/Loading.jsx";

const NotificationPopover = forwardRef(({top, left, width = 240}, ref) => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const innerRef = useRef(null);

    const style = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        zIndex: 9999
    };

    const GetLogs = async (page = 1) => {
        const response = await GetAuditLogsRequest(page);
        const newItems = response.data.data.items;

        setAuditLogs(prev => {
            const existingIds = new Set(prev.map(item => item.id));
            const filteredNewItems = newItems.filter(item => !existingIds.has(item.id));
            return [...prev, ...filteredNewItems];
        });
        setLoading(false);
        setLastPage(response.data.data.totalPages);
    };

    useEffect(() => {
        GetLogs(pageNum);
    }, [pageNum]);

    useEffect(() => {
        const popoverInner = innerRef.current;
        if (!popoverInner) return;

        let isLoading = false;

        const handleScroll = () => {
            if (isLoading) return;

            const {scrollTop, scrollHeight, clientHeight} = popoverInner;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                if (pageNum < lastPage) {
                    isLoading = true;
                    setPageNum(prev => prev + 1);
                    setTimeout(() => (isLoading = false), 500);
                }
            }
        };

        popoverInner.addEventListener("scroll", handleScroll);
        return () => popoverInner.removeEventListener("scroll", handleScroll);
    }, [pageNum, lastPage]);


    return createPortal(
        <div className="custom-popover" ref={ref} style={style}>
            <div className="popover-arrow" />
            <h6 className="popover-title">Bildirimler</h6>
            <div
                className="popover-inner"
                ref={innerRef}>
                <ul className="popover-list">
                    {loading && <LoadingComp />}
                    {auditLogs && auditLogs.length > 0 ? (
                        auditLogs.map((log) => (
                            <li key={log.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <div className="d-flex flex-column">
                                    <div
                                        className="text-wrap fs-6"
                                        style={{ width: "250px", wordBreak: "break-all" }}
                                    >
                                        {log.details}
                                    </div>
                                    <div className="text-muted small">
                                        {new Date(log.createdAt).toLocaleString("tr-TR")}
                                    </div>
                                </div>
                                <button className="btn not-see-btn p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                                    </svg>
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-muted py-3">
                            Henüz bir bildirim bulunmuyor.
                        </li>
                    )}
                </ul>
            </div>
        </div>,
        document.body
    );
});

NotificationPopover.displayName = "NotificationPopover";

NotificationPopover.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number
};

export default NotificationPopover;