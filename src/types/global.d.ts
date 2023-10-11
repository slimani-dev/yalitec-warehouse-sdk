export interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
}

export interface ClientPasswordParams {
    username: string;
    password: string;
    scope?: string[]
}
