declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_CLIENT_ID: number
            readonly NEXT_PUBLIC_API_URL: string
        }
    }
}

export {}