catch {console show};

puts "Command line guide:";
puts "list :: List all the thingies.";
puts "last :: Display the last thingy.";
puts "add priv \"<What you did>\" :: Add a thingy to private WagnerDoc.";
puts "add publ \"<What you did>\" :: Add a thingy to public WagnerDoc.";
puts "commit :: Commit stuff to GitHub\n";

flush stdout;
set input [gets stdin];
while {$input != "q"} {
  set privtest [lindex [regexp -all -inline {add priv "(.*?)"} $input] 0];
  set publtest [lindex [regexp -all -inline {add publ "(.*?)"} $input] 0];
  puts $privtest;
  if {$input == "list"} {
    exec >&@stdout node app.js list;
  } elseif {$input == "last"} {
    exec >&@stdout node app.js last;
  } elseif {$input == $privtest} {
    set parameters $input;
    set command "node app.js $parameters";
    eval exec >&@stdout $command;
  } elseif {$input == $publtest} {
    set parameters $input;
    set command "node app.js $parameters";
    eval exec >&@stdout $command;
  } elseif {$input == "commit"} {
    cd ..;
    exec >&@stdout git pull origin main;
    exec >&@stdout git add .;
    exec >&@stdout git commit -m "Faust WagnerDoc update";
    exec >&@stdout git push -u origin main;
    cd Faust;
  };
  
  flush stdout;
  set input [gets stdin];
};

