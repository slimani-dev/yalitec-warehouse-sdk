import {Command} from "@commander-js/extra-typings";
import {WarehouseDataSource, useFetch, OAuth2Token} from "../index";
import StoreDataSource from "../dataSources/StoreDataSource";
import {useWarehousesCommand} from './warehouses'
import {useStoresCommand} from "./stores";
import ProductDataSource from "../dataSources/ProductDataSource";
import {useProductsCommand} from "./products";
import loading from "loading-cli";

const {fetch, scheduleRefresh} = useFetch(
    (token: OAuth2Token) => {
        console.log(token)
        // scheduleRefresh(token)
    },
    (): OAuth2Token | null => {
        return {
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMDM5YTVlNzFjNjc4NTVjMjEyMWY1YjVjNmNiMDhkMzFiY2MwYjY2M2ZlMjEwNTRlYTc1YjA4ZWQxZDBkMzUyYzZkZmQ4ZDE4ZDA4NTllMTUiLCJpYXQiOjE2OTY5NjMzNTMuNjM5MjYyLCJuYmYiOjE2OTY5NjMzNTMuNjM5MjY1LCJleHAiOjE3Mjg1ODU3NTMuNjMzMDI2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.P5-jqm4eQQjt91KXMq_kGMjTzt9fx_m4ZddRKCyDL2tlQJ8fH6JV9IuTfBWkLjlhi0cfwNWPhSrOu47B4WP7PxlmdbzStaiGcm1BxRS1-1rGvbGTQspSUPL-32vcAsz2F2WeKWY88Pg4S5zRtg0p2QsCJoZ1dfnBNp-GxS85Q9n3QZu6YjLAAak9D2ZVq8dmPgYFtfmcyRb_7_8HqdRdvI9jqxGMohPOXPQOrcJ1wTTaJzRVCmbfBZuKvrQYEzLt_QiIRsB0uuZbnTZEGketwJu4R4Kl9bMYLyUhgk3R7go2zLtj9r2TSck09EC6PYOvIsV28LatbyBTWJOPh1E1s7R_B1fgmIfKUMc8ACiqZYVFp5lJ73J5g982ixc1wUxyyqihqaZ1YvMlSmLaMzansBxIag4eKUZ2XWbNtGrwcSUmp21UVHTEyAycsZRJTdhu5jCAdV-9SiB-NlGltqDw3l5DRejrbGla8uILuxTTCo2Zh0ZY1SUcyrs0HIOt6nW1xPCtz2wrSCdUD6btQ6z4DNeWpxAdlbc55oqfHaAn9VdzMyjfCKCwTG-ikHAnKUJEGIINWVL5qiVLBbKU9IOEhiSakD4KYSRiY_2lIV8OwowwnvRUe8HHLpqkUiFq-Pl8qmQyt6PEXpk49VbDfsX7O1sB_2qe9L6oEGaumQ6KHbI',
            expiresAt: 1728585753823,
            refreshToken: 'def50200236bf1ac1f7dc582e4527853b9904943e68d7ea0ae2cc898628ab2ecdffb3ccb85c95797d9922282742df953cf5974cb235f56a72be0cd1e87e2c15e5ce12932a140fdebbd695d5e2abce809b7d7810790230f1e474a93bd5cd9c38b7d7cfc97777c59ff54d9af0b42546083775f0610badaaa74a4a15bb94dd25c7c4869bd38c13cd7e0ae1eb7cfd131e058e1a0d5db63475fca2532d94d19ef15973288928886527a112821d19fc584a398488a01d479f65a6b7400e9e59e0dedcb73bc09dc7a16798f25fb8f8f73d617b0ffd0e4d0f6c8db36139bf6d940d7f79f43dd2ececd7c5b9176d451b8d7f286ab9be6611156d9175c1dc941990c63332e09fd33ccbd6bd06584969a75fbe1916960b5422e88accbcc8cb0ee819e1b39c47445fa41c040a710f965697106b45f391f6ec9e76cf8166ddec257e5addbe054890b42749093f9342ad8e508e65d50c400de8c35067f9e799ea0986726ee066d84'
        }
    },
    loading({
        text: "",
        stream: process.stdout,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    })
)

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
