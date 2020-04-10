export const timeAgo = (time)=>{
    var n = Date.now()
    var diff = parseInt(n) / 1000 - parseInt(time) / 1000
    var d = new Date(parseInt(time))
    switch (true) {
        case Math.floor(diff / 3600) <= 24:
            return `${("0"+d.getHours()).slice(-2)}:${("0"+d.getMinutes()).slice(-2)}`
            break
        case Math.floor(diff / 3600) > 24:
            return `${d.getDay()} - ${d.getMonth() + 1} - ${d.getFullYear()}`
            break;

    }
}