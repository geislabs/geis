import { ImageConstructor } from './imageTypes'
import * as z from 'zod'

export const Image: ImageConstructor = () => ({
    kind: 'image',
    schema: z.promise(
        z.object({
            name: z.string(),
        })
    ),
})
