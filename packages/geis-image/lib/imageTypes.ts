import { CustomType, TypeConstructor } from '@geislabs/geis-type'
import * as z from 'zod'

export interface ImageType
    extends CustomType<
        'image',
        z.ZodPromise<
            z.ZodObject<{
                name: z.ZodString
            }>
        >
    > {}

export type ImageConstructor = TypeConstructor<ImageType>
