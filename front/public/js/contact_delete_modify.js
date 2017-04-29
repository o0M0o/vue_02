/**
 *  v1.0.0
 *  ookooer
 * 
 *  ִ��contact���ݵ�ɾ��/�޸Ĺ���
 */


/**
* Vueʵ��
* �Ӻ�˼�������
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
                        alert("��ȡ����ʧ��!");
                    }
                } 

                http_request.send(null);
            } 
        }
    })

/**
* ɾ�����ݣ�Ȼ�����¼��ر�ҳ��
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
            alert("��ȡ����ʧ��!");
        }
    } 

    http_request.send(null);    
}

/**
* ��ת������ҳ���޸�����
*
* @param {int} en   id for contact
*/
function modifyEntry(en)    { 
    console.log("modify " + en); 
    window.location.href='./addcontact?id=' + en;
}
