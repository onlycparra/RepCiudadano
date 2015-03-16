<?php
if(!$_POST) exit;
function prettyPrint($json){
    $result = '';
    $level = 0;
    $in_quotes = false;
    $in_escape = false;
    $ends_line_level = NULL;
    $json_length = strlen( $json );

    for( $i = 0; $i < $json_length; $i++ ) {
        $char = $json[$i];
        $new_line_level = NULL;
        $post = "";
        if( $ends_line_level !== NULL ) {
            $new_line_level = $ends_line_level;
            $ends_line_level = NULL;
        }
        if ( $in_escape ) {
            $in_escape = false;
        } else if( $char === '"' ) {
            $in_quotes = !$in_quotes;
        } else if( ! $in_quotes ) {
            switch( $char ) {
                case '}': case ']':
                    $level--;
                    $ends_line_level = NULL;
                    $new_line_level = $level;
                    break;

                case '{': case '[':
                    $level++;
                case ',':
                    $ends_line_level = $level;
                    break;

                case ':':
                    $post = " ";
                    break;

                case " ": case "\t": case "\n": case "\r":
                    $char = "";
                    $ends_line_level = $new_line_level;
                    $new_line_level = NULL;
                    break;
            }
        } else if ( $char === '\\' ) {
            $in_escape = true;
        }
        if( $new_line_level !== NULL ) {
            $result .= "\n".str_repeat( "\t", $new_line_level );
        }
        $result .= $char.$post;
    }

    return $result;
}

$debug=$_POST['debug'];
$prettyJSON=$_POST['pretty_json'];

if($debug||$prettyJSON) echo "<!doctype html>

<html lang='en'>
<head>
  <meta charset='utf-8'>
  
  <title>Reporte Ciudadano versión Web</title>
  <meta name='Reporte ciudadano' content='testing page for Reporte ciudadano'>
  <link rel='stylesheet' href='./bootstrap/css/bootstrap.css'>
  <link rel='shortcut icon' href='./bootstrap/appicon.png'>
  
  <!--[if lt IE 9]>
  <script src='http://html5shiv.googlecode.com/svn/trunk/html5.js'></script>
  <![endif]-->
</head>
<body>";
if($debug||$prettyJSON) echo "<div class='col-md-10 col-md-offset-1'>
  <div class='panel panel-danger'>
    <div class='panel-heading'>
      Output
    </div>
    <div class='panel-body'>
      <pre style=\"font-family: Consolas,monospace\">
";

$conn=mysqli_connect("localhost","mobile-user","mobile-user","repciudadano");
if (!$conn){die("Connection failed: ".mysqli_connect_error());}

