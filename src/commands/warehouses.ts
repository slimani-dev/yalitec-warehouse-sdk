import {Command} from "@commander-js/extra-typings";
import WarehouseDataSource from "../dataSources/WarehouseDataSource";

export const useWarehousesCommand = (warehouseDataSource: WarehouseDataSource) => {
    const warehouses = new Command('warehouses')
        .description('Manage the Warehouses')

    const list = new Command('list')
        .action(async (list, options) => {
            console.log('Getting a list of warehouses')
            const warehouses = await warehouseDataSource.list()
            console.log('warehouses : ', warehouses)
        });

    warehouses.addCommand(list)

    return warehouses
}
