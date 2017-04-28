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
            var http_request = new XMLHttpRequest();            
			/*http_request.onreadystatechange = function(){
			   if (http_request.readyState == 4  ){
					console.log(http_request.responseText)
					// Javascript function JSON.parse to parse JSON data
					var jsonObj = JSON.parse(http_request.responseText);
					this.contacts = jsonObj;
					console.log("jsonObj : " + jsonObj);								 
               }
            } */
			
            http_request.open("GET", this.apiUrl, false);
            http_request.send(null);

			if (http_request.status === 200) {
				var jsonObj = JSON.parse(http_request.responseText);
				this.contacts = jsonObj;
				console.log("jsonObj : " + jsonObj);
			}
		}
	}
})