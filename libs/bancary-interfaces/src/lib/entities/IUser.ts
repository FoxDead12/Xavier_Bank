
export interface IUser {

    id: number;
    email: string;
    password: string;
    name: string;
    dataNascimento: Date;
    nacionalidade: string;

    CreateThisUser(): Promise<void>;
    ComparePassword(inputPassword: string): Promise<boolean>;
}