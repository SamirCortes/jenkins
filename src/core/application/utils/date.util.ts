import { format } from 'date-fns'

export function currentDate() {
    const dateCurrent = new Date()
    const isoDate = dateCurrent.toISOString()
    const dateObject = new Date(isoDate)
    const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm:ss.SSS')
    return new Date(formattedDate)
}
