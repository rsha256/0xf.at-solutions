# run `ruby level27.rb 212.17.118.125 2727` in your terminal
require 'socket'
(a,b,c = TCPSocket.new(*ARGV[0..1])).print "GO"
a.print(b[1].to_i*b[2].to_i) if b=c.match(/^(\d+).(\d+)/) while(puts(c=a.gets) || c)
