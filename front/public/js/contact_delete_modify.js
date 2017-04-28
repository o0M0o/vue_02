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
			http_request.onreadystatechange = function(){
			   if (http_request.readyState == 4  || http_request.readyState == 200){
					console.log(http_request.responseText)
					
					var jsonObj = JSON.parse(http_request.responseText);
					vm.contacts = jsonObj;					
               }
            } 
			
            http_request.open("GET", this.apiUrl, true);
            http_request.send(null);			
		}
	}
})


function deleteEntry(en)	{
	console.log("delete " + en);

	var http_request = new XMLHttpRequest();            
	http_request.onreadystatechange = function(){
	   if (http_request.readyState == 4  || http_request.readyState == 200){
			console.log(this.responseText);
			
			window.location.href=window.location.href; 
			window.location.reload; 
	   }
	} 
	
	http_request.open("DELETE", "http://localhost:8089/contacts/" + en, true);
	http_request.send(null);	
}

function modifyEntry(en)	{
	console.log("modify " + en);
	window.location.href='./addcontact?id=' + en;
	
	/*
	var http_request = new XMLHttpRequest();            
	http_request.onreadystatechange = function(){
	   if (http_request.readyState == 4  || http_request.readyState == 200){
			console.log(this.responseText);
			
			window.location.href=window.location.href; 
			window.location.reload; 
	   }
	} 
	
	http_request.open("PUT", "http://localhost:8089/contacts/:" + en, true);
	http_request.send(null);	 
	*/
}