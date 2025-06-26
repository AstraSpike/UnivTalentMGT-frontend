import axios from 'axios';
import service from '../service/request';

declare class AuthModel {
    static async login(loginData: object): Promise<any>;
    static async register(registerData: object): Promise<any>;
    static async sendVerificationCode(email: string): Promise<any>;
    static async verifyVerificationCode(email: string, code: string): Promise<any>;
    static async resetPassword(email: string, code: string, newPassword: string): Promise<any>;
}

export default AuthModel;