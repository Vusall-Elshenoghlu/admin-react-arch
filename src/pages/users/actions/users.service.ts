// actions/users.service.ts
import { IUser } from "../users.d";

let mockUsers: IUser[] = [
    { id: 1, firstName: "Kamal", lastName: "Aliyev", email: "kamal@mail.com", dob: "1990-03-12" },
    { id: 2, firstName: "Lala", lastName: "Quliyeva", email: "lala@mail.com", dob: "1994-11-02" },
    { id: 3, firstName: "Murad", lastName: "Huseynov", email: "murad@mail.com", dob: "1988-07-19" }
];

export const usersService = {
    async getUsers(): Promise<IUser[]> {

        await new Promise((r) => setTimeout(r, 350));
        return [...mockUsers];
    },

    async getUserById(id: number): Promise<IUser | undefined> {
        await new Promise((r) => setTimeout(r, 200));
        return mockUsers.find(u => u.id === id);
    },

    async createOrUpdateUser(user: IUser): Promise<IUser> {
        await new Promise((r) => setTimeout(r, 300));
        if (!user.id) {
            const nextId = Math.max(0, ...mockUsers.map(u => u.id)) + 1;
            const newUser = { ...user, id: nextId };
            mockUsers = [newUser, ...mockUsers];
            return newUser;
        } else {
            mockUsers = mockUsers.map(u => u.id === user.id ? { ...u, ...user } : u);
            return mockUsers.find(u => u.id === user.id)!;
        }
    },

    async deleteUser(id: number): Promise<{ success: boolean }> {
        await new Promise((r) => setTimeout(r, 250));
        mockUsers = mockUsers.filter(u => u.id !== id);
        return { success: true };
    }
};
