export function tokenAlive(expiration) {
    let date = Date.now()
    expiration = new Date(expiration).getTime()
    if(date <= expiration * 1000) {
        return false
    }

    return true
}