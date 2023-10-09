import {Store as StoreType} from '../types/Store'
import {endpoints} from "../config/server";
import {Response} from "../types/Response";

export default class StoreDatasource {
    private readonly fetch: <T>(endpoint: string) => Promise<Response<T>>;

    constructor(fetch: <T>(endpoint: string) => Promise<Response<T>>) {
        this.fetch = fetch;
    }

    async all(seller_id?: string, page?: number) {


        let endpoint = endpoints.stores.index;
        let urlSearchParams = new URLSearchParams();

        if (seller_id) {
            urlSearchParams.append('seller_id', seller_id)
        }

        if (page) {
            urlSearchParams.append('page', page.toString())
        }

        if (urlSearchParams.size) {
            endpoint += '?' + urlSearchParams;
        }

        console.log('endpoint', endpoint)

        return await this.fetch<StoreType>(endpoint);
    }
}