switch($_POST['action']){
	
	
	
	
	case 1001:{ //Sign_up(username,email,first_name,last_name,password)
		if($debug) echo "Sign_up(username,email,first_name,last_name,password)\n\n";
		$post=array();
		
		//Create Activation code
		$chars=array("1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","L","M","N","P","R","S","T","U","V","X","Y","Z");
		for($i=0;$i<6;$i++){
			$code.=$chars[rand(0,30)];
		}
		
		$sql="
		INSERT INTO users(
			`username`,
			`email`,
			`first_name`,
			`last_name`,
			`password`,
			`activation_code`,
			`active`,
			`signup_date`
		)
		VALUES(
			'".$_POST[username]."',
			'".$_POST[email]."',
			'".$_POST[first_name]."',
			'".$_POST[last_name]."',
			'".$_POST[password]."',
			'".$code."',
			false,
			'".date("Y-m-d H:i:s")."'
		);";
		if($debug) echo $sql."\n";
		
		if( $_POST['username']!=''&&
			$_POST['email']!=''&&
			$_POST['first_name']!=''&&
			$_POST['last_name']!=''&&
			$_POST['password']!=''){
			if(mysqli_query($conn, $sql)) {
				if($debug) echo "Almacenado en DB\n\n";
				
				//Send Confirmation Mail
				$email=$_POST["email"];
				$subject="Completación de Registro";
				$message =file_get_contents("confirm_mail_A.txt");
				$message.=$code;
				$message.=file_get_contents("confirm_mail_B.txt");
				$headers=array();
				$headers[]="MIME-Version: 1.0";
				$headers[]="Content-type: text/plain; charset=uft-8";
				$headers[]="From: Reporte Ciudadano <administrador@reporteciudadano.cl>";
				$headers[]="Return-Path: Reporte Ciudadano <administrador@reporteciudadano.cl>";
				$headers[]="Reply-To: Reporte Ciudadano <administrador@reporteciudadano.cl>";
				$headers[]="Subject: {$subject}";
				$headers[]="X-Mailer: PHP/".phpversion();

				if(mail($email, $subject, $message, implode("\r\n", $headers))){
					if($debug) echo "Message sent.\n";
					if($debug) echo "E-mail: ".$email."\n";
					if($debug) echo "Subject: ".$subject."\n";
					if($debug) echo "Message: ".$message."\n\n";
					$post['action']=$_POST['action'];
					$post['status']="ok";
					$post['title']="Casi Listo";
					$post['accept']="Ok";
					$post['message']="ENVIO NO REAL, Te enviamos un código a ".$email." para activar tu cuenta";
					$post['data']=null;
				}else{
					if($debug) echo "The email to ".$email." has failed!\n";
					$sql="
					DELETE FROM users
					WHERE username='".$_POST['username']."'
					ORDER BY signup_date DESC
					LIMIT 1;";
					if($debug) echo $sql."\n";
					mysqli_query($conn, $sql);
					$post['action']=$_POST['action'];
					$post['status']="error";
					$post['title']="Lo Sentimos";
					$post['accept']="Está bien";
					$post['message']="No se pudo enviar mail de activación a ".$email.", intenta registrarte más tarde";
					$post['data']=null;
				}
			}else{
				if($debug) echo "Error:\n".mysqli_error($conn)."\n\n";
				if($debug) echo "Ya existe el usuario ".$_POST['username']." o ".$_POST['email']." ya está registrado!\n";
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Llegaste tarde";
				$post['accept']="Entiendo";
				$post['message']="Ya existe el usuario ".$_POST['username']." o tal vez ".$_POST['email']." ya está registrado, intenta registrarte con otro nombre de usuario";
				$post['data']=null;
			}
		}else{
			if($debug) echo "Campos necesarios nulos.\n";
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Campos sin completar";
			$post['accept']="Ok";
			$post['message']="Completa todos los campos para poder registrarte!";
			$post['data']=null;
		}
		
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 1002:{ //Activation code(username,act_code)
		if($debug) echo "Activation code(username,act_code)\n\n";
		$post=array();
		$sql="SELECT * FROM users WHERE `username`='".$_POST['username']."' AND ucase(`activation_code`)=ucase('".$_POST['act_code']."');";
		if($debug) echo $sql."\n";
		if(!$result=mysqli_query($conn,$sql)) if($debug) echo "Error:\n".mysqli_error($conn)."\n\n";
		
		switch(mysqli_num_rows($result)){
			case 0:{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Ups!";
				$post['accept']="Ok";
				$post['message']="Al parecer no existe tal combinación de usuario y código, por favor revisa que ingresaste bien el código de activación.";
				$post['data']=null;
				break;
			}case 1:{
				$row=mysqli_fetch_array($result);
				unset($result);
				if(!$row['active']){
					if($debug) echo "Usuario desactivado encontrado.\n";
					$sql="UPDATE users SET active=true WHERE `username`='".$_POST['username']."';";
					if($debug) echo $sql."\n";
					if(mysqli_query($conn, $sql)) {
						if($debug) echo $_POST['username']." activado\n\n";
						$post['action']=$_POST['action'];
						$post['status']="ok";
						$post['title']="Usuario activado";
						$post['accept']="Ok";
						$post['message']=$_POST['username'].", ahora tu cuenta está lista!";
						$post['data']=null;
					}else{
						if($debug) echo "Error activando ".$_POST['username'].":\n".mysqli_error($conn)."\n\n";
						$post['action']=$_POST['action'];
						$post['status']="error";
						$post['title']="Lo Sentimos";
						$post['accept']="Está bien";
						$post['message']="No se ha podido activar el usuario ".$_POST['username'].", por favor inténtelo más tarde";
						$post['data']=null;
					}
				}else{
					if($debug) echo "Usuario ya activado.\n";
					$post['action']=$_POST['action'];
					$post['status']="error";
					$post['title']="Usuario ya activado";
					$post['accept']="Ok";
					$post['message']="El usuario ".$_POST['username']." ya estaba activado, este proceso se hace sólo una vez :)";
					$post['data']=null;
				}
				unset($row);
				break;
			}default:{
				if($debug) echo "Error, más de un registro.\n";
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Lo Sentimos";
				$post['accept']="Está bien";
				$post['message']="Ha ocurrido un error interno, nuestros ratones mágicos lo arreglarán pronto";
				$post['data']=null;
				break;
			}
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 1003:{ //Login(username,password)
		if($debug) echo "Login(username,password)\n\n";
		$post=array();
		
		$sql="SELECT * FROM users WHERE `username`='".$_POST['username']."' AND `password`='".$_POST['password']."';";
		if($debug) echo $sql."\n";
		$result=mysqli_query($conn,$sql);
		
		switch(mysqli_num_rows($result)){
			case 0:{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Ups!";
				$post['accept']="Ok";
				$post['message']="No tenemos registros de esa combinación de usuario y contraseña, al parecer, uno o ambos están erroneos";
				$post['data']=null;
				break;
			}case 1:{
				$row=mysqli_fetch_array($result);
				unset($result);
				
				if($row['active']){
					$user=array();
					$user['username']=$row['username'];
					$user['email']=$row['email'];
					$user['first_name']=$row['first_name'];
					$user['last_name']=$row['last_name'];
					unset($row);
					
					$post['action']=$_POST['action'];
					$post['status']="ok";
					$post['title']="Ingreso correcto";
					$post['accept']="Ok";
					$post['message']="Ya estás dentro!";
					$post['data']=$user;
					unset($user);
				}else{
					$post['action']=$_POST['action'];
					$post['status']="error";
					$post['title']="No activado";
					$post['accept']="Ok";
					$post['message']="Debes activar la cuenta con el código que te enviamos a tu e-mail, ¡Tal vez terminó en el correo no deseado! Rescátalo";
					$post['data']=null;
				}
				break;
			}default:{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Ups!";
				$post['accept']="Ok";
				$post['message']="Ah ocurrido un error interno, nuestras hadas lo repararán pronto";
				$post['data']=null;
				break;
			}
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 1004:{ //Set_Password(username,password,new_password)
		if($debug) echo "Set_Password(username,password,new_password)\n\n";
		
		$post=array();
		$sql="
		UPDATE users 
		SET password='".$_POST['new_password']."' 
		WHERE username='".$_POST['username']."' 
			AND password='".$_POST['password']."';";
		if($debug) echo $sql."\n";
		
		if(mysqli_query($conn,$sql)){
			$post['action']=$_POST['action'];
			$post['status']="ok";
			$post['title']="Cambio Realizado";
			$post['accept']="Ok";
			$post['message']="Contraseña correctamente actualizada";
			$post['data']=null;
		}else{
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Lo Sentimos";
			$post['accept']="Está bien";
			$post['message']="No se pudo cambiar la contraseña, por favor, inténtalo más tarde";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 1005:{ //Logout NOT IMPLEMENTED YET
		
		break;
	}
	
	
	case 2002:{ //Set_Part_of(username,community_id)
		if($debug) echo "Set_Part_of(username,community_id)\n\n";
		
		$post=array();
		$sql="
		INSERT INTO part_of(`user_id`,`community_id`,`authority`,`description`)
			SELECT users.user_id,
			".$_POST['community_id'].",
			false,
			'Miembro de la comunidad'
			FROM users
			WHERE users.username='".$_POST['username']."';";
		if($debug) echo $sql."\n";
		
		if(mysqli_query($conn,$sql)){
			$sql="
			SELECT community_name
			FROM communities
			WHERE community_id=".$_POST['community_id'].";";
			$result=mysqli_query($conn,$sql);
			$row=mysqli_fetch_array($result);
			$post['action']=$_POST['action'];
			$post['status']="ok";
			$post['title']="Estás dentro!";
			$post['accept']="Ok";
			$post['message']="Ya eres parte de ".$row['community_name'];
			$post['data']=null;
		}else{
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Ups!";
			$post['accept']="Ok";
			$post['message']="Al parecer, ya eras parte de la comunidad";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 2001:{ //Get_communities(community_name)
		if($debug) echo "Get_communities(community_name)\n\n";
		$post=array();
		$sql="
		SELECT *
		FROM communities 
		WHERE lcase(`community_name`) LIKE lcase('%".$_POST['community_name']."%');";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		if(mysqli_num_rows($result)){
			$communities=array();
			while($row=mysqli_fetch_array($result)){
				$community=array();
				$community['community_id']  =$row['community_id'];
				$community['community_name']=$row['community_name'];
				$community['country']       =$row['country'];
				$community['state']         =$row['state'];
				$community['city']          =$row['city'];
				$community['description']   =$row['description'];
				//if($debug) echo "community:\nSTART\n".implode("\n",$community)."\nEND\n\n";
				$communities[]=$community;
				unset($row);
				unset($community);
			}
			$post['action']=$_POST['action'];
			$post['status']="ok";
			$post['title']="Lista de Resultados";
			$post['accept']="Ok";
			$post['message']="Listado de Comunidades encontradas";
			$post['data']=$communities;
		}else{
			if($debug) echo "No se encontraron comunidades con ".$_POST['community_name']."\n";
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Sin resultados";
			$post['accept']="Entiendo";
			$post['message']="No se encontraron comunidades con ".$_POST['community_name'].", por favor revisa tu ortografía (descuida de las mayúsculas)";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	} 
	case 2003:{ //Get_MY_communities(username)
		if($debug) echo "Get_MY_communities(username)\n\n";
		$post=array();
		$sql="
		SELECT *
		FROM communities
		INNER JOIN(
			SELECT community_id
			FROM part_of
			WHERE part_of.user_id=(
				SELECT users.user_id
				FROM users
				WHERE users.username='".$_POST['username']."'
			)
		) my_communities
		ON communities.community_id=my_communities.community_id;";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		if(mysqli_num_rows($result)){
			$communities=array();
			while($row=mysqli_fetch_array($result)){
				$community=array();
				$community['community_id']  =$row['community_id'];
				$community['community_name']=$row['community_name'];
				$community['country']       =$row['country'];
				$community['state']         =$row['state'];
				$community['city']          =$row['city'];
				$community['description']   =$row['description'];
				$communities[]=$community;
				unset($row);
				unset($community);
			}
			$post['action']=$_POST['action'];
			$post['status']="ok";
			$post['title']="Tus Comunidades";
			$post['accept']="Ok";
			$post['message']="Este es el listado de comunidades de las que eres parte";
			$post['data']=$communities;
		}else{
			if($debug) echo "No se encuentran comunidades asociadas a ".$_POST['username']."\n";
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Ninguna Comunidad";
			$post['accept']="Entiendo";
			$post['message']="Al parecer no te has registrado en ninguna comunidad";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	
	
	
	
	case 3001:{ //Create Report(username,community_id,title,problem,proposal)
		if($debug) echo "Create Report(username,community_id,title,problem,proposal)\n\n";
		
		$post=array();
		$sql="
		SELECT COUNT(report_community) same_community
		FROM(
			SELECT'".$_POST['community_id']."' report_community
		) new_report
		INNER JOIN(
			SELECT community_id
			FROM part_of
			WHERE user_id=(
				SELECT users.user_id
				FROM users
				WHERE users.username='".$_POST['username']."'
			)
		) user_communities
		ON new_report.report_community=user_communities.community_id;";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_array($result);
		if($row[0]>0){
			if($debug) echo "Miembro de la comunidad en que Reporta\n";
			$sql="
			INSERT INTO reports(
				`author_id`,
				`community_id`,
				`title`,
				`problem`,
				`proposal`,
				`publication_date`,
				`bad_report_votes`,
				`visible`
			)
				SELECT users.user_id,
				".$_POST['community_id'].",
				'".$_POST['title']."',
				'".$_POST['problem']."',
				'".$_POST['proposal']."',
				'".date("Y-m-d H:i:s")."',
				0,
				true
			FROM users
			WHERE users.username='".$_POST['username']."';";
			if($debug) echo $sql."\n";
			
			if(mysqli_query($conn,$sql)){
				$post['action']=$_POST['action'];
				$post['status']="ok";
				$post['title']="Reporte Publicado";
				$post['accept']="Ok";
				$post['message']="Tu reporte ha sido publicado";
				$post['data']=null;
			}else{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Lo sentimos";
				$post['accept']="Está bien";
				$post['message']="Lo sentimos, no hemos podido publicar: ".$_POST['title']." por favor inténtelo más tarde";
				$post['data']=null;
			}
		}else{
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="No se pudo publicar";
			$post['accept']="Entiendo";
			$post['message']="Al parecer, no eres parte de la comunidad en la que intentas reportar.";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 3002:{ //Get_Reports(username[,community_id],filter,order_by,range_from,range_to)
		if($debug) echo "Get_Reports(username[,community_id],filter,order_by,range_from,range_to)\n\n";
		$post=array();
		
		$sql="
		SELECT 
			reports.report_id,
			authors.author_name,
			reports.community_id,
			reports.title,
			reports.problem,
			reports.proposal,
			reports.image,
			reports.publication_date,
			reports.bad_report_votes,
			reports.visible,
			voting.votes_count
		FROM reports
		LEFT JOIN (
			SELECT votes.report_id,COUNT(votes.user_id) votes_count
			FROM votes
			GROUP BY votes.report_id
		)voting
		ON reports.report_id=voting.report_id
		INNER JOIN (
			SELECT users.user_id,users.username author_name
			FROM users
			ORDER BY RAND()
		)authors
		ON reports.author_id=authors.user_id
		WHERE publication_date LIKE '".date("Y")."%' ";
		
		if(!($_POST['community_id']=='all'||$_POST['community_id']=="")){
			$sql.="AND reports.community_id=".$_POST['community_id']." ";
		}else{
			$sql.="AND reports.community_id IN(
				SELECT part_of.community_id
				FROM part_of
				WHERE part_of.user_id=(
					SELECT users.user_id
					FROM users
					WHERE users.username='".$_POST['username']."'
				)
			) ";
		}
		
		switch ($_POST['filter']) {
			case 'only_mine':{
				$sql.="
				AND authors.author_name='".$_POST['username']."' ";
				break;
			}
			case 'only_voted_by_me':{
				$sql.="
				AND reports.report_id IN(
					SELECT votes.report_id
					FROM votes
					WHERE votes.user_id=(
						SELECT users.user_id
						FROM users
						WHERE users.username='".$_POST['username']."'
					)
				) ";
			}
			case 'all':{
				//just all
			}default:{
				//all again
			}
		}
		
		switch ($_POST['order_by']) {
			case 'by_day':{
				$sql.="
				ORDER BY publication_date DESC ";
				break;
			}
			case 'by_votes':{
				$sql.="
				ORDER BY votes_count DESC ";
				break;
			}
			case 'by_random':{
				// nothing
			}default:{
				//nothing again
			}
		}
		
		$sql.="
		LIMIT ".$_POST['range_from'].",".$_POST['range_to'].";";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		if(!empty($result)){
			if(mysqli_num_rows($result)){
				$reports_list=array();
				while($row=mysqli_fetch_array($result)){
					$single_report=array();
					$single_report['report_id']			=$row['report_id'];
					$single_report['author_name']		=$row['author_name'];
					$single_report['community_id']		=$row['community_id'];
					$single_report['title']				=$row['title'];
					$single_report['problem']			=$row['problem'];
					$single_report['proposal']			=$row['proposal'];
					$single_report['image']				=$row['image'];
					$single_report['publication_date']	=$row['publication_date'];
					$single_report['bad_report_votes']	=$row['bad_report_votes'];
					$single_report['visible']			=$row['visible'];
					$single_report['votes_count']		=$row['votes_count'];
					if($single_report['votes_count']==null) $single_report['votes_count']=0;
					//if($debug) echo "single_report:\nSTART\n".implode("\n",$single_report)."\nEND\n\n";
					$reports_list[]=$single_report;
					unset($row);
					unset($single_report);
				}
				$post['action']=$_POST['action'];
				$post['status']="ok";
				$post['title']="Lista de Reportes";
				$post['accept']="Ok";
				$post['message']="Ha llegado la hora de votar!";
				$post['data']=$reports_list;
			}else{
				if($debug) echo "No se encontraron Reportes\n";
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="No se encontraron Reportes";
				$post['accept']="Ok";
				$post['message']="No se encontraron Reportes, ¿Ya eres miembro de alguna comunidad? si no, entra a Mis Comunidades en el menú";
				$post['data']=null;
			}
		}else{
			if($debug) echo "No se encontraron Reportes\n";
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="No se encontraron Reportes";
			$post['accept']="Ok";
			$post['message']="No se encontraron Reportes, ¿Ya eres miembro de alguna comunidad? si no, entra a Mis Comunidades en el menú";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	
	
	
	
	case 4001:{ //Vote(username,report_id)
		if($debug) echo "Vote(username,report_id)\n\n";
		$post=array();
		
		$sql="
		SELECT
			part_of_view.user_id,
			reports_view.author_id,
			COUNT(part_of_view.community_id) same_community
		FROM(
			SELECT 
				part_of.user_id,
				part_of.community_id
			FROM part_of
			WHERE part_of.user_id=(
				SELECT users.user_id
				FROM users
				WHERE users.username='".$_POST['username']."'
			)
		) part_of_view
		INNER JOIN(
			SELECT
				reports.author_id,
				reports.community_id
			FROM reports
			WHERE reports.report_id=".$_POST['report_id']."
		) reports_view
		ON part_of_view.community_id=reports_view.community_id;";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_array($result);
		if($row['same_community']>0){
			if($debug) echo "Miembro de la comunidad en que vota\n";
			if($row['user_id']!=$row['author_id']){
				$sql="
				INSERT INTO votes(
					votes.user_id,
					votes.report_id,
					votes.voting_date
				)
				SELECT users.user_id,
				".$_POST['report_id'].",
				'".date("Y-m-d H:i:s")."'
				FROM users
				WHERE users.username='".$_POST['username']."';";
				if($debug) echo $sql."\n";
				
				if(mysqli_query($conn,$sql)){
					$post['action']=$_POST['action'];
					$post['status']="ok";
					$post['title']="Voto Emitido";
					$post['accept']="Ok";
					$post['message']="Voto Emitido";
					$post['data']=null;
				}else{
					$post['action']=$_POST['action'];
					$post['status']="error";
					$post['title']="Lo Sentimos";
					$post['accept']="Está bien";
					$post['message']="No se pudo emitir el Voto, inténtalo más tarde.";
					$post['data']=null;
				}
			}else{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Poco ético";
				$post['accept']="Nunca más";
				$post['message']="No puedes votar por tu propio reporte, eso es poco ético :)";
				$post['data']=null;
			}
			
		}else{
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Ups!";
			$post['accept']="Está bien";
			$post['message']="No eres miembro de la comunidad en que intentas votar";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	case 4002:{ //Bad Vote(username,report_id)
		if($debug) echo "Bad Vote(username,report_id)\n\n";
		$post=array();
		
		$sql="
		SELECT
			part_of_view.user_id,
			reports_view.author_id,
			COUNT(part_of_view.community_id) same_community
		FROM(
			SELECT 
				part_of.user_id,
				part_of.community_id
			FROM part_of
			WHERE part_of.user_id=(
				SELECT users.user_id
				FROM users
				WHERE users.username='".$_POST['username']."'
			)
		) part_of_view
		INNER JOIN(
			SELECT
				reports.author_id,
				reports.community_id
			FROM reports
			WHERE reports.report_id=".$_POST['report_id']."
		) reports_view
		ON part_of_view.community_id=reports_view.community_id;";
		if($debug) echo $sql."\n";
		
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_array($result);
		if($row['same_community']>0){
			if($debug) echo "Miembro de la comunidad en que vota\n";
			if($row['user_id']!=$row['author_id']){
				$sql="
				UPDATE reports
				SET reports.bad_report_votes=bad_report_votes+1
				WHERE reports.report_id=".$_POST['report_id'].";";
				if($debug) echo $sql."\n";
				
				if(mysqli_query($conn,$sql)){
					$post['action']=$_POST['action'];
					$post['status']="ok";
					$post['title']="Voto Emitido";
					$post['accept']="Ok";
					$post['message']="Voto de Mal reporte Emitido";
					$post['data']=null;
				}else{
					$post['action']=$_POST['action'];
					$post['status']="error";
					$post['title']="Lo Sentimos";
					$post['accept']="Está bien";
					$post['message']="No se pudo emitir el Voto de Mal reporte, inténtalo más tarde";
					$post['data']=null;
				}
			}else{
				$post['action']=$_POST['action'];
				$post['status']="error";
				$post['title']="Poco ético";
				$post['accept']="Nunca más";
				$post['message']="No puedes votar por tu propio reporte, eso es poco ético :)";
				$post['data']=null;
			}
			
		}else{
			$post['action']=$_POST['action'];
			$post['status']="error";
			$post['title']="Ups!";
			$post['accept']="Está bien";
			$post['message']="Al parecer, no eres miembro de la comunidad en que intentas votar";
			$post['data']=null;
		}
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		break;
	}
	
	
	
	
	default:{
		if($debug) echo "Wrong action code\n\n";
		$post['action']=$_POST['action'];
		$post['status']="error";
		$post['title']="Error de código";
		$post['accept']="Ok";
		$post['message']="Codigo de acción erroneo";
		$post['data']=null;
		if($debug||$prettyJSON){
			echo "\n---- JSON ----\n".prettyPrint(json_encode($post));
		}else{
			echo json_encode($post);
		}
		exit;
	}
}

if($debug||$prettyJSON) echo "      </pre>
    </div>
  </div>
</div>
</body>
</html>";
?>