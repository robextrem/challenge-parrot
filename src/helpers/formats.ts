const moneyFormat = (num:number, currency = '', decimals = 0, prefix='$') =>{
    const decPoint='.'
    const thousandsSep=','
    const str = num.toFixed(decimals ? decimals : 0).toString().split('.')
    const parts = [] as string[]
    for (let i = str[0].length ; i > 0 ; i -= 3) {
        parts.unshift(str[0].substring(Math.max(0, i - 3), i))
    }
    str[0] = parts.join(thousandsSep ? thousandsSep : ',')
    const formattedNum = `${prefix}${str.join(decPoint ? decPoint : '.')}`
    const formattedCurrency = currency ? ` ${currency}` : ''
    return Number.isNaN(num) ? `${prefix} ...${formattedCurrency}` : `${formattedNum}${formattedCurrency}`
}

const dateFormat = (date:string) =>{
    const d = new Date(date)
    return (("0" + d.getDate()).slice(-2)) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" + `${d.getFullYear()}`.slice(-2)
}

const timeFormat = (hour:number) => (hour < 10 ? "0" + hour : hour.toString())

const timeRageFormat = (hour1, hour2) => `${hour1.replace(/^(\d{2})(\d{2})$/, "$1:$2")}-${hour2.replace(/^(\d{2})(\d{2})$/, "$1:$2")}`

const getDayOfWeekNumber = (dateStr) => {
    const dayNumber =  new Date(dateStr).getDay()
    return (dayNumber === 0)?7:dayNumber
}

export {moneyFormat, timeFormat, dateFormat, timeRageFormat, getDayOfWeekNumber}