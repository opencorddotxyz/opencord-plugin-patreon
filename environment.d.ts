declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_APP_NAME: string
            readonly NEXT_PUBLIC_CLIENT_ID: number
            readonly NEXT_PUBLIC_API_VERSION: string
            readonly NEXT_PUBLIC_REDIRECT_URI: string
            readonly NEXT_PUBLIC_OC_APP_SITE: string
        }
    }
}

export {}