const Mock = require("mockjs");

function connect(onConnecting, onConnected, onError) {
    //模拟正在连接
    onConnecting && onConnecting();
    //模拟连接成功
    setTimeout(() => {
        onConnected && onConnected();
    }, 10000)
}

function subNewMsg(cb) {
    setInterval(() => {
        cb(Mock.mock({
            appId: "11",
            openId: /sisf|dsdf|anb2|sss4|safs4|sd22|bbas|sss/,
            "msgId|1-1000000": 1,
            content: '@csentence',
            sendType: /REC|SEND/,
            "createTime|1543800000-1543851602": 1,
            msgType: "text"
        }));
    }, 10000)
}

export {
    connect,
    subNewMsg
}