export interface CreateRequestAttrs {
    url: string
    headers?: object
    method?: string
    body?: string
}

// export type StringRequestAttrs = string

export type AnyRequestAttrs = CreateRequestAttrs
