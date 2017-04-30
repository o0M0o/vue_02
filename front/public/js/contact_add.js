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

   if(!_check_first_name(fn))    {
        alert("first name must have value");
        return;
   }

   if(!_check_second_name(sn))   {
        alert("second name must have value");
        return;
   }

   if(!_check_email(email))  {
        alert("email must have value");
        return;
   }

   if(!_check_desc(desc))    {
        //alert("description must have value");
        return;
   }

    var load = new Object();
    load.first_name = fn;
    load.last_name = sn;
    load.email = email;
    load.description = desc;
    var id = GLOBAL_HELPER.getParamFromURL(window.location.search, "id");
    if("" != id)    {
        _put_data(id, JSON.stringify(load))
    } else  {
        //_post_data(JSON.stringify(load));
        BACKEND_HELPER.postContactData(  
            JSON.stringify(load),
            function(hr)    {
                console.log(hr.responseText);
                if(hr.readyState == 4 && hr.status == 200) {
                    alert("添加数据成功!");
                } 
            });
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

    http_request.onreadystatechange = function(hr) {
        console.log(hr.responseText);
        if(hr.readyState == 4 && hr.status == 200) {
            alert("添加数据成功!");
        } 
        /*else  {
            alert("添加数据失败!");
        } */
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
        if(http_request.readyState == 4 && http_request.status == 200) {
            alert("修改数据成功!");
        } 
        /* else  {
            alert("修改数据失败!");
        } */
    }

    http_request.send(sz);
}


/**
*  check first_name validity
*/
function _check_first_name(fn)  {
    return GLOBAL_HELPER.stringIsEmpty(_string_is_empty(fn));
}

/**
*  check second_name validity
*/
function _check_second_name(sn) {
    return GLOBAL_HELPER.stringIsEmpty(sn);
}

/**
*  check email validity
*/
function _check_email(em)   {
    return GLOBAL_HELPER.stringIsEmpty(em);
}

/**
*  check description validity
*  description can be empty
*/
function _check_desc(desc)  {
    return true;
}

/**
 *  check string is empty
 *  @return  { boolean }   if string is empty return true
 */
function _string_is_empty(sz)  {
    return sz != null && sz != undefined && sz != '';
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
            var id = GLOBAL_HELPER.getParamFromURL(window.location.search, "id");
            if("" != id)    {
                var vm = this;

                var http_request = new XMLHttpRequest();
                http_request.open("GET", 'http://localhost:8089/contacts/' + id, true);

                http_request.onreadystatechange = function(){
                   if (http_request.readyState == 4  || http_request.readyState == 200){
                        console.log(http_request.responseText)
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
