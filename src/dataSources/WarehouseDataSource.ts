import {Warehouse as WarehouseType} from '../types/Warehouse'
import {endpoints} from "../config/server";
import {Response} from "../types/Response";

export default class WarehouseDataSource {
    private readonly fetch: <T>(endpoint: string) => Promise<Response<T>>;

    constructor(fetch: <T>(endpoint: string) => Promise<Response<T>>) {
        this.fetch = fetch;
    }

    async all() {
        return await this.fetch<WarehouseType>(endpoints.warehouses.index);
    }
}
