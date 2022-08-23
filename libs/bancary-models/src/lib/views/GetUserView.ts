import { IBankAccount } from "@bancary-account/bancary-interfaces";

export interface GetUserView {

    name: string;
    email: string;
    bank: Partial<IBankAccount>;
}