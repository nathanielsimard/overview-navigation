const St = imports.gi.St;
const Main = imports.ui.main;

class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        global.log(this.name, message);
    }
}

const logger = new Logger("[Multi-Monitor-Overview-Navigation]");

let text, button;
function init() {
    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });

    text = new St.Label({ text: "Text" });
    button.set_child(text);
    logger.log("Initialized");
    global.log("[Multi-Monitor-Overview-Navigation]", "DMNA");
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    logger.log("Enabled");
}

function disable() {
    Main.panel._rightBox.remove_child(button);
    logger.log("Disabled");
}
