module.exports={
	vote:	function(){
					var view0=Ti.UI.createView({
						backgroundColor:'#888',
						layout:'vertical'
					});
					////////////////////////Create Titles List/////////////////////////////////////
					//----------------Title Maker---------------------
					function titleContainer(id0,img0,header0){
						var titContainer=Ti.UI.createView({
							layout:'vertical',
							height:Ti.UI.SIZE
						});
						var borderTop=Ti.UI.createView({
							top:4,
							left:0,
							width:'100%',
							height:1,
							backgroundColor:'#FFF'
						});
						var title=Ti.UI.createView({
							top:0,
							left:0,
							width:'100%',
							height:99,
							layout:'absolute',
							backgroundGradient:{
					            type : 'linear',
					            startPoint:{x:'0%',y:'0%'},
					            endPoint:{x:'0%',y:'100%'},
					            colors : [
					            	{color:'#000',offset:0.0},
					            	{color:'#0000',offset:1.0}
					            ]
					        },
						});
						var img=Ti.UI.createView({
							top:4,
							left:4,
							width:123,
							height:92,
							backgroundColor:'red'
						});
						var header=Ti.UI.createLabel({
							top:4,
							left:127,
							width:Ti.UI.FILL,
							text:header0,
							font:{fontSize:18},
							color:'#EEE',
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
						});
						title.add(img);
						title.add(header);
						titContainer.add(borderTop);
						titContainer.add(title);
					
					
						titContainer.addEventListener('click',function(e){
							
							var detailWin=Ti.UI.createWindow({
								title:'Detalles'
							});
							var detailSView=Ti.UI.createScrollView({
								showVerticalScrollIndicator:true,
								layout:'vertical'
							});detailWin.add(detailSView);
							var detailHeader=Ti.UI.createLabel({
								top:4,
								width:'98%',
								text:header0,
								font:{fontSize:26,fontWeight: 'bold'},
								color:'#EEE',
								textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
							});
							var detailPhoto=Ti.UI.createView({
								top:4,
								width:246,
								height:184,
								backgroundColor:'red'
							});
							var detailProblem=Ti.UI.createLabel({
								top:2,
								width:'98%',
								text:'El Problema:',
								font:{fontSize:20},
								color:'#EEE',
								textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
							});
							var detailProblemContent=Ti.UI.createTextArea({
								value:'Los semáforos de la esquina de San Máximo siguen sin funcionar después de varios meses del terremoto.\nEsto es un potencial peligro ya que las personas no saben mirar para los lados',
								editable:'false',
								focusable:'false'
							});
							
							var detailProposal=Ti.UI.createLabel({
								top:4,
								width:'98%',
								text:'La Propuesta:',
								font:{fontSize:20},
								color:'#EEE',
								textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
							});
							var detailProposalContent=Ti.UI.createTextArea({
								value:'Construir nuevos semáforos y un pasarela para los peatones que no quieren ver las luces o que tienen problemas para identificar los colores, así no se discriminará a la gente.',
								editable:'false',
								focusable:'false'
							});
							detailSView.add(detailHeader);
							detailSView.add(detailPhoto);
							detailSView.add(detailProblem);
							detailSView.add(detailProblemContent);
							detailSView.add(detailProposal);
							detailSView.add(detailProposalContent);
							detailWin.open();
							
							var toast = Ti.UI.createNotification({message:'ID: '+id0,duration: Ti.UI.NOTIFICATION_DURATION_LONG});
							toast.show();
						});
						return titContainer;
					};
					//----------------Put Titles on scroll view-------
					for (var i=0;i<5;i++) {
						view0.add(titleContainer(1000+i,'http://www.image.com/img.jpg','Semáforos sin el correcto color '+i));
					};
					return view0;
				},
	report:	function(){
					var win0=Ti.UI.createWindow({
						backgroundColor:'#333',
						layout:'vertical',
						title:'Crea un Reporte'
					});
				
					var text0 = Ti.UI.createLabel({
						color: '#FFF',
						font: { fontSize:20 },
						shadowColor: '#333',
						shadowOffset: {x:5, y:5},
						shadowRadius: 8,
						text: 'Aquí podrás subir tus reportes',
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						top: 10,
						width: Ti.UI.SIZE,
						height: Ti.UI.SIZE
					});
					win0.add(text0);
					var sView0=Ti.UI.createScrollView({
						scrollType:'vertical',
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					win0.add(sView0);
					
					var title=Ti.UI.createTextField({
						hintText:'Título',
						maxLength:40,
						keyboardType:Ti.UI.KEYBOARD_DEFAULT,
						width:'80%'
					});
					sView0.add(title);
					
					var labelProblem=Ti.UI.createLabel({
						top:10,
						width:'98%',
						text:'El Problema:',
						font:{fontSize:20},
						color:'#EEE',
						textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
					});
					sView0.add(labelProblem);
					
					var problem=Ti.UI.createTextArea({
					    height : 70,
					    top : 0,
						width:'80%'
					});
					sView0.add(problem);
					
					var labelProposal=Ti.UI.createLabel({
						top:10,
						width:'98%',
						text:'Tu propuesta de solución:',
						font:{fontSize:20},
						color:'#EEE',
						textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
					});
					sView0.add(labelProposal);
					
					var proposal=Ti.UI.createTextArea({
					    height : 70,
					    top : 0,
						width:'80%'
					});
					sView0.add(proposal);
					
					
					var submit=Ti.UI.createButton({
						top:10,
						bottom:5,
						title:'Inicia tu vida política',
						font: { fontSize:25 },
						width:'80%',
					  	height:60
					});
					sView0.add(submit);
					
					submit.addEventListener('click',function(e){
						var params={
							action:'3001',
							username:Ti.App.Properties.getString('username'),
							community_id:1,
							title:title.getValue(),
							problem:problem.getValue(),
							proposal:proposal.getValue()
						};
						
						var Utiles=require('utiles');
						Utiles.createReport(params);// go to activate or show alert
						
					});
					
					return win0;
				}
};