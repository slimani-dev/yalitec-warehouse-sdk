import 'dotenv/config'

import {ClientSettings} from "@badgateway/oauth2-client/dist/client";
import {ClientPasswordParams} from "../types/global";

export const clientSettings: ClientSettings = {
    server: process.env.YALITEC_WAREHOUSE_API_SERVER_HOSTNAME || "https://beta-api.slimani.dev",
    clientId: process.env.YALITEC_WAREHOUSE_API_CLIENT_ID || "2",
    clientSecret: process.env.YALITEC_WAREHOUSE_API_CLIENT_SECRET,
    tokenEndpoint: "/oauth/token",
};

export const clientPasswordParams: ClientPasswordParams = {
    username: process.env.YALITEC_WAREHOUSE_API_CLIENT_USERNAME || "admin",
    password: process.env.YALITEC_WAREHOUSE_API_CLIENT_PASSWORD || "password",
}
