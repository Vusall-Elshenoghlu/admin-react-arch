import { createUseStyles } from "react-jss";

const colors = {
    primary: "#4A90E2",
    secondary: "#6C63FF",
    gray: "#7F8C8D",
    white: "#fff",
    cardBg: "rgba(255,255,255,0.9)",
    shadow: "0 4px 15px rgba(0,0,0,0.1)",
};

export const useAdminDashboardStyles = createUseStyles({
    root: {
        marginTop: "40px",
        marginLeft: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
        marginBottom: "30px",
        fontSize: "2rem",
        fontWeight: "700",
        color: colors.primary,
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "40px",
    },
    card: {
        display: "flex",
        alignItems: "center",
        background: colors.cardBg,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: colors.shadow,
        minWidth: "14rem",
        height: "8rem",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
        "& svg": {
            marginRight: "15px",
            color: colors.primary,
        },
    },
    cardCount: {
        fontSize: "2rem",
        fontWeight: 600,
        color: "#000",
    },
    cardTitle: {
        fontSize: "1rem",
        color: colors.gray,
        fontWeight: 600,
    },
    tableCard: {
        flex: 1,
        padding: "25px",
        borderRadius: "12px",
        background: colors.cardBg,
        boxShadow: colors.shadow,
        "& h4": {
            marginBottom: "20px",
            color: colors.primary,
        },
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        "& th": {
            background: colors.primary,
            color: colors.white,
            padding: "10px",
            textAlign: "left",
        },
        "& td": {
            padding: "10px",
            borderBottom: "1px solid #e0e0e0",
        },
        "& tr:hover": {
            background: "rgba(74,144,226,0.1)",
        },
    },
});
