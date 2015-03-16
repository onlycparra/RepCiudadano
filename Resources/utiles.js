module.exports={
	route:	function(params,success_code,fail_code){
				var json_array=null;
				function select(code){

					var Module;
					var win0;
					switch(code){
						case 1:{//just show the message
							var dialog0 = Ti.UI.createAlertDialog({
								title:  json_array['title'],
								message:json_array['message'],
								ok:     json_array['accept']
							}).show();
							return;
						}
						case 101:{
							Module=require('windows/gettingStarted');
							win0=new Module.welcome();
							break;
						}case 102:{
							Module=require('windows/gettingStarted');
							win0=new Module.register();
							break;
						}case 103:{
							Module=require('windows/gettingStarted');
							win0=new Module.activate();
							break;
						}case 104:{
							Module=require('windows/gettingStarted');
							win0=new Module.login();
							break;
						}case 201:{
							Module=require('windows/tabFrame');
							Ti.App.Properties.setString('logged_in','true');
							Ti.App.Properties.setString('username',json_array['data']['username']);
							win0=new Module.tabs();
							break;
						}case 301:{
							Module=require('windows/content');
							win0=new Module.vote();
							break;
						}case 302:{
							Module=require('windows/content');
							win0=new Module.report();
							break;
						}case 401:{
							Module=require('windows/settings');
							win0=new Module.searchCommunities();
							break;
						}case 402:{
							Module=require('windows/settings');
							win0=new Module.myCommunities();
							break;
						}case 403:{
							Module=require('windows/settings');
							win0=new Module.setPassword();
							break;
						}default:{
							win0=Ti.UI.createWindow({
								title:'Error code'
							});
							break;
						}
					}
					win0.message=json_array;
					win0.open();
				}
				
				if(params==null){//local routing
					select(success_code);
					
				}else{//web based routing
					var url="http://www.reporteciudadano.cl/controller.php";
					params.debug=0;
					params.pretty_json=0;
					var xhr=Ti.Network.createHTTPClient({
						onload: function(e){
					    	json_array=JSON.parse(this.responseText);
					    	if(json_array['status']=='ok'){
					    		select(success_code);
					    	}else{
					    		select(fail_code);
					    	}
						},
						onerror: function(e){
							alert("Error de comnicación con el servidor");
							Ti.API.info(this.responseText);
							Ti.API.info(this.status);
							Ti.API.info(e.error);
	
							json_array=JSON.parse(this.responseText);
					    	fail_window.message=json_array;
					    	fail_window.open();
					    	
						},
						timeout:5000
					});
					xhr.open('POST',url);
					xhr.send(params);
				}
			},
	refreshTitles: function(params){
				var json_array=null;

				var url="http://www.reporteciudadano.cl/controller.php";
				var xhr=Ti.Network.createHTTPClient({
					onload: function(e){
				    	json_array=JSON.parse(this.responseText);
				    	if(json_array['status']=='ok'){
				    		alert(this.responseText);
				    		
				    		//var Vote=require('windows/content');
				    		//var vote0=new Vote.vote();
				    		//var vote0=Ti.UI.createView();
				    		
				    		//var TabFrame=require('windows/tabFrame');
							//var tabGroup0=new TabFrame.tabs(vote0);
							//tabGroup0.open();
				    		
				    	}else{
				    		//var TabFrame=require('windows/tabFrame');
							//var tabGroup0=new TabFrame.tabs();
							//tabGroup0.open();
						}
					},
					onerror: function(e){
						alert("Error de comunicación con el servidor, por favor inténtelo más tarde");
						Ti.API.info(this.responseText);
						Ti.API.info(this.status);
						Ti.API.info(e.error);

						json_array=JSON.parse(this.responseText);
				    	
				    	//var TabFrame=require('windows/tabFrame');
						//var tabGroup0=new TabFrame.tabs();
						//tabGroup0.message=json_array;
						//tabGroup0.open();
				    	
					},
					timeout:5000
				});
				xhr.open('POST',url);
				xhr.send(params);
			},
	createReport: function(params){
				var json_array=null;

				var url="http://www.reporteciudadano.cl/controller.php";
				var xhr=Ti.Network.createHTTPClient({
					onload: function(e){
				    	json_array=JSON.parse(this.responseText);
				    	if(json_array['status']=='ok'){
				    		alert(this.responseText);
				    	}
					},
					onerror: function(e){
						alert("Error de comnicación con el servidor");
						Ti.API.info(this.responseText);
						Ti.API.info(this.status);
						Ti.API.info(e.error);

						json_array=JSON.parse(this.responseText);
				    	
				    	var TabFrame=require('windows/tabFrame');
						var tabGroup0=new TabFrame.tabs();
						tabGroup0.message=json_array;
						tabGroup0.open();
				    	
					},
					timeout:5000
				});
				xhr.open('POST',url);
				xhr.send(params);
			}
};