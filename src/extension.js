const St = imports.gi.St;
const Main = imports.ui.main;

let text, button, logger;
function init() {
    logger = new Logger("[Multi-Monitor-Overview-Navigation]");
    logger.log("Initializing ...");
    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });

    text = new St.Label({ text: "Texto" });
    button.set_child(text);
    logger.log("Initialized");
}

function enable() {
    logger.log("Enabling extension ...");
    Main.panel._rightBox.insert_child_at_index(button, 0);
    logger.log("Enabled");
}

function disable() {
    logger.log("Disabling extension ...");
    Main.panel._rightBox.remove_child(button);
    logger.log("Disabled");
}
