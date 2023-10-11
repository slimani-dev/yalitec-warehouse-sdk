import {Argument, Command, Option} from "@commander-js/extra-typings";
import StoreDataSource from "../dataSources/StoreDataSource";
import {input} from "@inquirer/prompts";
import {Store, StoreCreateInput, StoreUpdateInput} from "../types/Store";
import {Response} from "../types/Response";

const page = new Option('-p, --page <page>', 'show specific page').argParser(parseInt);
/**
 * seller_id: string
 * name: string
 * phone: string
 * description?: string
 * state_id?: number
 * city_id?: number
 */

const sellerId = new Option('-s, --sellerId <sellerId>', 'The Seller Id Of the Store')
const name = new Option('-n, --name <name>', 'The name of the store')
const phone = new Option('-p, --phone <phone>', 'The phone of the store')
const description = new Option('-d, --description <description>', 'The description of the store')
const stateId = new Option('-s, --stateId <stateId>', 'The state id of the store').argParser(parseInt)
const cityId = new Option('-c, --cityId <cityId>', 'The city id of the store').argParser(parseInt)

const id = new Argument('<id>', 'id of the store').argParser(parseInt)

export const useStoresCommand = (storeDataSource: StoreDataSource) => {
    const stores = new Command('stores')
        .description('Manage the Stores')

    const list = new Command('list')
        .addOption(page)
        .addOption(sellerId)
        .action(async (options) => {
            console.log('Getting a list of stores')
            const stores = await storeDataSource.list(options.sellerId, options.page)
            console.log('stores : ', stores)
        });

    const show = new Command('show')
        .addArgument(id)
        .action(async (id) => {
            console.log('Getting a specific store')
            const store = await storeDataSource.find(id)
            console.log('store : ', store)
        })

    const create = new Command('create')
        .description('Create a new store')
        .action(async (options) => {


            let storeCreateInput: StoreCreateInput = {
                seller_id: await input({message: 'Seller id :', validate: value => !!value}),
                name: await input({message: 'Name :', validate: value => !!value}),
                phone: await input({message: 'Phone :', validate: value => !!value}),
                description: await input({message: 'Description (optional):'}),
            };

            console.log('Creating a store')
            const store = await storeDataSource.create(storeCreateInput)
            console.log('store : ', store)
        })

    const update = new Command('update')
        .description('Update an existing store')
        .addArgument(id)
        .action(async (id, options) => {
            let store: Response<Store> | null = null;

            try {
                store = await storeDataSource.find(id);
            } catch (e) {
                console.log('Store not found ⛔, try again')
            }

            while ((!store?.data)) {
                const store_id = await input({message: 'Store id :', validate: value => /^-?\d+$/.test(value)})
                try {
                    store = await storeDataSource.find(parseInt(store_id))
                } catch (e) {
                    console.log('Store not found ⛔, try again')
                }

            }

            console.log('Store Found, store name : ', store.data.name)

            let storeUpdateInput: StoreUpdateInput = {
                seller_id: await input({
                    message: 'Seller id :',
                    default: store.data.seller_id,
                    validate: value => !!value
                }),
                name: await input({
                    message: 'Name :',
                    default: store.data.name,
                    validate: value => !!value
                }),
                phone: await input({
                    message: 'Phone :',
                    default: store.data.phone,
                    validate: value => !!value
                }),
                description: await input({
                    message: 'Description (optional):',
                    default: store.data.description
                }),
            }

            console.log('Updating a store')

            store = await storeDataSource.update(store.data.id, storeUpdateInput)
            console.log('store : ', store)
        })

    stores.addCommand(list)
    stores.addCommand(show)
    stores.addCommand(create)
    stores.addCommand(update)

    return stores
}
