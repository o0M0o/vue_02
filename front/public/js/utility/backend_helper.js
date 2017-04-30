/**
 *  v1.0.0
 *  ookooer
 *
 *  与后端通信模块
 */

var BACKEND_HELPER = (function() {
    var BACKEND_URL = 'http://localhost:8089/contacts';

    /**
     *  新建contact数据
     *  发送contact数据到后端
     *
     *  @param {string} load             json格式contact数据
     *  @param {function} callback       状态回调函数
     */
    var postContactData = function(load, callback)  {
        var http_request = new XMLHttpRequest();
        http_request.open("POST", BACKEND_URL, true);
        http_request.setRequestHeader("Content-type", "application/json");

        http_request.onreadystatechange = function()    {
            callback(http_request);
        };

        http_request.send(load);
    }

    /**
     *  修改contact数据
     *  发送contact数据到后端
     *
     *  @param {int}    id               contact id
     *  @param {string} load             json格式contact数据
     *  @param {function} callback       状态回调函数
     */
    var putContactData = function(id, load, callback)  {
        var http_request = new XMLHttpRequest();
        http_request.open("PUT", BACKEND_URL + '/' + id, true);
        http_request.setRequestHeader("Content-type", "application/json");

        http_request.onreadystatechange = function() {
            http_request.onreadystatechange = function()    {
                callback(http_request);
            };
        }

        http_request.send(load);
    }

    /**
     *  删除contact数据
     *  发送contact数据请求到后端
     *
     *  @param {int}    id               contact id
     *  @param {function} callback       状态回调函数
     */
    var deleteContactData = function(id, callback)  {
        var http_request = new XMLHttpRequest();
        http_request.open("DELETE", BACKEND_URL + '/' + id, true);

        http_request.onreadystatechange = function() {
            http_request.onreadystatechange = function()    {
                callback(http_request);
            };
        }

        http_request.send(null);
    }


    /**
     *  获取全部contact数据
     *  从后端获取数据
     *
     *  @param {function} callback       状态回调函数
     */
    var getAllContactData = function(callback)  {
        var http_request = new XMLHttpRequest();            
        http_request.open("GET", BACKEND_URL, true); 
        http_request.onreadystatechange = function()    { 
            callback(http_request);
        } 

        http_request.send(null);
    }

    /**
     *  根据id获取contact数据
     *  从后端获取数据
     *
     *  @param {int}    id               contact id
     *  @param {function} callback       状态回调函数
     */
    var getContactData = function(id, callback)  {
        var http_request = new XMLHttpRequest();            
        http_request.open("GET", BACKEND_URL + '/' + id, true); 
        http_request.onreadystatechange = function()    { 
            callback(http_request);
        } 

        http_request.send(null);
    }

    return {
        deleteContactData   : deleteContactData, 
        getContactData      : getContactData, 
        getAllContactData   : getAllContactData, 
        putContactData      : putContactData, 
        postContactData     : postContactData 
    };
})();


