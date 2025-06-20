import Cookies from 'js-cookie'
import { TOKEN } from '../constants'

export function getRequestOptions() {
    const cookieToken = Cookies.get('token')
    const token = cookieToken || TOKEN

    if (!token) {
        return undefined
    }

    return {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
}