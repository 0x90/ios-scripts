var normal = "SOCKS 127.0.0.1:4321";
var blackhole = "PROXY 127.0.0.1:1234";

var fullParse = 0;	// Transmet tout.
var pathParse = 1;	// Transmet le nom du serveur et le chemin mais
			// pas les arguments CGI ni les ancres.
var parseURL = pathParse;

// Variable de compteur pour initaliser les tableaux
var i= 0;

// l'URl est acceptée si le nom du serveur se termine par l'un des domaines suivants
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE À LA FIN DES VALEURS
var GoodDomains = new Array();
i=0;

GoodDomains[i++] = "dareyourmind.net";

// Ajoutez ici tout bon réseau, selon le format :
// IP, virgule, [espace(s),] masque, point-virgule
var GoodNetworks = new Array();
i=0;

//GoodNetworks[i++] = "192.168.0.0,	255.255.0.0";	// NRIP

// Ajoutez ici tout mauvais réseau, selon le format :
// IP, virgule, [espace(s),] masque, point-virgule
var BadNetworks = new Array();
i=0;

BadNetworks[i++] = "62.161.94.0,	255.255.255.0";
BadNetworks[i++] = "72.55.138.94,	255.255.255.0";

// l'URl est refusée si le nom du serveur se termine par l'un des domaines suivants
// sauf s'il a été jugé acceptable par "GoodDomains" ou "GoodNetworks".
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE À LA FIN DES VALEURS.
var BadDomains = new Array();
i=0;

BadDomains[i++] = "yllier.comlu.com";
BadDomains[i++] = ".les-horaires.fr";
BadDomains[i++] = "247realmedia.com";
BadDomains[i++] = "a2dfp.net";
BadDomains[i++] = "a4mob.com";
BadDomains[i++] = "ad4you.org";
BadDomains[i++] = "admob.com";
BadDomains[i++] = "adnext.fr";
BadDomains[i++] = "adulthosting.com";
BadDomains[i++] = "adwhirl.com";
BadDomains[i++] = "affilipub.com";
BadDomains[i++] = "all.google.domains";
BadDomains[i++] = "allosponsor.com";
BadDomains[i++] = "assoc-amazon.com";
BadDomains[i++] = "au2m8.com";
BadDomains[i++] = "autoreflex.com";
BadDomains[i++] = "avenir-affiliation.fr";
BadDomains[i++] = "awltovhc.com";
BadDomains[i++] = "blogbang.com";
BadDomains[i++] = "box.shopoon.fr";
BadDomains[i++] = "buysellads.com";
BadDomains[i++] = "cashtrafic.com";
BadDomains[i++] = "chitika.net";
BadDomains[i++] = "clickintext.net";
BadDomains[i++] = "connect.cloudcell.com";
BadDomains[i++] = "contextweb.com";
BadDomains[i++] = "directtrack.com";
BadDomains[i++] = "easy-dating.org";
BadDomains[i++] = "fastclick.net";
BadDomains[i++] = "industrybrains.com";
BadDomains[i++] = "infolinks.com";
BadDomains[i++] = "ingameads.gameloft.com";
BadDomains[i++] = "kontera.com";
BadDomains[i++] = "lduhtrp.net";
BadDomains[i++] = "limasky.com";
BadDomains[i++] = "metrics.apple.com";
BadDomains[i++] = "nextstat.com";
BadDomains[i++] = "ohm.adstronic.net";
BadDomains[i++] = "outils.yesmessenger.com";
BadDomains[i++] = "pagead2.googlesyndication.com";
BadDomains[i++] = "pro-market.net";
BadDomains[i++] = "promobenef.com";
BadDomains[i++] = "pubdirecte.com";
BadDomains[i++] = "reactivpub.fr";
BadDomains[i++] = "remotejr.com";
BadDomains[i++] = "reussissonsensemble.fr";
BadDomains[i++] = "ringtoneexpressions.com";
BadDomains[i++] = "sbx.pagesjaunes.fr";
BadDomains[i++] = "script.banstex.com";
BadDomains[i++] = "smart.allocine.fr";
BadDomains[i++] = "sochr.com";
BadDomains[i++] = "softonic.fr";
BadDomains[i++] = "specificclick.net";
BadDomains[i++] = "static.p-comme-performance.com";
BadDomains[i++] = "tag.regieci.com";
BadDomains[i++] = "tootrash.com";
BadDomains[i++] = "tqlkg.com";
BadDomains[i++] = "track.effiliation.com";
BadDomains[i++] = "veoxa.com";
BadDomains[i++] = "video.unrulymedia.com";
BadDomains[i++] = "weborama.fr";
BadDomains[i++] = "wedoo.com";
BadDomains[i++] = "wipub.com";
BadDomains[i++] = "xiti.com";
BadDomains[i++] = "yceml.net";
BadDomains[i++] = "zodttd.com";
BadDomains[i++] = "mydas.mobi";
BadDomains[i++] = "adxpose.com";
BadDomains[i++] = "adbrite.com";
BadDomains[i++] = "qwapi.com";
BadDomains[i++] = ".doubleclick.net";
BadDomains[i++] = "wobble.s3.amazonaws.com";
BadDomains[i++] = "alexa-sitestats.s3.amazonaws.com";
BadDomains[i++] = "entrecard.s3.amazonaws.com";
BadDomains[i++] = "estat.com";
BadDomains[i++] = "estats.com";
BadDomains[i++] = "casino.com";
BadDomains[i++] = "banner.com";
BadDomains[i++] = "casalemedia.com";
BadDomains[i++] = "247realmedia.com";
BadDomains[i++] = "focalink.com";
BadDomains[i++] = ".branchez-vous.com";
BadDomains[i++] = "adserver.com";
BadDomains[i++] = "ad-inside.com";
BadDomains[i++] = "infolinks.com";
BadDomains[i++] = "limneos.net";
BadDomains[i++] = "activate.adobe.com";
BadDomains[i++] = "practivate.adobe.com";
BadDomains[i++] = "ereg.adobe.com";
BadDomains[i++] = "activate.wip3.adobe.com";
BadDomains[i++] = "wip3.adobe.com";
BadDomains[i++] = "3dns-3.adobe.com";
BadDomains[i++] = "3dns-2.adobe.com";
BadDomains[i++] = "adobe-dns.adobe.com";
BadDomains[i++] = "adobe-dns-2.adobe.com";
BadDomains[i++] = "adobe-dns-3.adobe.com";
BadDomains[i++] = "ereg.wip3.adobe.com";
BadDomains[i++] = "activate-sea.adobe.com";
BadDomains[i++] = "wwis-dubc1-vip60.adobe.com";
BadDomains[i++] = "activate-sjc0.adobe.com";


