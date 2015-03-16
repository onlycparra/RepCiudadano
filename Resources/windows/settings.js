module.exports={
	searchCommunities: function(){
		var win0=Ti.UI.createWindow({
			backgroundColor:'#333',
			layout:'vertical',
			title:'Buscar Comunidades'
		});
	
		//A LOT OF CODE
		
		return win0;
	},
	setPassword: function(){
		var win0=Ti.UI.createWindow({
			backgroundColor:'#333',
			layout:'vertical',
			title:'Cambio de contraseña'
		});
		////////////////////////////////////////////////////////////////////////////
		/////////////////// U S E R   I N T E R F A C E ////////////////////////////
		
		var sView0=Ti.UI.createScrollView({
			scrollType:'vertical',
			showVerticalScrollIndicator:true,
			layout:'vertical'
		});
		win0.add(sView0);

		var password=Ti.UI.createTextField({
			hintText:'Password',
			maxLength:40,
			passwordMask:'true',
			width:'80%'
		});
		sView0.add(password);
		
		var new_password=Ti.UI.createTextField({
			hintText:'Nueva Password',
			maxLength:40,
			passwordMask:'true',
			width:'80%'
		});
		sView0.add(new_password);
		
		var submit=Ti.UI.createButton({
			bottom:5,
			title:'Cambiar',
			font: { fontSize:25 },
			width:'80%',
		  	height:60
		});
		sView0.add(submit);
		
		////////////////////////////////////////////////////////////////////////////
		/////////////////// E V E N T   L I S T E N E R S //////////////////////////

	
		submit.addEventListener('click',function(e){
			var params={
				action:'1004',
				username:		Ti.App.Properties.getString('username'),
				password:		password.getValue(),
				new_password:	new_password.getValue()
			};
			
			var Utiles=require('utiles');
			Utiles.route(params,1,1);// show alert
			
		});
		
		////////////////////////////////////////////////////////////////////////////
		////////////////////// M E S S A G E S   F O R   U S E R ///////////////////
		if(win0.message!=null){
			var dialog0 = Ti.UI.createAlertDialog({
				title:  win0.message['title'],
				message:win0.message['message'],
				ok:     win0.message['accept']
			}).show();
		}
		return win0;
		//A LOT OF CODE
		
		return win0;
	}
};