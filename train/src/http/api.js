const api = {
    getLogin: '/all.json'
}

for (var k in api) {
    //   if (process.env.NODE_ENV == 'development') {
    //     api[k] = '/airPortService/' + api[k];
    //   } else {
    api[k] = 'http://' + window.location.host + api[k];
    // api[k] = 'http://192.168.0.100:81/airPortService/' + api[k];
    // api[k] = 'http://192.168.0.145:8080/airPortService/' + api[k];
    //   }
}
export default api;