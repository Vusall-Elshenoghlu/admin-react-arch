import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminDashboardStyles } from "./home.style";
import { ICounts, IUser } from "../users/users";
import { mockParents, mockStudents, mockSubjects, mockTeachers } from "./actions/home.service";
import {
    UserSwitchOutlined,
    TeamOutlined,
    IdcardOutlined,
    UserOutlined,
    BookOutlined
} from "@ant-design/icons";

const HomeComponent: React.FC = () => {
    const classes = useAdminDashboardStyles();
    const navigate = useNavigate();

    const [counts, setCounts] = useState<ICounts>({
        teachers: 0,
        parents: 0,
        students: 0,
        subjects: 0,
        director: 1,
    });

    const [recentTeachers, setRecentTeachers] = useState<IUser[]>([]);
    const [recentParents, setRecentParents] = useState<IUser[]>([]);
    const [recentStudents, setRecentStudents] = useState<IUser[]>([]);

    useEffect(() => {
        // Counts
        setCounts({
            teachers: mockTeachers.length,
            parents: mockParents.length,
            students: mockStudents.length,
            subjects: mockSubjects.length,
            director: 1,
        });

        // Recent items (sorted by DOB descending)
        const sortByDobDesc = (users: IUser[]) =>
            users
                .slice()
                .sort((a, b) => {
                    const aTime = a.dob ? new Date(a.dob).getTime() : 0;
                    const bTime = b.dob ? new Date(b.dob).getTime() : 0;
                    return bTime - aTime;
                });

        setRecentTeachers(sortByDobDesc(mockTeachers).slice(0, 5));
        setRecentParents(sortByDobDesc(mockParents).slice(0, 5));
        setRecentStudents(sortByDobDesc(mockStudents).slice(0, 10));
    }, []);

    const cards = [
        { title: "Müəllimlər", key: "teachers", icon: <UserSwitchOutlined style={{ fontSize: 50 }} />, path: "teachers" },
        { title: "Valideynlər", key: "parents", icon: <TeamOutlined style={{ fontSize: 50 }} />, path: "parents" },
        { title: "Direktor", key: "director", icon: <IdcardOutlined style={{ fontSize: 50 }} />, path: "director" },
        { title: "Şagirdlər", key: "students", icon: <UserOutlined style={{ fontSize: 50 }} />, path: "students" },
        { title: "Fənlər", key: "subjects", icon: <BookOutlined style={{ fontSize: 50 }} />, path: "subjects" },
    ];

    // Format DOB safely
    const formatDate = (dateStr?: string) =>
        dateStr ? new Date(dateStr).toLocaleDateString("az-AZ", { day: "2-digit", month: "long", year: "numeric" }) : "-";

    return (
        <div className={classes.root}>
            <h2 className={classes.header}>İdarə Paneli</h2>

            <div className={classes.cardContainer}>
                {cards.map((item) => (
                    <div key={item.key} className={classes.card} onClick={() => navigate(item.path)}>
                        {item.icon}
                        <div>
                            <p className={classes.cardCount}>{counts[item.key as keyof ICounts]}</p>
                            <p className={classes.cardTitle}>{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
                <div className={classes.tableCard}>
                    <h4>Son 10 Şagird</h4>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Ad Soyad</th>
                            <th>Doğum Tarixi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recentStudents.map((s, idx) => (
                            <tr key={s.id}>
                                <td>{idx + 1}</td>
                                <td>{s.firstName} {s.lastName}</td>
                                <td>{formatDate(s.dob)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={classes.tableCard}>
                    <h4>Son 5 Valideyn</h4>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Ad Soyad</th>
                            <th>Doğum Tarixi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recentParents.map((p, idx) => (
                            <tr key={p.id}>
                                <td>{idx + 1}</td>
                                <td>{p.firstName} {p.lastName}</td>
                                <td>{formatDate(p.dob)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
