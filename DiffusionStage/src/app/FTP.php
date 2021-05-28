<?php
$ftp = ftp_connect("192.168.1.2", "21") or exit('Erreur : connexion au serveur FTP impossible.');
ftp_login($ftp, "MTredez", "MT2021MT!");
ftp_close($ftp);
?>