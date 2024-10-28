import React from 'react';
import './css/NotificationCard.css';

const NotificationCard = React.forwardRef(({ message }, ref) => {
    return (
        <div className="notification-card" ref={ref}>
            {message}
        </div>
    );
});

const showNotification = (ref, message) => {
    if (ref.current) {
        ref.current.textContent = message;

        ref.current.classList.remove('fade-in', 'fade-out');

        ref.current.classList.add('fade-in');

        setTimeout(() => {
            ref.current.classList.remove('fade-in');
            ref.current.classList.add('fade-out');
        }, 3000);

        setTimeout(() => {
            ref.current.classList.remove('fade-out');
            ref.current.textContent = '';
        }, 3500);
    }
};

export { NotificationCard, showNotification };
