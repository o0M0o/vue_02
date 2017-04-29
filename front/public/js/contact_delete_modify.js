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
            apiUrl: 'http://localhost:8089/contacts' 
        }, 
        
        ready: function() { 
            this.getCustomers();                
        }, 
            
        methods: { 
            getCustomers: function() { 
                var vm = this;
                var http_request = new XMLHttpRequest();            
                http_request.open("GET", this.apiUrl, true); 
                http_request.onreadystatechange = function()    { 
                    if (http_request.readyState == 4  || http_request.readyState == 200){ 
                        console.log(http_request.responseText)

                        var jsonObj = JSON.parse(http_request.responseText); 
                        vm.contacts = jsonObj;                  
                    } else  {
                        alert("读取数据失败!");
                    }
                } 

                http_request.send(null);
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

    var http_request = new XMLHttpRequest();            
    http_request.open("DELETE", "http://localhost:8089/contacts/" + en, true); 
    http_request.onreadystatechange = function(){ 
        if (http_request.readyState == 4  
            || http_request.readyState == 200)  { 
            console.log(this.responseText);
            
            window.location.href=window.location.href; 
            window.location.reload; 
        } else  {
            alert("读取数据失败!");
        }
    } 

    http_request.send(null);    
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
