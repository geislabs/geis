export function extractErrors<T>(values: Array<T | Error>): Array<T> | Error {
    let results: T[] = []
    for (const value of values) {
        if (value instanceof Error) {
            return value
        }
        results.push(value)
    }
    return results
}
