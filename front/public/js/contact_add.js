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
        BACKEND_HELPER.putContactData(  
            id, JSON.stringify(load),
            function(hr)    {
                console.log(hr.responseText);
                if(hr.readyState == 4 && hr.status == 200) {
                    alert("修改数据成功!");
                } 
            });
    } else  {
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

                BACKEND_HELPER.getContactData(  
                    id,
                    function(hr)    {
                        if(hr.readyState == 4 && hr.status == 200) {
                            console.log(hr.responseText);
                            var jsonObj = JSON.parse(hr.responseText);
                            if(jsonObj != null) {
                                vm.fname = jsonObj.first_name;
                                vm.sname = jsonObj.last_name;
                                vm.email = jsonObj.email;
                                vm.desc = jsonObj.description;
                            }   else    {
                                alert("获取contact数据失败!");
                            }
                        } 
                    });
            }
        }
    }
})
