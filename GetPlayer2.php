<?php
if(isset($_POST['id']))
{
	require('Connection.php');
	$st=$dbh->prepare('select * from tictable where id=?');
	$re=$st->execute(array($_POST['id']));
	$st->setFetchMode(PDO::FETCH_ASSOC);
	while($r=$st->fetch())
	echo $r['player2'];
}
?>