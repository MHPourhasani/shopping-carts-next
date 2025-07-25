export function responseValidator(status: number | null) {
    if (!status) return false;
    return status >= 200 && status < 300;
}
