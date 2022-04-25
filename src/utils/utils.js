const getLocalTime = function (nS) {
    return new Date(parseInt(nS) * 1000).toString().replace(/:\d{1,2}$/, ' ');
};

export default {
    getLocalTime: getLocalTime,
    getPublishTime(ns) {
        const currentDate = new Date();
        const ctime = new Date(getLocalTime(ns))
        const time = currentDate - ctime;
        const cSencond = time / 1000,
            cMinutes = cSencond / 60,
            cHours = cMinutes / 60,
            cDays = cHours / 24,
            cMonth = cDays / 30,
            cYears = cMonth / 365;
        if (cSencond <= 60) { // 1分钟内
            return '刚刚'
        } else if (cMinutes <= 60) { // 大于1分钟小于1小时
            return `${cMinutes.toFixed(0)}分钟前`
        } else if (cHours <= 24) {
            return `${cHours.toFixed(0)}小时前`
        } else if (cDays <= 30) {
            return `${cDays.toFixed(0)}天前`
        } else if (cMonth <= 12) {
            return `${cMonth.toFixed(0)}个月前`
        } else {
            reutrn `${cYears.toFixed(0)}年前`
        }
    },
    getLocalDate(ns) {
        const cdate = new Date(getLocalTime(ns));
        const month = cdate.getMonth() + 1 < 10 ? `0${cdate.getMonth() + 1}` : cdate.getMonth() + 1;
        const date = cdate.getDate() < 10 ? `0${cdate.getDate()}` : cdate.getDate();
        return `${cdate.getFullYear()}-${month}-${cdate.getDate()}`
    }
}