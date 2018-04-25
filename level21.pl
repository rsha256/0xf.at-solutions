# run this command in terminal with `perl -e`

'sub f{join"",sort split//,$_[0]}while(<STDIN>){chomp;$d{f($_)}=$_}print join";",map{$d{f($_)}}split/;/,$ARGV[0]' <dictionary.txt 'WORDS;GO;HERE'
