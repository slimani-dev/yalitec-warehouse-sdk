import {Command} from "@commander-js/extra-typings";
import {WarehouseDataSource, useFetch, OAuth2Token} from "../index";
import StoreDatasource from "../dataSources/StoreDatasource";
import {useWarehousesCommand} from './warehouses'
import {useStoresCommand} from "./stores";

const {fetch, scheduleRefresh} = useFetch(
    (token: OAuth2Token) => {
        // console.log(token)
        // scheduleRefresh(token)
    },
    (): OAuth2Token | null => {
        return null
    }
)

const warehouseDataSource = new WarehouseDataSource(fetch)
const storeDatasource = new StoreDatasource(fetch)


const warehouseCommand = useWarehousesCommand(warehouseDataSource)
const storeCommand = useStoresCommand(storeDatasource)

const program = new Command();

program.description('CLI to use the Warehouse api')
    .version('1.0.0')
    .addCommand(warehouseCommand)
    .addCommand(storeCommand);

program.parse()
