<?php
require('Connection.php');
if(isset($_POST['name']))
{
$st=$dbh->prepare("insert into tictable(x,y,j,player1,player2,nplayers) values(0,0,0,?,'',1)");
$st->execute(array($_POST['name']));
}
?>