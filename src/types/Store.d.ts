export interface Store {
    id: number
    seller_id: string
    name: string
    phone: string
    description?: string
    state_id?: number
    city_id?: number
    created_at: string
    updated_at: string
}
