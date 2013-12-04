#!/usr/bin/env bash

## conf

user=''
pass=''
downloadFolder=''

UserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0.1) Gecko/20100101 Firefox/9.0.1'
loginUrl='http://www.t411.me/users/login/'

## params : torrent url

[ $# -lt 1 ] && 
{
	echo 'usage: torrentUrl like
http://www.t411.me/torrents/download/?id=......'
	exit 2
}
torrentUrl="$1"
if [[ $torrentUrl =~ t411 ]]
then
## login - save cookies

wget \
	--user-agent="$UserAgent" \
	--save-cookies cookies.txt \
	--post-data "login=$user&password=$pass" \
	-O /dev/null \
	"$loginUrl"

[ $? -ne 0 ] && 
{
	rm -f cookies.txt
	echo 'FAIL login'
	exit 1
}

## download torrent - reuse previous cookies

torrentId=`echo "$torrentUrl" | sed 's/.*\?id=//'`
torrentFile="$downloadFolder/$torrentId.torrent"

wget \
	--user-agent="$UserAgent" \
	--load-cookies cookies.txt \
	--referer "$loginUrl" \
	-O "$torrentFile" \
	"$torrentUrl" 

[ $? -ne 0 ] && 
{
	rm -f cookies.txt
	echo 'FAIL download'
	exit 1
}

## ok 

rm -f cookies.txt
echo "torrent saved: $torrentFile";
else
#it's a normal torrent
wget -P $downloadFolder "$torrentUrl"
fi
