import React, { useState, useRef, useEffect } from "react";
import NotificationPopover from "../Popups/NotificationPopover.jsx";
import { FiBell } from "react-icons/fi";

const POPOVER_WIDTH = 340;

const NotificationButton = () => {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);

    const toggle = () => {
        if (!open && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Butonun sağ kenarından 12px boşluk ve dikey hiza
            const left = rect.right + 12 + window.scrollX;
            const top = rect.top + window.scrollY;
            setPos({ top, left });
        }
        setOpen(!open);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (buttonRef.current && buttonRef.current.contains(e.target)) return;
            if (popoverRef.current && popoverRef.current.contains(e.target)) return;
            setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggle}
                style={{
                    backgroundColor: open ? "#1e293b" : "#334155",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
                onMouseLeave={(e) => !open && (e.currentTarget.style.backgroundColor = "#334155")}
            >
                <FiBell size={18} />
            </button>

            {open && (
                <NotificationPopover
                    ref={popoverRef}
                    top={pos.top}
                    left={pos.left}
                    width={POPOVER_WIDTH}
                />
            )}
        </div>
    );
};

export default NotificationButton;