// l'URl est refusée si elle contient l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodNetworks".
// vous pouvez utiliser des expressions régulières.

var BadURL_Parts = new Array();
i=0;

BadURL_Parts[i++] = "/AD-INSIDE/images/";
BadURL_Parts[i++] = "/adrollo-custom-images/";
BadURL_Parts[i++] = "/adlog\.php";
BadURL_Parts[i++] = "/ads/";
BadURL_Parts[i++] = "/admaster\.";
BadURL_Parts[i++] = "/AdImages/";
BadURL_Parts[i++] = "\.adbox";
BadURL_Parts[i++] = "/adserver\.";
BadURL_Parts[i++] = "/ajs\.php";
BadURL_Parts[i++] = "\.bidwar";
BadURL_Parts[i++] = "footer_ad";
BadURL_Parts[i++] = "sidebar-ads";
BadURL_Parts[i++] = "\.ad-text";
BadURL_Parts[i++] = "\.ad_(left|right|center)";
BadURL_Parts[i++] = "/mb/commerce/purchase_form\.php";
BadURL_Parts[i++] = "/300x250";
BadURL_Parts[i++] = "/ad\.php";
BadURL_Parts[i++] = "/adunit\.";
BadURL_Parts[i++] = "/mac-ad";
BadURL_Parts[i++] = "header_ad";
BadURL_Parts[i++] = "/www/delivery/";
BadURL_Parts[i++] = "sbr.php";

// l'URl est refusée si le nom du serveur contient l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodDomains" ou "GoodNetworks".
// vous pouvez utiliser des expressions régulières
var BadHostParts = new Array();
i=0;

BadHostParts[i++] = "banner-ad";

// l'URl est refusée si un des noms commence par l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodNetworks".
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE AU DÉBUT DES VALEURS.
var BadURL_WordStarts = new Array();
i=0;

