export interface CreateRequestAttrs {
    url: string
    method?: string
}

export type StringRequestAttrs = string

export type AnyRequestAttrs = CreateRequestAttrs | StringRequestAttrs
