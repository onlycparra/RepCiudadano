module.exports={
	welcome:	function(){
					////////////////////////////////////////////////////////////////////////////
					/////////////////// U S E R   I N T E R F A C E ////////////////////////////
				
					var win0=Ti.UI.createWindow({
						exitOnClose:true,
						layout: 'vertical',
						backgroundColor:'#333',
						title:'Ingresa o regístrate'
					});
				
					var sView0=Ti.UI.createScrollView({
						scrollType:'vertical',
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					win0.add(sView0);
					
					var titulo = Ti.UI.createLabel({
						color: '#FFF',
						font: { fontSize:48 },
						shadowColor: '#333',
						shadowOffset: {x:5, y:5},
						shadowRadius: 8,
						text: 'Reporte Ciudadano',
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						top: 10,
						width: Ti.UI.SIZE,
						height: Ti.UI.SIZE
					});
					sView0.add(titulo);
					
					var logo=Ti.UI.createImageView({
						image:'../appicon.png',
						width:'50%'
					});
					sView0.add(logo);
					
					var signup=Ti.UI.createButton({
						top:5,
						title:'Regístrate',
						font: { fontSize:25 },
						width:'80%',
					  	height:60
					});
					sView0.add(signup);
					
					var signin=Ti.UI.createButton({
						top:5,
						title:'Ingresa',
						font: { fontSize:25 },
						width: '80%',
					  	height:60
					});
					sView0.add(signin);
					
					/*
					chao con facebook, me cayó mal >_<
					var fb=require('facebook');
					fb.appid=1471537156462479;
					fb.permissions=['public_profile','email'];
					fb.authorize();
					sView0.add(fb.createLoginButton({
					    top : 40,
					    style : fb.BUTTON_STYLE_WIDE
					}));
					
					*/
					////////////////////////////////////////////////////////////////////////////
					/////////////////// E V E N T   L I S T E N E R S //////////////////////////
					/*
					fb.addEventListener('login',function(e){
					    if(e.success){
					    	fb.logedIn=true;
					    	
					    	var working=true;
					    	var fb_data;
					    	
					    	fb.requestWithGraphPath('me', {}, 'GET', function(e){
						        if(e.success){
						        	fb_data=JSON.parse(e.result);
						        	alert(fb_data);
						        }
						        working=false;
						    });
						    alert(fb_data);
					        var Register=require('windows/register');
							var reg0=new Register();
							reg0.open();
					    }
					});
					*/
					
					signup.addEventListener('click',function(e){
						var Utiles=require('utiles');
						Utiles.route(null,102,0);// go to register
					});
					
					signin.addEventListener('click',function(e){
						var Utiles=require('utiles');
						Utiles.route(null,104,0);// go to login
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
				},
	register:	function(){
					////////////////////////////////////////////////////////////////////////////
					/////////////////// U S E R   I N T E R F A C E ////////////////////////////
					var win0=Ti.UI.createWindow({
						layout: 'vertical',
						backgroundColor:'#333',
						title:'Crea una cuenta nueva'
					});
					
					var sView0=Ti.UI.createScrollView({
						scrollType:'vertical',
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					win0.add(sView0);
					
					var username=Ti.UI.createTextField({
						hintText:'Nombre de usuario',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						width:'80%'
					});
					sView0.add(username);
					
					var first_name=Ti.UI.createTextField({
						hintText:'Nombre',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
						width:'80%'
					});
					sView0.add(first_name);
					
					var last_name=Ti.UI.createTextField({
						hintText:'Apellido',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
						width:'80%'
					});
					sView0.add(last_name);
					
					var email=Ti.UI.createTextField({
						hintText:'E-Mail',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_EMAIL,
						width:'80%'
					});
					sView0.add(email);
					
					var password=Ti.UI.createTextField({
						hintText:'Password',
						maxLength:40,
						passwordMask:'true',
						width:'80%'
					});
					sView0.add(password);
					
					var submit=Ti.UI.createButton({
						bottom:5,
						title:'Listo!',
						font: { fontSize:25 },
						width:'80%',
					  	height:60
					});
					sView0.add(submit);
					
					////////////////////////////////////////////////////////////////////////////
					/////////////////// E V E N T   L I S T E N E R S //////////////////////////
					//erase spaces
					username.addEventListener('blur',function(e){
					    username.value=username.value.replace(" ","");
					});
				
					submit.addEventListener('click',function(e){
						var params={
							action:'1001',
							username:username.getValue(),
							first_name:first_name.getValue(),
							last_name:last_name.getValue(),
							email:email.getValue(),
							password:password.getValue()
						};
						
						var Utiles=require('utiles');
						Utiles.route(params,103,1);// go to activate or show alert
						
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
				},
	activate:	function(){
					////////////////////////////////////////////////////////////////////////////
					/////////////////// U S E R   I N T E R F A C E ////////////////////////////
					var win0=Ti.UI.createWindow({
						layout: 'vertical',
						backgroundColor:'#333',
						title:'Activa tu cuenta'
					});
					
					var sView0=Ti.UI.createScrollView({
						scrollType:'vertical',
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					win0.add(sView0);
					
					var mailing = Ti.UI.createLabel({
						color: '#FFF',
						font: { fontSize:20 },
						shadowColor: '#333',
						shadowOffset: {x:5, y:5},
						shadowRadius: 8,
						text: 'Hemos enviado un código de activación a tu cuenta de correo, ingrésalo acá para poder activar tu cuenta.',
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						top: 10,
						width: Ti.UI.SIZE,
						height: Ti.UI.SIZE
					});
					sView0.add(mailing);
					
					var username=Ti.UI.createTextField({
						hintText:'Nombre de usuario',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						width:'80%'
					});
					sView0.add(username);
					
					var act_code=Ti.UI.createTextField({
						hintText:'Código',
						maxLength:40,
						width:'80%'
					});
					sView0.add(act_code);
					
					var submit=Ti.UI.createButton({
						bottom:5,
						title:'Activar mi cuenta',
						font: { fontSize:25 },
						width:'80%',
					  	height:60
					});
					sView0.add(submit);
					
					////////////////////////////////////////////////////////////////////////////
					/////////////////// E V E N T   L I S T E N E R S //////////////////////////
					submit.addEventListener('click',function(e){
						var params={
							action:'1002',
							username:username.getValue(),
							act_code:act_code.getValue()
						};
						
						var Utiles=require('utiles');
						Utiles.route(params,104,1);// go to login or show alert
						
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
				},
	login:		function(){
					////////////////////////////////////////////////////////////////////////////
					/////////////////// U S E R   I N T E R F A C E ////////////////////////////
					var win0=Ti.UI.createWindow({
						layout: 'vertical',
						backgroundColor:'#333',
						title:'Ingresa'
					});
					
					var sView0=Ti.UI.createScrollView({
						scrollType:'vertical',
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					win0.add(sView0);
					
					var username=Ti.UI.createTextField({
						hintText:'Nombre de usuario',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						width:'80%'
					});
					sView0.add(username);
					
					var password=Ti.UI.createTextField({
						hintText:'Password',
						maxLength:40,
						passwordMask:'true',
						width:'80%'
					});
					sView0.add(password);
					
					var submit=Ti.UI.createButton({
						bottom:5,
						title:'Entrar',
						font: { fontSize:25 },
						width:'80%',
					  	height:60
					});
					sView0.add(submit);
					
					////////////////////////////////////////////////////////////////////////////
					/////////////////// E V E N T   L I S T E N E R S //////////////////////////
					submit.addEventListener('click',function(e){
						var params={
							action:'1003',
							username:username.getValue(),
							password:password.getValue()
						};
						var Utiles=require('utiles');
						Utiles.route(params,201,1);// go to MainTabs or show alert
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
				}
};
	