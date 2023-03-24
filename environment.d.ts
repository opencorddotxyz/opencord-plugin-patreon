declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_CLIENT_ID: string
            readonly NEXT_PUBLIC_API_URL: string
            readonly NEXT_PUBLIC_APP_URI:string
        }
    }
}
