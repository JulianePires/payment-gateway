export type AccountResponse = {
    id: string
    name: string
    email: string
    balance: number
    api_key: string
    created_at: string
    updated_at: string
}

export type Account = Omit<AccountResponse, "created_at" | "updated_at" | "api_key"> & {
    apiKey: string
}
