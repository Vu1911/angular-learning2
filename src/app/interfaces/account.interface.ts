export interface IAccount {
    id: number,
    username: string,
    email: string,
    password: string,
    dob: Date,
    status: string,
    role: string
}

export enum Role {
    ADMIN = "Admin",
    USER = "User"
}

export enum AccountStatus {
    ACTIVATED = "Activated",
    DEACTIVATED = "Deactivated"
}