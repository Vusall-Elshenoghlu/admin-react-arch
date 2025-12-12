export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    avatar?: string; // if no avatar, UI shows default AntD icon
    dob?: string; // ISO format "YYYY-MM-DD"
}

export interface ICounts {
    teachers: number;
    parents: number;
    students: number;
    subjects: number;
    director: number;
}