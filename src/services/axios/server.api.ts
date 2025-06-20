import axios, { type AxiosInstance } from "axios";
import type { Any } from "../../types/types";
import { AuthRepository } from "@repositories";
// import { useNavigate } from "react-router-dom";

export interface ApiRequest {
    endpoint: string;
    body?: Any;
    params?: Any;
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

        this.axiosInstance.interceptors.response.use(
            (response: Any) => response,
            async (error: Any) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                    const refreshToken = localStorage.getItem('refreshToken');

                    if (refreshToken) {
                        try {
                            const newTokens = await new AuthRepository().requestNewToken(refreshToken);
                            localStorage.setItem('accessToken', newTokens.accessToken);
                            localStorage.setItem('refreshToken', newTokens.refreshToken);
                            // Retry the original request with the new access token
                            error.config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
                            console.log("retrying request with new access token");
                            return this.axiosInstance(error.config);
                        }
                        catch {
                            localStorage.removeItem('refreshToken');
                            // Redirect to login page
                            window.location.href = '/login';
                        }

                    }
                }
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
                .catch(error => { reject(error) });
        });

    }

    public get<T>(request: Omit<ApiRequest, "body">): Promise<T> {
        // Implementation for GET request
        const endpointUrl = `${this.base_url}${request.endpoint}`;
        return new Promise((resolve, reject) => {
            this.axiosInstance.get<T>(`${endpointUrl}`, { params: request.params })
                .then(response => resolve(response.data))
                .catch(error => {

                    console.log("Error in GET request:", error);
                    reject(error)
                });
        });
    }

    public put<T>(request: ApiRequest): Promise<T> {
        // Implementation for PUT request
        const endpointUrl = `${this.base_url}${request.endpoint}`;
        return new Promise((resolve, reject) => {
            this.axiosInstance.put<T>(endpointUrl, request.body)
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