BadURL_WordStarts[i++] = "adsense";

// l'URl est refusée si le nom du serveur commence par l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodNetworks".
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE AU DÉBUT DES VALEURS.
var BadHostWordStarts = new Array();
i=0;

BadHostWordStarts[i++] = "servedby\.";
BadHostWordStarts[i++] = "oas";
BadHostWordStarts[i++] = "google-analytics";
BadHostWordStarts[i++] = "ad[s]?\.";
BadHostWordStarts[i++] = "bwp\.";
BadHostWordStarts[i++] = "adserv";
BadHostWordStarts[i++] = "affiliate";
BadHostWordStarts[i++] = "banner\.";
BadHostWordStarts[i++] = "banners\.";
BadHostWordStarts[i++] = "adimages\.";
BadHostWordStarts[i++] = "gcirm\.";
BadHostWordStarts[i++] = "ad[s]?[0-9]";
BadHostWordStarts[i++] = "adserv";
BadHostWordStarts[i++] = "ads-";

// l'URl est refusée si un des noms finit par l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodNetworks".
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE À LA FIN DES VALEURS.
var BadURL_WordEnds = new Array();
i=0;

BadURL_WordEnds[i++] = "(\-|/|_)ad[0-9]*\.(jpg|gif|png)";
BadURL_WordEnds[i++] = "/adlog\.php*";

// l'URl est refusée si le nom du serveur finit par l'un des mots suivants
// sauf si elle a été jugée acceptable par "GoodNetworks".
// ATTENTION : NE PLACEZ PAS D'EXPRESSION RÉGULIÈRE À LA FIN DES VALEURS.
var BadHostWordEnds = new Array();
i=0;

BadHostWordEnds[i++] = "tracker";

///////////////////////////
// Set up GoodDomainRegx //
///////////////////////////

for(i in GoodDomains) {
	GoodDomains[i] = GoodDomains[i].split(/\./).join("\\.");
}

var GoodDomainRegx = new RegExp("(" + GoodDomains.join("|") + ")$", "i");


//////////////////////////
// Set up BadDomainRegx //
//////////////////////////

for(i in BadDomains) {
	BadDomains[i] = BadDomains[i].split(/\./).join("\\.");
}

var BadDomainRegx = new RegExp("(" + BadDomains.join("|") + ")$", "i");


////////////////////////////
// Set up BadHostPartRegx //
////////////////////////////

for(i in BadHostParts) {
	BadHostParts[i] = BadHostParts[i].split(/\./).join("\\.");
}

var BadHostPartRegx = new RegExp(BadHostParts.join("|"), "i");


/////////////////////////////////
// Set up BadHostWordStartRegx //
/////////////////////////////////

for(i in BadHostWordStarts) {
	BadHostWordStarts[i] = BadHostWordStarts[i].split(/\./).join("\\.");
}

var BadHostWordStartRegx = new RegExp("(^|[^a-z0-9])(" + BadHostWordStarts.join("|") + ")", "i");


///////////////////////////////
// Set up BadHostWordEndRegx //
///////////////////////////////

for(i in BadHostWordEnds) {
	BadHostWordEnds[i] = BadHostWordEnds[i].split(/\./).join("\\.");
}

var BadHostWordEndRegx = new RegExp("(" + BadHostWordEnds.join("|") + ")([^a-z0-9]|$)", "i");


////////////////////////////
// SET UP BadURL_PartRegx //
////////////////////////////

for(i in BadURL_Parts) {
	BadURL_Parts[i] = BadURL_Parts[i].split(/\./).join("\\.");
}

var BadURL_PartRegx =  new RegExp(BadURL_Parts.join("|"), "i");


/////////////////////////////////
// SET UP BadURL_WordStartRegx //
/////////////////////////////////

for(i in BadURL_WordStarts) {
	BadURL_WordStarts[i] = BadURL_WordStarts[i].split(/\./).join("\\.");
}
var BadURL_WordStartRegx =  new RegExp("[^a-z0-9](" + BadURL_WordStarts.join("|") + ")", "i");

///////////////////////////////
// SET UP BadURL_WordEndRegx //
///////////////////////////////

for(i in BadURL_WordEnds) {
	BadURL_WordEnds[i] = BadURL_WordEnds[i].split(/\./).join("\\.");
}

