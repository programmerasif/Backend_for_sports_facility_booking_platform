
export type TRole = 'admin' | 'user'
export interface TUser {
    name: string;
    email: string;
    password: string; 
    phone: string;
    role: TRole;
    address: string;
    isDeleted: boolean
}