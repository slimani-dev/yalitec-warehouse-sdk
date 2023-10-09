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
    }
}

