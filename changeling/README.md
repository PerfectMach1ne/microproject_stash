# Changeling v0.0.1

For helping me update the P2E/Co-Re changelog on a GitHub Pages website.

##### 13/03/2024 idea

Here's the revolutionary idea: we *ditch* our beloved `Tcl` for **`C`**! Now, `C` console app handles all the CLI logic, whereas the `Node.js` app does the `JSON` manipulation. `petite-vue` will simply grab the JSON changes and put them into the website frontend.

~~Uses Node.js and ActiveTcl to do the script stuff, but I am considering switching out Tcl (sorry, my precious cursed language...) for something else (contenders: Python, Dart, moar JS, maybe Elixir or Gleam as an experiment).~~

### Installation (to my knowledge)

wait why did i write this. why would anyone want to install this. wtf.

##### Install Node for running `app.js`

`npm install -D changeling`

##### Install ActiveTcl for running `cli.tcl`

#### Windows

You'll have to use the [dreaded installer](https://platform.activestate.com/ActiveState/ActiveTcl-8.6/auto-fork), lmao.

#### Unix/Linux distributions (don't ask me which ones, I have no idea!)

`apt-get install tcl`

Optionally, also use the [installer](https://platform.activestate.com/ActiveState/ActiveTcl-8.6/auto-fork).

#### Mac

I'm not familiar enough with the system to know about any install commands, but ActiveState also provided and [installer](https://platform.activestate.com/ActiveState/ActiveTcl-8.6/auto-fork).
