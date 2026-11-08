#!/bin/bash
mysql -uroot -p"$MYSQL_ROOT_PASSWORD" <<EOF
CREATE USER 'treebar_client'@'%' IDENTIFIED BY '${DB_PASSWORD}';
GRANT SELECT, INSERT, UPDATE ON treebar.* TO 'treebar_client'@'%';
FLUSH PRIVILEGES;
EOF