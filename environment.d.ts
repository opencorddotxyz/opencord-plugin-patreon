declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly CLIENT_ID: string
            readonly API_URL: string
            readonly APP_URI: string
        }
    }
}

export {}