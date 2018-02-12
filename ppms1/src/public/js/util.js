export function formatLastTime ({y=0, m=0, d=0}) {
	let current = new Date();
	let current_month = new Date();
	let current_year = new Date();
	let year = current.getFullYear();
	let month = current.getMonth();
	let day = current.getDate();
    let week_last = new Date(current.setDate(day - d));
    let month_last = new Date(current_month.setMonth(month - m));
    let year_last = new Date(current_year.setFullYear(year - y));

    let week_str = week_last.getFullYear() + '/' + (week_last.getMonth() + 1) + '/' + week_last.getDate() + ' 00:00:00';
    let month_str = month_last.getFullYear() + '/' + (month_last.getMonth() + 1) + '/' + month_last.getDate() + ' 00:00:00';
    let year_str = year_last.getFullYear() + '/' + (year_last.getMonth() + 1) + '/' + year_last.getDate() + ' 00:00:00';
    let current_str = year + '/' + (month + 1) + '/' + day + ' 23:59:59'; 
    return {
    	week: week_str + '-' +  current_str,
    	month: month_str + '-' + current_str,
    	year: year_str + '-' + current_str
    }
} 
// 数字前面补0
export function paddZero (val, no) {
    return ('00000000' + val).substr(-no);
}