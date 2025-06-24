import axios from 'axios';
import service from '../service/request';

declare class AuthModel {
    static async login(loginData: object): Promise<any>;
}

export default AuthModel;