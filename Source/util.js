export const timeAgo = (time) => {
    var n = Date.now()
    var diff = parseInt(n) / 1000 - parseInt(time) / 1000
    var d = new Date(parseInt(time))
    switch (true) {
        case Math.floor(diff / 3600) <= 24:
            // return `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`
            return {
                time: parseInt(time) / 1000,
                state: 'present'
            }
            break
        case Math.floor(diff / 3600) > 24:
            // return `${d.getDay()} - ${d.getMonth() + 1} - ${d.getFullYear()}`
            return {
                time: parseInt(time) / 1000,
                state: 'last'
            }
            break;

    }
}


export const severUrl = 'http://192.168.43.126'
export const socketUrl = severUrl + ':3000'