var BadURL_WordEndRegx =  new RegExp("(" + BadURL_WordEnds.join("|") + ")([^a-z0-9]|$)", "i");


///////////////////////////////////////////
// Define the IsIPAddr function and vars //
///////////////////////////////////////////

var IpAddrRegx = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

function IsNumIpAddr(host)
{
	var ipAry = host.match(IpAddrRegx);
	var isIPValid = false;

	if (ipAry) {
		isIPValid = true;
		for( i = 1; i <= 4; i++) {
			if (ipAry[i] >= 256) {
				isIPValid = false;
			}
		}
	}

	return isIPValid;
}

//////////////////////////////////
// Define the FindProxyFunction //
//////////////////////////////////

function FindProxyForURL(url, host)
{
	var TestResult;
	var FuncResult = normal;
	var str = "";
	var i = "";
	var tmpNet;
	var IsNumIP = IsNumIpAddr(host);
	var HasIPv4Address = true;
	var IPv4Address;

	///////////////////////////////////////////////////////////////////////
	// FTP patch for privoxy - Elric Scott schemalogic.com               //
	// At one time I recommended privoxy.  Since this is a security hole //
	// I recommend using Firefox + NoScript instead. See WARNING.txt     //
	///////////////////////////////////////////////////////////////////////

//	if (url.substr(0,4) == "ftp:") {
//		return "DIRECT";
//	}

	///////////////////////////////////////////////////////////////////////
	// Remove any anchors and arguments from the url if we are only      //
	// looking at the path part                                          //
	///////////////////////////////////////////////////////////////////////

	if (parseURL == pathParse) {
		str = url.match(/^[^\?#]*/);
		if (str != url) {
			url = str;
		}
	}

	///////////////////////////////////////////////////////////////////////
	// PASS LIST:   domains matched here will always be allowed.         //
	///////////////////////////////////////////////////////////////////////

	if (!IsNumIP && (TestResult = GoodDomainRegx.exec(host))) {
		return normal;
	}

	///////////////////////////////////////////////////////////////////////
	// Check to make sure we can get an IPv4 address from the given host //
	// name.  If we cannot do that then skip the Networks tests.         //
	///////////////////////////////////////////////////////////////////////

	if (IsNumIP) {
		IPv4Address = host;
	}
	else {
		if (isResolvable(host)) {
			IPv4Address = dnsResolve(host);
		}
		else {
			HasIPv4Address = false;
		}
	}

	if (HasIPv4Address) {
		///////////////////////////////////////////////////////////////////////
		// If the IP translates to one of the GoodNetworks we pass it        //
		// since it is considered to be safe.                                //
		///////////////////////////////////////////////////////////////////////

		for (i in GoodNetworks) {
			tmpNet = GoodNetworks[i].split(/,\s*/);
			if (isInNet(IPv4Address, tmpNet[0], tmpNet[1])) {
				return normal;
			}
		}

		///////////////////////////////////////////////////////////////////////
		// If the IP translates to one of the BadNetworks we fail it         //
		// since it is not considered to be safe.                            //
		///////////////////////////////////////////////////////////////////////

		for (i in BadNetworks) {
			tmpNet = BadNetworks[i].split(/,\s*/);
			if (isInNet(IPv4Address, tmpNet[0], tmpNet[1])) {
				return blackhole;
			}
		}
	}

	//////////////////////////////////////////////////////////
	// BLOCK LIST:	stuff matched here here will be blocked //
	//////////////////////////////////////////////////////////

	if (!IsNumIP && (TestResult = BadDomainRegx.exec(host))) {
		return blackhole;
	}
	if (!IsNumIP && (TestResult = BadHostPartRegx.exec(host))) {
		return blackhole;
	}
	if (TestResult = BadHostWordStartRegx.exec(host)) {
		return blackhole;
	}
	if (TestResult = BadHostWordEndRegx.exec(host)) {
		return blackhole;
	}
	if (TestResult = BadURL_PartRegx.exec(url)) {
		return blackhole;
	}
	if (TestResult = BadURL_WordStartRegx.exec(url)) {
		return blackhole;
	}
	if (TestResult = BadURL_WordEndRegx.exec(url)) {
		return blackhole;
	}

	return normal;
}

