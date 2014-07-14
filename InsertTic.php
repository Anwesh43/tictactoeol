<?php
require('Connection.php');
if(isset($_POST['x']))
{
$st=$dbh->prepare("update tictable set x=?,y=?,j=? where id=?");
$st->execute(array($_POST['x'],$_POST['y'],$_POST['j'],$_POST['id']));
}
?>