import { CustomType, TypeConstructor } from '@geislabs/geis-type'
import * as z from 'zod'

export interface LinkType
    extends CustomType<
        'link',
        z.ZodObject<{
            name: z.ZodString
            href: z.ZodString
        }>
    > {}

export type LinkConstructor = TypeConstructor<LinkType>
