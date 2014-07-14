<?php
require('Connection.php');
$dbh->exec("drop table if exists tictable");
$dbh->exec("create table tictable(id integer auto_increment,x integer,y integer,j integer,player1 text,player2 text,nplayers integer,primary key(id))");
echo 'created';
?>