class Button {

    constructor(name, onClickEvent) {
        this.name = name;
        this.logger = new Logger('Extension');
        this.logger.debug(`Initializing button ${name}`);

        this.button = new St.Bin({
            style_class: 'panel-button',
            reactive: true,
            can_focus: true,
            x_fill: true,
            y_fill: false,
            track_hover: true
        });
        this.text = new St.Label({ style_class: 'helloworld-label', text: this.name });
        this.button.set_child(this.text);
        this.button.connect('button-press-event', onClickEvent);
    }


    enable() {
        this.logger.debug(`Enabling button ${this.name}`);
        Main.panel._rightBox.insert_child_at_index(this.button, 0);
    }

    disable() {
        this.logger.debug(`Disabling button ${this.name}`);
        Main.panel._rightBox.remove_child(this.button);
    }
}