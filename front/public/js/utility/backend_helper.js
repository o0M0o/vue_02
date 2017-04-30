/**
 *  v1.0.0
 *  ookooer
 *
 *  与后端通信模块
 */

var BACKEND_HELPER = (function() {
    /**
    *  发送contact数据到后端
    *
    *  @param {string} load             json格式contact数据
    *  @param {function} callback       状态回调函数
    *
    */
    var postContactData = function(load, callback)  {
        var http_request = new XMLHttpRequest();
        http_request.open("POST", 'http://localhost:8089/contacts', true);
        http_request.setRequestHeader("Content-type", "application/json");

        http_request.onreadystatechange = function()    {
            callback(http_request);
        };

        http_request.send(load);
    }

    return {
        postContactData : postContactData 
    };
})();


