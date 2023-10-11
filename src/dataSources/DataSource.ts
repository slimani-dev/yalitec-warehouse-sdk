import {FetchOptions} from "../types/global";
import {Response} from "../types/Response";

export default class DataSource {
    protected readonly fetch: <T>(endpoint: string, options?: FetchOptions) => Promise<Response<T>>;

    constructor(fetch: <T>(endpoint: string, options?: FetchOptions) => Promise<Response<T>>) {
        this.fetch = fetch;
    }
}
