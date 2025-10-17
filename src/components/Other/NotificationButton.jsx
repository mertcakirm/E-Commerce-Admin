import React, { useState, useRef, useEffect } from "react";
import NotificationPopover from "../Popups/NotificationPopover.jsx";
import {FaBell} from "react-icons/fa";

const POPOVER_WIDTH = 240;

const NotificationButton = () => {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);

    const toggle = () => {
        if (!open && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const left = rect.left + rect.width / 2 - POPOVER_WIDTH / 2 + window.scrollX - 100;
            const top = rect.bottom + 8 + window.scrollY;
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
        <>
            <button
                ref={buttonRef}
                type="button"
                className="btn nav-top-btn "
                onClick={toggle}
            >
                <FaBell size={20} color="white" />
            </button>

            {open && <NotificationPopover ref={popoverRef} top={pos.top} left={pos.left} width={POPOVER_WIDTH} />}
        </>
    );
};

export default NotificationButton;