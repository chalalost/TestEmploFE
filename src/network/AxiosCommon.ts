import axios, { AxiosRequestConfig } from 'axios';

const AxiosCommon = {

    async getAsync<T>(api: string, data: unknown) {
        try {
            const config: AxiosRequestConfig = { params: data };
            const result = await axios.get<T>(api, { params: config });
            return result.data;
        } catch (error: any) {
            return (error as Error).message;
        }
    },

    async postAsync<T>(api: string, data: unknown) {
        try {
            const config: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };
            const result = await axios.post<T>(api, data, config);
            return result.data;
        } catch (error) {
            return (error as Error).message;
        }
    },
};

export default AxiosCommon;