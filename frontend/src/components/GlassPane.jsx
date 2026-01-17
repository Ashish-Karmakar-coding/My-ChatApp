import React from 'react';

const GlassPane = ({ children, className = "" }) => {
    return (
        <div className={`backdrop-blur-xl bg-gray-900/40 border border-white/10 rounded-2xl shadow-2xl ${className}`}>
            {children}
        </div>
    );
};

export default GlassPane;
