#!/usr/bin/perl
# Time-stamp: "2005-08-19 01:17:45 ADT"
#
# desc{    black-hole proxy server    }    sburke@cpan.org
#

use strict;
use IO::Socket qw(:DEFAULT :crlf);
use constant MY_PORT => 7275;
use constant DEBUG => 0;

my $image_type = 'image/gif';
my $image = "null.gif";

{
    if(open(IN, "<$image")) {
	binmode(IN);
	local $/;
	$image = join '',
	  "HTTP/1.0 200 OK", CRLF,
	  "Content-Type: ", $image_type, CRLF, CRLF,
	  <IN>;
	close(IN);
    } else {
        # Default image:
	$image = join '',
	  "HTTP/1.0 200 OK", CRLF,
	  "Content-Type: ", $image_type, CRLF, CRLF,
	  # 1x1 image: transparent.
		  "\x47\x49\x46\x38\x39\x61\x01",
		  "\x00\x01\x00\x80\x00\x00\x00",
		  "\x00\x00\x00\x00\x00\x21\xF9",
		  "\x04\x01\x00\x00\x00\x00\x2C",
		  "\x00\x00\x00\x00\x01\x00\x01",
		  "\x00\x00\x02\x02\x44\x01\x00",
		  "\x3B",
        ;
    }
}
#-----------------------------------------------------------------------------

my $quit = 0;
$SIG{'INT'} = sub {$quit = 1};

my $sock = IO::Socket::INET->new(
  Listen => 20,        LocalPort => shift(@ARGV)|| MY_PORT,
  Timeout => 60 * 60,  Reuse => 1,
) or die "Can't create listening socket: $!\n";

DEBUG and warn "Waiting for connections...\n";

my($session, $peer, $port);
while(!$quit) {
  next unless my $session = $sock->accept;
  if(DEBUG) {
    $peer = gethostbyaddr($session->peeraddr, AF_INET) || $session->peerhost;
    $port = $session->peerport;
    warn "Connection from [$peer\n,$port] at ", scalar(localtime), "\n";
  }

  #select($session);
  #++$|;
  #select(STDOUT);
  
  print $session $image;
  close($session);
  DEBUG and print " (Closed)\n";
}

DEBUG and print STDERR "Byebye\n";
close($sock);
exit 0;
