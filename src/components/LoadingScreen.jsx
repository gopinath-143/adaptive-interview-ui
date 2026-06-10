function LoadingScreen({ message }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div style={{ color: "white", textAlign: "center" }}>
                <div className="spinner-border"></div>
                <h3 className="mt-3">{message}</h3>
            </div>
        </div>
    );
}

export default LoadingScreen;