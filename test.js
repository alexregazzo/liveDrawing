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

    cmds = cmds.split(/ /)
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


let result = [
    "fd", "10", "rt", "90",
    "fd", "10",
    "fd", "20", "rt", "45",
    "fd", "20", "rt", "45",
    "fd", "20", "rt", "45",
    "rt", "10",
    "fd", "10",
    "fd", "20", "rt", "45",
    "fd", "20", "rt", "45",
    "fd", "20", "rt", "45",
    "rt", "10",
    "fd", "25"
]
let r = parseCommands("fd 10 rt 90 lp 2 fd 10 lp 3 fd 20 rt 45 el rt 10 el fd 25");
if (r.length === result.length) {
    let ok = true;
    for (let i = 0; i < result.length; i++) {
        if (result[i] !== r[i]) {
            ok = false;
            break;
        }
    }
    console.log(ok);
} else {
    console.log(false);
}