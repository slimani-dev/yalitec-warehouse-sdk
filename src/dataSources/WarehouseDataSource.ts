import {Warehouse} from '../types/Warehouse'
import {endpoints} from "../config/server";
import DataSource from "./DataSource";

export default class WarehouseDataSource extends DataSource {

    async list() {
        return await this.fetch<Warehouse[]>(endpoints.warehouses.index);
    }
}
