import {Argument, Command, Option} from "@commander-js/extra-typings";
import StoreDataSource from "../dataSources/StoreDatasource";

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
            const stores = await storeDataSource.all(options.sellerId, options.page)
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
        .addOption(sellerId)
        .addOption(name)
        .addOption(phone)
        .addOption(description)
        .addOption(stateId)
        .addOption(cityId)
        .action(async (options) => {

            // make sur the required options are passed
            if (!options.sellerId) {
                throw new Error('Missing sellerId')
            }
            if (!options.name) {
                throw new Error('Missing name')
            }

            if (!options.phone) {
                throw new Error('Missing phone')
            }

            console.log('Creating a store')

            const store = await storeDataSource.create({
                seller_id: options.sellerId,
                name: options.name,
                phone: options.phone,
                description: options.description,
                state_id: options.stateId,
                city_id: options.cityId
            })
            console.log('store : ', store)
        })

    const update = new Command('update')
        .description('Update an existing store')
        .addArgument(id)
        .addOption(sellerId)
        .addOption(name)
        .addOption(phone)
        .addOption(description)
        .addOption(stateId)
        .addOption(cityId)
        .action(async (id, options) => {
            console.log('Updating a store')

            const store = await storeDataSource.update(id, {
                seller_id: options.sellerId,
                name: options.name,
                phone: options.phone,
                description: options.description,
                state_id: options.stateId,
                city_id: options.cityId
            })
            console.log('store : ', store)
        })

    stores.addCommand(list)
    stores.addCommand(show)
    stores.addCommand(create)
    stores.addCommand(update)

    return stores
}
