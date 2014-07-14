<?php

require('Connection.php');
if(isset($_GET['id']))
{
$st=$dbh->prepare('select * from tictable where id=?');
$re=$st->execute(array($_GET['id']));
$st->setFetchMode(PDO::FETCH_ASSOC);
$n=$st->rowCount();
$s=0;
while($r=$st->fetch())
{
	echo $r['x'].' '.$r['y'].' '.$r['j'];
	if($s!=$n-1)
	{
		echo ',';
	}
	$s++;
}
}
?>