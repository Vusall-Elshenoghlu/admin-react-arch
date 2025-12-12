// users.style.ts
import { createUseStyles } from "react-jss";

/*
  Simple, modern, slightly rounded, blue-accented design.
  Use with: const classes = useStyles();
*/
const useStyles = createUseStyles({
    container: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        padding: 20,
        fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
        background: "#f6f8fb",
        minHeight: 480,
        borderRadius: 12
    },
    tableWrap: {
        flex: 1,
        background: "#ffffff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 6px 16px rgba(20,40,80,0.06)"
    },
    rightPanel: {
        width: 360,
        background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
        borderRadius: 12,
        padding: 18,
        boxShadow: "0 10px 30px rgba(20,40,80,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    nameCell: {
        display: "flex",
        alignItems: "center",
        gap: 12
    },
    avatar: {
        borderRadius: "50%",
        overflow: "hidden"
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        color: "#0f3c74"
    },
    smallMuted: {
        fontSize: 12,
        color: "#6b7a90"
    },
    actionButtons: {
        display: "flex",
        gap: 8
    },
    pill: {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        background: "#e8f0ff",
        color: "#0f3c74",
        fontWeight: 600,
        fontSize: 12
    },
    inputLabel: {
        fontSize: 12,
        color: "#5a6b85",
        marginBottom: 6
    }
});

export default useStyles;
