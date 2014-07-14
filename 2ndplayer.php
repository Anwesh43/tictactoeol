<?php
require('Connection.php');
if(isset($_POST['name']))
{
$st=$dbh->prepare("update tictable set nplayers=2,player2=? where id=?");
$st->execute(array($_POST['name'],$_POST['id']));
}
?>