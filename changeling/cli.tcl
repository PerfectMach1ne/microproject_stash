#! tclsh

catch {console show};

set changelog_file {};
proc _openFile {} {
  upvar 1 changelog_file read_file;
  set read_file [open "[pwd]/changelog/co-re_changelog.json" r];
};

proc head {file} {
  set line_number 0;

  while { [gets $file line] >= 0 } {
    if { [string first "head_change" $line] != -1 } {
      puts [regexp -all -inline {[0-9]+} $line]
    };

    incr line_number 0;
  };

  # https://stackoverflow.com/questions/70462356/why-cant-i-use-same-file-channel-twice-in-tcl 
  # This is normal behavior for reading from files in every programming language and OS I'm familiar
  # with. Once you read to the end of the file in the first loop, there's nothing left to read. You can
  # reset and adjust the internal offset into the file's contents using the seek command, though. 
  seek $file 0;  
}; # "head change", as in the latest OFFICIAL change PUSHED to the website.

proc hat {file} {
  set line_number 0;

  while { [gets $file line] >= 0 } {
    if { [string first "hat_change" $line] != -1 } {
      puts [regexp -all -inline {[0-9]+} $line]
    };

    incr line_number 0;
  };

  seek $file 0;
}; # "hat change", as in the latest change COMMITTED and WAITING to be published.

proc status {} {
  cd ..
  exec >&@stdout git status
  cd changeling
};

proc add {} {
  puts "TODO: add";
};

proc remove {} {
  puts "TODO: remove";
};

proc commit {} {
  puts "TODO: commit";
};

proc uncommit {} {
  puts "TODO: uncommit";
}

proc pull {} {
  puts "TODO: pull";
}

proc push {} {
  pull;
  puts "TODO: push";
}



_openFile;
flush stdout;
set c [gets stdin];
while {$c != "q"} {
  if {$c == "head"} {
    head $changelog_file;
  } elseif {$c == "hat"} {
    hat $changelog_file;
  } elseif {$c == "status"} {
    status;
  } elseif {$c == "add"} {
    add;
  } elseif {$c == "remove" || $c == "rem"} {
    remove;
  } elseif {$c == "commit" || $c == "com"} {
    commit;
  } elseif {$c == "uncommit" || $c == "uncom" || $c == "unc" || $c == "-com" || $c == "!com"} {
    uncommit;
  } elseif {$c == "pull"} {
    pull;
  } elseif {$c == "push"} {
    push;
  }
  
  flush stdout;
  set c [gets stdin];

  ##### This prints out all of the changelog lines 
  # set lineNumber 0;
  # while {[gets $changelog_file line] >= 0} {
  #   puts "[incr lineNumber]: $line";
  # };
};

close $changelog_file;