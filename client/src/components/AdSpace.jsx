import React, { useEffect } from 'react';

const AdSpace = ({ format = 'auto', slot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="my-4 text-center">
            <span className="text-muted small d-block mb-1">Advertisement</span>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual Publisher ID
                data-ad-slot={slot || "1234567890"} // Replace with actual Slot ID
                data-ad-format={format}
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdSpace;
