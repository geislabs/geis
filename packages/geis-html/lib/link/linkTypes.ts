import { CustomType } from '@geislabs/geis-type'
import * as z from 'zod'

export interface Link {
    name: string
    href: string
}

export interface LinkType
    extends CustomType<
        'link',
        z.ZodObject<{
            name: z.ZodString
            href: z.ZodString
        }>
    > {}
