#/usr/bin/fish
set f_e_flag 0
set b_e_flag 0
set skip 0
set pub 0

for opt in $argv;
	if test "$opt" = "-f"
		set f_e_flag 1
	end
	if test "$opt" = "-b"
		set b_e_flag 1
	end
	if test "$opt" = "-s"
		set skip 1
	end
	if test "$opt" = "-p"
		set pub 1
	end
end

echo $f_e_flag

if test $f_e_flag -eq 1
	if test $skip -eq 0
		echo "building frontend"
		cd app && yarn build
		cd ..
	end	
	if test $pub -eq 1
		echo "publishing frontend"
		sudo yes | cp app/public/* /var/webapps/config-leroy -r
		sudo systemctl restart nginx

	end
end

if test $b_e_flag -eq 1
	if test $skip -eq 0
		echo "building backend"
		cd server && yarn build
		cd ..
	end
	if test $pub -eq 1
		echo "publishing backend"
		sudo yes | cp server/dist/* /var/webapps/config-leroy/server/ -R	
		sudo yes | cp server/node_modules /var/webapps/config-leroy -R
		sudo systemctl restart supervisor

	end
end
