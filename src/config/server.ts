import 'dotenv/config'

const hostname = process.env.YALITEC_WAREHOUSE_API_SERVER_HOSTNAME || "https://beta-api.slimani.dev"

export const endpoints = {
    warehouses: {
        index: `${hostname}/api/warehouses`
    },
    stores: {
        index: `${hostname}/api/stores`,
        show: (id: number) => `${hostname}/api/stores/${id}`,
        create: `${hostname}/api/stores`,
        update: (id: number) => `${hostname}/api/stores/${id}`
    },
    products: {
        index: `${hostname}/api/products`,
        show: (sku: string) => `${hostname}/api/products/${sku}`,
        create: `${hostname}/api/products`,
        update: (sku: string) => `${hostname}/api/products/${sku}`
    }
}

