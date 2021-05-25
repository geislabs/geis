import { CustomType } from '@geislabs/geis-type'
import * as z from 'zod'

export interface File {
    name: string
}

export interface FileType
    extends CustomType<
        'file',
        z.ZodPromise<
            z.ZodObject<{
                name: z.ZodString
            }>
        >
    > {}
