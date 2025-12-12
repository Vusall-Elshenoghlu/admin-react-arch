// users.query.ts
import {IUser} from "../users";
import {usersService} from "./users.service";
import {useMutation, useQuery, useQueryClient} from "react-query";

export const USERS_KEY = ["users"];

export const useUsersQuery = () =>
    useQuery({ queryKey: USERS_KEY, queryFn: usersService.getUsers });

export const useUserQuery = (id?: number) =>
    useQuery({ queryKey: ["user", id], queryFn: () => usersService.getUserById(id!), enabled: !!id });

export const useCreateOrUpdateUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (user: IUser) => usersService.createOrUpdateUser(user),
        onSuccess: () => qc.invalidateQueries(USERS_KEY)
    });
};

export const useDeleteUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => usersService.deleteUser(id),
        onSuccess: () => qc.invalidateQueries(USERS_KEY)
    });
};
