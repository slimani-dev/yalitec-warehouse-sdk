import {Command} from "@commander-js/extra-typings";
import {WarehouseDataSource, useFetch, OAuth2Token} from "../index";
import StoreDataSource from "../dataSources/StoreDataSource";
import {useWarehousesCommand} from './warehouses'
import {useStoresCommand} from "./stores";
import ProductDataSource from "../dataSources/ProductDataSource";
import {useProductsCommand} from "./products";
import loading from "loading-cli";
import 'dotenv/config'

import {clientPasswordParams, clientSettings} from '../config/auth';

const {fetch, scheduleRefresh} = useFetch({
    clientSettings,
    clientPasswordParams,
    storeTokenCallback: token => {
        console.log(token)
        // scheduleRefresh(token)
    },
    getStoredTokenCallback: () => ({
        accessToken: process.env.YALITEC_WAREHOUSE_API_CLIENT_TOKEN || "",
        expiresAt: parseInt(process.env.YALITEC_WAREHOUSE_API_CLIENT_EXPIRES_AT || "0"),
        refreshToken: process.env.YALITEC_WAREHOUSE_API_CLIENT_REFRESH_TOKEN || ""
    }),
    loader: loading({
        text: "",
        stream: process.stdout,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    })
})

const warehouseDataSource = new WarehouseDataSource(fetch)
const storeDataSource = new StoreDataSource(fetch)
const productDataSource = new ProductDataSource(fetch)


const warehouseCommand = useWarehousesCommand(warehouseDataSource)
const storeCommand = useStoresCommand(storeDataSource)
const productCommand = useProductsCommand(productDataSource, storeDataSource)

const program = new Command();

program.description('CLI to use the Warehouse api')
    .version('1.0.0')
    .addCommand(warehouseCommand)
    .addCommand(storeCommand)
    .addCommand(productCommand)

program.parse()
