/*
fd [amt] - forward
rt [amt] - rotate (degrees)
for [amt] [commands] endfor
*/

let code;
let table;
const controls = {
  "fd": function (amt) {
    amt = Number(amt);
    line(0, 0, amt, 0);
    translate(amt, 0);
  },
  "rt": function (amt) {
    amt = Number(amt);
    rotate(amt);
  }
}

function setup() {
  code = select("#coding");
  table = select("#tablecommands");
  createCanvas(windowWidth, windowHeight - table.height);
  background(0);
  code.input(run);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(2);
  noFill();
  run();
  noLoop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight - table.height);
  background(0);
  run();
}

function run() {
  push();
  background(0);
  translate(width / 2, height / 2);
  let commands = parseCommands(code.value());
  let index = 0;
  while (index < commands.length) {
    if (commands[index] in controls) {
      controls[commands[index]](commands[++index]);
    }
    index++;
  }
  pop();
}

function parseCommands(cmds) {
  let parsed = [];
  let index = 0;
  let parseLoop = function () {
    let parsing = [];
    let lpamt = Number(cmds[++index]);
    index++;
    while (index < cmds.length) {
      if (cmds[index] === "el") {
        let loopcmds = [];
        for (let i = 0; i < lpamt; i++) {
          for (let j = 0; j < parsing.length; j++) {
            loopcmds.push(parsing[j]);
          }
        }
        return loopcmds;
      } else if (cmds[index] === "lp") {
        parsing = parsing.concat(parseLoop());
      } else {
        parsing.push(cmds[index]);
      }
      index++;
    }
  }

  if (!(cmds instanceof Array)) {
    cmds = cmds.split(/ |<br >|\t|\n|;/).filter(x => x !== "")
  }
  while (index < cmds.length) {
    if (cmds[index] === "lp") {
      parsed = parsed.concat(parseLoop());
    } else {
      parsed.push(cmds[index]);
    }
    index++;
  }
  return parsed;
}
