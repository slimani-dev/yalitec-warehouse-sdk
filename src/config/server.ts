import 'dotenv/config'

const hostname = process.env.YALITEC_WAREHOUSE_API_SERVER_HOSTNAME || "https://beta-api.slimani.dev"

export const endpoints = {
    warehouses: {
        index: `${hostname}/api/warehouses`
    },
    stores: {
        index: `${hostname}/api/stores`,
        create: `${hostname}/api/stores`,
        show: (id: number) => `${hostname}/api/stores/${id}`,
        update: (id: number) => `${hostname}/api/stores/${id}`
    },
    products: {
        index: `${hostname}/api/products`,
        create: `${hostname}/api/products`,
        show: (sku: string) => `${hostname}/api/products/${sku}`,
        update: (sku: string) => `${hostname}/api/products/${sku}`
    },
    inbounds: {
        index: `${hostname}/api/inbounds`,
        create: `${hostname}/api/inbounds`,
        show: (number: string) => `${hostname}/api/inbounds/${number}`,
        update: (number: string) => `${hostname}/api/inbounds/${number}`,
        delete: (number: string) => `${hostname}/api/inbounds/${number}`
    }
}

