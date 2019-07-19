window.onload = function() {
    var _root = document.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function() {
            _root.style.fontSize = parseInt(_root.clientWidth / 19.2) + 'px';
            document.body && (document.body.style.fontSize = 0.16 + 'rem');
        };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', resizeCallback, false);
        resizeCallback();
        window.addEventListener(resizeEvent, resizeCallback, false);
    }
}

export function formatDate(time, type) {
    let format = '';
    let data = '';

    if (time) {
        data = new Date(parseInt(time));
    } else {
        data = new Date();
    }

    var o = {
        'M+': data.getMonth() + 1, //月份
        'd+': data.getDate(), //日
        'h+': data.getHours(), //小时
        'm+': data.getMinutes(), //分
        's+': data.getSeconds() //秒
    };

    format = type == 1 ? 'hh:mm:ss' : type == 2 ? 'yyyy-MM-dd' : type == 3 ? 'yyyy-MM-dd hh:mm:ss' : type == 4 ? 'yyyy-MM' : type == 5 ? 'MM' : type == 6 ? 'yyyy' : type == 7 ? 'hh:mm' : type == 8 ? 'yyyyMMdd' : 'yyyy-MM-dd hh:mm';

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

//set local
export function setLoc(k, val) {
    if (typeof val == 'string') {
        localStorage.setItem(k, val);
        return val;
    }
    localStorage.setItem(k, JSON.stringify(val));
    return val;
}

//get local
export function getLoc(k) {
    let uu = localStorage.getItem(k);

    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) {}
    return uu;
}

export function setLocs(name, value) {
    //设置名称为name,值为value的Cookie
    var expdate = new Date(); //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000); //时间单位毫秒
    document.cookie = name + '=' + value + ';expires=' + expdate.toGMTString() + ';path=/';

    //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
}

export function getLocs(c_name) {
    //判断document.cookie对象里面是否存有cookie
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}