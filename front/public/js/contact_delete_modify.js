/**
 *  v1.0.0
 *  ookooer
 * 
 *  执行contact数据的删除/修改工作
 */


/**
* Vue实例
* 从后端加载数据
*/
var demo = new Vue({ 
        el: '#app', 
        data: { 
            contacts: [], 
        }, 
        
        ready: function() { 
            this.getCustomers();                
        }, 
            
        methods: { 
            getCustomers: function() { 
                var vm = this;
                BACKEND_HELPER.getAllContactData(  
                    function(hr)    {
                        if (hr.readyState == 4  || hr.status == 200){ 
                            console.log(hr.responseText);

                            var jsonObj = JSON.parse(hr.responseText); 
                            vm.contacts = jsonObj;                  
                        }
                    });
            } 
        }
    })

/**
* 删除数据，然后重新加载本页面
*
* @param {int} en   id for contact
*/
function deleteEntry(en)    { 
    console.log("delete " + en);

    BACKEND_HELPER.deleteContactData(
        en,  
        function(hr)    {
            if (hr.readyState == 4  || hr.status == 200){ 
                console.log(hr.responseText);

                window.location.href=window.location.href; 
                window.location.reload; 
            } else  {
                alert("读取数据失败!");
            }
        });
}

/**
* 跳转到其它页面修改数据
*
* @param {int} en   id for contact
*/
function modifyEntry(en)    { 
    console.log("modify " + en); 
    window.location.href='./addcontact?id=' + en;
}
