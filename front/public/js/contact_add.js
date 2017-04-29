/**
 *  v1.0.0
 *  ookooer
 *
 *  执行contact数据的删除/修改工作
 */

/**
* 创建/修改contact
* 给后端发http请求来修改数据
*/
function createContact() {
   var fn = document.getElementById("fname").value;
   var sn = document.getElementById("sname").value;
   var email = document.getElementById("email").value;
   var desc = document.getElementById("desc").value;

   if(!check_first_name(fn))    {
        alert("first name must have value");
        return;
   }

   if(!check_second_name(sn))   {
        alert("second name must have value");
        return;
   }

   if(!check_email(email))  {
        alert("email must have value");
        return;
   }

   if(!check_desc(desc))    {
        //alert("description must have value");
        return;
   }

    var load = new Object();
    load.first_name = fn;
    load.last_name = sn;
    load.email = email;
    load.description = desc;
    var id = getParam("id");
    if("" != id)    {
        put_data(id, JSON.stringify(load))
    } else  {
        post_data(JSON.stringify(load));
    }
}

/**
* 创建contact
* 给后端发http请求来创建数据
*/
function _post_data(sz) {
    var http_request = new XMLHttpRequest();
    http_request.open("POST", 'http://localhost:8089/contacts', true);
    http_request.setRequestHeader("Content-type", "application/json");

    http_request.onreadystatechange = function() {
        console.log(this.responseText);
        if(http.readyState == 4 && http.status == 200) {
            alert("添加数据成功!");
        } else  {
            alert("添加数据失败!");
        }
    }

    http_request.send(sz);
}

/**
* 修改contact
* 给后端发http请求来修改数据
*/
function _put_data(id, sz)  {
    var http_request = new XMLHttpRequest();
    http_request.open("PUT", 'http://localhost:8089/contacts/' + id, true);
    http_request.setRequestHeader("Content-type", "application/json");

    http_request.onreadystatechange = function() {//Call a function when the state changes.
        console.log(this.responseText);
        if(http.readyState == 4 && http.status == 200) {
            alert("修改数据成功!");
        } else  {
            alert("修改数据失败!");
        }
    }

    http_request.send(sz);
}


/**
*  check first_name validity
*/
function _check_first_name(fn)  {
    return fn !== null || fn !== undefined || fn !== '';
}

/**
*  check second_name validity
*/
function _check_second_name(sn) {
    return sn !== null || sn !== undefined || sn !== '';
}

/**
*  check email validity
*/
function _check_email(em)   {
    return em !== null || em !== undefined || em !== '';
}

/**
*  check description validity
*/
function _check_desc(desc)  {
    return true;
}


/**
*  get parameter form url that between '?' and '&'
*/
function _getParam(paramName)   {
    paramValue = "";
    isFound = false;
    if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

/**
 *  Vue object for contact_add.html
 *  if url have 'id' parameter, then modify old contact
 *  else create new contact
 */
var demo = new Vue({
    el: '#app',
    data: {
        fname : "",
        sname : "",
        email : "",
        desc : ""
    },
    ready: function() {
        this.getCustomers();
    },
    methods: {
        getCustomers: function() {
            var id = getParam("id");
            if("" != id)    {
                var vm = this;

                var http_request = new XMLHttpRequest();
                http_request.onreadystatechange = function(){
                http_request.open("GET", 'http://localhost:8089/contacts/' + id, true);
                   if (http_request.readyState == 4  || http_request.readyState == 200){
                        console.log(http_request.responseText)
                        // Javascript function JSON.parse to parse JSON data
                        var jsonObj = JSON.parse(http_request.responseText);
                        if(jsonObj != null) {
                            vm.fname = jsonObj.first_name;
                            vm.sname = jsonObj.last_name;
                            vm.email = jsonObj.email;
                            vm.desc = jsonObj.description;
                        }   else    {
                            alert("获取contact数据失败!");
                        }
                   }
                }

                http_request.send(null);
            }
        }
    }
})
