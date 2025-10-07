import React, { useState, useRef, useEffect } from "react";
import NotificationPopover from "../Popups/NotificationPopover.jsx";

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
                className="btn mx-3"
                onClick={toggle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"
                     viewBox="0 0 24 24">
                    <path
                        d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/>
                </svg>
            </button>

            {open && <NotificationPopover ref={popoverRef} top={pos.top} left={pos.left} width={POPOVER_WIDTH} />}
        </>
    );
};

export default NotificationButton;