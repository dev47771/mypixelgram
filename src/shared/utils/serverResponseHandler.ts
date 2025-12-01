
import {z} from "zod";

type HandlerResult<S extends z.ZodType> =
    | {
    status: 'success'
    data: z.infer<S>
}
    | {
    status: 'fetch-error'
    error: unknown
}
    | {
    status: 'parse-error'
    error: z.ZodError
}

export function serverResponseHandler<S extends z.ZodType>(
    response: PromiseSettledResult<unknown>,
    schema: S
): HandlerResult<S> {
    if (response.status === 'rejected') {
        console.error('Fetch error:', response.reason)
        return {
            status: 'fetch-error',
            error: response.reason
        }
    }

    const parsed = schema.safeParse(response.value)
    if (!parsed.success) {
        console.error('Parse error:', parsed.error)
        return {
            status: 'parse-error',
            error: parsed.error
        }
    }

    return {
        status: 'success',
        data: parsed.data
    }
}
