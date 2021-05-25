import * as z from 'zod'
import { LinkConstructor } from './linkTypes'

export const Link: LinkConstructor = () => ({
    kind: 'link',
    schema: z.object({
        name: z.string(),
        href: z.string(),
    }),
})
