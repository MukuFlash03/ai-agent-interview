'use client'

import ScaleLoader from "react-spinners/ScaleLoader";

const CustomButton = ({ label, onClick, isLoading, disabled }: { label: string; onClick: () => void; isLoading?: boolean; disabled: boolean }) => {
    const opacity = disabled ? 0.75 : 1;
    const cursor = disabled ? "not-allowed" : "pointer";

    const Contents = isLoading ? (
        <ScaleLoader
            color="#000"
            height={10}
            width={2.5}
            margin={0.5}
            loading={true}
        />
    ) : (
        <p style={{ margin: 0, padding: 0 }}>{label}</p>
    );

    return (
        <button
            type="submit"
            style={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "16px",
                outline: "none",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                opacity,
                cursor,
            }}
        >
            {Contents}
        </button>
    );
};

export default CustomButton;
