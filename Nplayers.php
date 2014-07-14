<?php
require('Connection.php');
$q=$dbh->query('select * from tictable');
$q->setFetchMode(PDO::FETCH_ASSOC);
$a=0;
$id=0;
while($r=$q->fetch())
{
$a=$r['nplayers'];
$id=$r['id'];
}
echo $a.' '.$id;
?>