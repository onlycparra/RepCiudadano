module.exports={
	tabs: 		function(titlesList){ //view with titles
					////////////////////////////////////////////////////////////////////////////
					/////////////////// U S E R   I N T E R F A C E ////////////////////////////
					var win0=Ti.UI.currentWindow;
					var tabGroup0=Ti.UI.createTabGroup({
						navBarHidden:true,
						exitOnClose:true
					});
					var tab0=Ti.UI.createTab({
						icon:'images/icon-tab-vote.png'
					});
					tabGroup0.addTab(tab0);
					var tab1=Ti.UI.createTab({
						icon:'images/icon-tab-report.png'
					});
					tabGroup0.addTab(tab1);
					
					//#################################################################################
					///////////////////////Create Sorting buttons//////////////////////////////////
					//-----------------------Create Bar and Buttons----------
					var upperBar=Ti.UI.createView({
						top:0,
						center: {x: '50%'},
						width:Ti.UI.SIZE,
						height:42,
						layout:'horizontal'
					});
					var buttonBar=Ti.UI.createView({
						top:0,
						//center: {x: '50%'},
						left:0,
						width:Ti.UI.SIZE,
						height:42,
						layout:'horizontal',
						//backgroundColor:'#555'
					});
					
					var order_by_date=Ti.UI.createImageView({
						top:2,
						left:2,
						width:38,
						height:38,
						image:'/images/icon-order_by-date.png',
						backgroundColor:'#7AD',
						color:'#FFF'
					});
					var order_by_votes=Ti.UI.createImageView({
						top:2,
						width:38,
						height:38,
						image:'/images/icon-order_by-votes.png',
						backgroundColor:'auto',
						color:'#FFF'
					});
					var order_by_random=Ti.UI.createImageView({
						top:2,
						width:38,
						height:38,
						image:'/images/icon-order_by-random.png',
						backgroundColor:'auto',
						color:'#FFF'
						
					});
					
					var filling=Ti.UI.createView({
						width:16,
						height:38
					});
					
					var only_mine=Ti.UI.createImageView({
						top:2,
						width:38,
						height:38,
						image:'/images/icon-filter-only_mine.png',
						backgroundColor:'auto',
						color:'#FFF'
					});
					var only_voted_by_me=Ti.UI.createImageView({
						top:2,
						width:38,
						height:38,
						image:'/images/icon-filter-only_voted_by_me.png',
						backgroundColor:'auto',
						color:'#FFF'
					});
					var only_all=Ti.UI.createImageView({
						top:2,
						right:2,
						width:38,
						height:38,
						image:'/images/icon-filter-all.png',
						backgroundColor:'#F90',
						color:'#FFF'
					});
					
					var filling2=Ti.UI.createView({
						width:24,
						height:38
					});
					
					var refreshBtn=Ti.UI.createImageView({
						top:2,
						width:38,
						height:38,
						image:'/images/icon-refresh.png'
					});
					
					buttonBar.add(order_by_date);
					buttonBar.add(order_by_votes);
					buttonBar.add(order_by_random);
					buttonBar.add(filling);
					buttonBar.add(only_mine);
					buttonBar.add(only_voted_by_me);
					buttonBar.add(only_all);
					upperBar.add(buttonBar);
					upperBar.add(filling2);
					upperBar.add(refreshBtn);
					
					//------------------Fill Windows------------------
					tab0.window=Ti.UI.createWindow({
						layout:'vertical'
					});
					var sView0=Ti.UI.createScrollView({
						showVerticalScrollIndicator:true,
						layout:'vertical'
					});
					
					var loadMoreTitles=Ti.UI.createButton({
						top:50,
						width:'90%',
						title:'Cargar más antiguos'
					});
					
					tab0.window.add(upperBar);
					if(titlesList==null){
						var Content=require('windows/content');
						titlesList=Content.vote();
					}
					sView0.add(titlesList);
					sView0.add(loadMoreTitles);
					tab0.window.add(sView0);
					
					tab1.window=new Content.report();
					
					
					
					
					
					
					////////////////////////////////////////////////////////////////////////////
					/////////////////// E V E N T   L I S T E N E R S //////////////////////////
					
					//first launch
					if(!Ti.App.Properties.hasProperty('order_by')||!Ti.App.Properties.hasProperty('filter')){
						Ti.App.Properties.setString('order_by','by_date');
						Ti.App.Properties.setString('filter','all');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					}
					
					order_by_date.addEventListener("click",function(e){
						order_by_date.backgroundColor='#7AD';
						order_by_votes.backgroundColor='auto';
						order_by_random.backgroundColor='auto';
						loadMoreTitles.title='Cargar más antiguos';
						
						Ti.App.Properties.setString('order_by','by_date');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					order_by_votes.addEventListener("click",function(e){
						order_by_date.backgroundColor='auto';
						order_by_votes.backgroundColor='#7AD';
						order_by_random.backgroundColor='auto';
						loadMoreTitles.title='Cargar no tan populares';
						
						Ti.App.Properties.setString('order_by','by_votes');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					order_by_random.addEventListener("click",function(e){
						order_by_date.backgroundColor='auto';
						order_by_votes.backgroundColor='auto';
						order_by_random.backgroundColor='#7AD';
						loadMoreTitles.title='Cargar más reportes';
						
						Ti.App.Properties.setString('order_by','by_random');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					
					
					only_mine.addEventListener("click",function(e){
						only_mine.backgroundColor='#F90';
						only_voted_by_me.backgroundColor='auto';
						only_all.backgroundColor='auto';
						
						Ti.App.Properties.setString('filter','only_mine');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					only_voted_by_me.addEventListener("click",function(e){
						only_mine.backgroundColor='auto';
						only_voted_by_me.backgroundColor='#F90';
						only_all.backgroundColor='auto';
						
						Ti.App.Properties.setString('filter','only_voted_by_me');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					only_all.addEventListener("click",function(e){
						only_mine.backgroundColor='auto';
						only_voted_by_me.backgroundColor='auto';
						only_all.backgroundColor='#F90';
						
						Ti.App.Properties.setString('filter','all');
						Ti.App.Properties.setInt('range_from',0);
						Ti.App.Properties.setInt('range_to',20);
					});
					
					function getReports(){
						var vusername=Ti.App.Properties.getString('username');
						var vorder_by=Ti.App.Properties.getString('order_by');
						var vfilter=Ti.App.Properties.getString('filter');
						var vrange_from=Ti.App.Properties.getInt('range_from');
						var vrange_to=Ti.App.Properties.getInt('range_to');
						var vcommunity="all";
						alert(vusername+", "+vorder_by+", "+vfilter+", "+vrange_from+", "+vrange_to);
						
						
						
						var params={
							debug:		0,
							pretty_json:0,
							action:		3002,
							username:	vusername,
							order_by:	vorder_by,
							filter:		vfilter,
							range_from:	vrange_from,
							range_to:	vrange_to,
							community:	vcommunity
						};
						var Utiles=require('utiles');
						Utiles.refreshTitles(params);// reload
						//tabGroup0.close();
						
						
						
						
						
					}
					
					refreshBtn.addEventListener("click",getReports);
					loadMoreTitles.addEventListener("click",function(){
						Ti.App.Properties.setInt('range_from',Ti.App.Properties.getString('range_to'));
						Ti.App.Properties.setInt('range_to',parseInt(Ti.App.Properties.getString('range_to'))+parseInt(20));
						getReports();
					});
					//#################################################################################
					
					
					
					
					//------------------Tab Loading Title---------------------
					tabGroup0.addEventListener('focus', function(e){
						switch(e.index){
							case 0:{
								tabGroup0.title='      INICIO';
								break;
							}case 1:{
								tabGroup0.title='      CREAR REPORTE';
								break;
							}default:{
							}
						}
					});
					
					//---------------------General Menu------------------------
					var activity0=tabGroup0.activity;
					activity0.onCreateOptionsMenu = function(e){
						var menu = e.menu;
						
						var searchCommunities = menu.add({
							title:'Buscar Comunidades',
							//icon:'icon-tab-vote-menu-byDate.png',
							itemId:1
						})
						.addEventListener("click", function(e) {
							var Utiles=require('utiles');
							Utiles.route(null,401,0);// go to searchCommunities
							tabGroup0.activity.invalidateOptionsMenu();
						});
						
						var setPassword = menu.add({
							title:'Cambia tu contraseña',
							//icon:'icon-tab-vote-menu-byDate.png',
							itemId:2
						})
						.addEventListener("click", function(e) {
							var Utiles=require('utiles');
							Utiles.route(null,403,0);// go to setPassword
							tabGroup0.activity.invalidateOptionsMenu();
						});
						 
						 
						var logout=menu.add({
							top:30,
							title:"Salir",
							//icon:'icon-tab-vote-menu-byPopularity.png',
							itemId:3
						})
						.addEventListener("click", function(e) {
							Ti.App.Properties.setString('logged_in','false');
							Ti.App.Properties.setString('username','');
							var Utiles=require('utiles');
							Utiles.route(null,101,0);// go to welcome
							tabGroup0.close();
							
							
							tabGroup0.activity.invalidateOptionsMenu();
						});
					};
					
					////////////////////////////////////////////////////////////////////////////
					////////////////////// M E S S A G E S   F O R   U S E R ///////////////////
					if(tabGroup0.message!=null){
						var dialog0 = Ti.UI.createAlertDialog({
							title:  win0.message['title'],
							message:win0.message['message'],
							ok:     win0.message['accept']
						}).show();
					}
					
					////////////////////////////////////////////////////////////////////////////
					////////////////////// G E N E R A L   C O D E /////////////////////////////

					return tabGroup0;
				}

};