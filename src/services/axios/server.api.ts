import axios, { type AxiosInstance } from "axios";
import type { Any } from "../../types/types";

export interface ApiRequest {
    endpoint: string;
    body?: Any;
    params?: string;
}

export class ServerAPI {
    private static instance: ServerAPI;
    private axiosInstance: AxiosInstance;
    //   private base_url = process.env.REACT_APP_API_URL;
    private base_url = 'https://dummyjson.com'; // Replace with your actual API URL

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.base_url,
            headers: {
                'Content-Type': 'application/json',
                // Add any other default headers here
            },
        });

        this.axiosInstance.interceptors.request.use(
            (config: Any) => {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error: Any) => {
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ServerAPI {
        if (!ServerAPI.instance) {
            ServerAPI.instance = new ServerAPI();
        }
        return ServerAPI.instance;
    }

    /**
     * Get 
     * Post
     * Put
     * Delete
     */

    public post<T>(request: ApiRequest): Promise<T> {
        // Implementation for POST request
        const endpointUrl = `${this.base_url}${request.endpoint}`;
        return new Promise((resolve, reject) => {
            this.axiosInstance.post<T>(`${endpointUrl}`, request.body)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }

    public get<T>(request: Omit<ApiRequest, "body">): Promise<T> {
        // Implementation for GET request
        const endpointUrl = `${this.base_url}${request.endpoint}`;
        console.log("Endpoint URL:", endpointUrl);
        return new Promise((resolve, reject) => {
            this.axiosInstance.get<T>(`${endpointUrl}`, { params: request.params })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }

    public put<T>(request: ApiRequest): Promise<T> {
        // Implementation for PUT request
        const endpointUrl = `${this.base_url}${request.endpoint}/${request.params}`;
        return new Promise((resolve, reject) => {
            this.axiosInstance.put<T>(`${endpointUrl}`, request.body)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }

    public delete<T>(request: ApiRequest): Promise<T> {
        // Implementation for DELETE request
        const endpointUrl = `${this.base_url}${request.endpoint}/${request.params ? `/${request.params}` : ''}`;
        return new Promise((resolve, reject) => {
            this.axiosInstance.delete<T>(`${endpointUrl}`, { data: request.body })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
}

export const server = ServerAPI.getInstance();