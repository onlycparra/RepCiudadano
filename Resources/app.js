(function(){
	////////////////////////////////////////////////////////////////////////////
	////////////////////// G E N E R A L   C O D E /////////////////////////////
	
	//reset params
	Ti.App.Properties.setString('order_by','by_date');
	Ti.App.Properties.setString('filter','all');
	Ti.App.Properties.setInt('range_from',0);
	Ti.App.Properties.setInt('range_to',20);
	
	//verify if the user is already logged in
	
	if(Ti.App.Properties.hasProperty('logged_in')){
		if(Ti.App.Properties.getString('logged_in')=='true'&&Ti.App.Properties.getString('username')!=''){
			var Frame=require('windows/tabFrame');
			var main0=new Frame.tabs();
			main0.open();
		}else{
			var GStarted=require('windows/gettingStarted');
			var welcome0=new GStarted.welcome();
			welcome0.open();
		}
	}else{
		Ti.App.Properties.setString('logged_in','false');
		Ti.App.Properties.setString('username','');
		var GStarted=require('windows/gettingStarted');
		var welcome0=new GStarted.welcome();
		welcome0.open();
	}
})();
