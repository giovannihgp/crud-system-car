export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
};

export interface Senha {
    current_password: string;
    password: string;
    password_confirmation: string;
};