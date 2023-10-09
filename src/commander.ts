import {Argument, Command, Option} from "@commander-js/extra-typings";
import {WarehouseDataSource, useFetch, OAuth2Token} from "./index";
import StoreDatasource from "./dataSources/StoreDatasource";

const program = new Command();

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

// commune arguments
const list = new Argument('list', 'List the Resources').argOptional();

// commune options
const page = new Option('-p, --page <page>', 'show specific page')
    .argParser(parseInt);


program
    .description('CLI to use the Warehouse api')
    .version('1.0.0')

program.command('warehouses')
    .description('Manage the Warehouses')
    .addArgument(list)
    .action(async (list, options) => {
        if (list) {
            console.log('Getting a list of warehouses')
            const warehouses = await warehouseDataSource.all()
            console.log('warehouses : ', warehouses)
        }
    });

program.command('stores')
    .description('Manage the Stores')
    .addArgument(list)
    .option('--seller-id <seller_id>', 'filter using seller id')
    .addOption(page)
    .action(async (list, options) => {
        if (list) {
            console.log('Getting a list of stores')
            const stores = await storeDatasource.all(options.sellerId, options.page)
            console.log('stores : ', stores)
        }
    });

program.parse()
