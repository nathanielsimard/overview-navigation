const Gtk = require('gi/Gtk')

var Widget = class Widget {
  constructor (parent) {
    this.parent = parent
  }

  add (widget) {
    this.parent.add(widget.parent)
  }
}

var TextBoxWidget = class TextBoxWidget extends Widget {
  constructor (name, settings, property, logger) {
    super(
      new Gtk.HBox({
        'margin-left': 10,
        'margin-right': 10,
        spacing: 10,
        hexpand: true
      })
    )
    this.settings = settings
    this.property = property
    this.logger = logger

    this.gText = new Gtk.Entry({ halign: Gtk.Align.END })
    this.gText.activate()

    const text = this.settings.getStringProperty(this.property)
    if (text) {
      this.gText.set_text(text)
    }

    this.gLabel = new Gtk.Label({ label: name, halign: Gtk.Align.START })

    this.parent.add(this.gLabel)
    this.parent.add(this.gText)

    this.parent.connect('key-release-event', this.onKeyPress.bind(this))
  }

  onKeyPress (s, o) {
    this.settings.updateStringProperty(this.property, this.gText.get_text())
  }
}

var ToggleButtonWidget = class ToggleButtonWidget extends Widget {
  constructor (name, settings) {
    super(
      new Gtk.HBox({
        'margin-left': 10,
        'margin-right': 10,
        spacing: 10,
        hexpand: true
      })
    )
    this.settings = settings

    this.gSwitch = new Gtk.Switch({ halign: Gtk.Align.END })
    this.gLabel = new Gtk.Label({ label: name, halign: Gtk.Align.START })

    this.parent.add(this.gLabel)
    this.parent.add(this.gSwitch)
  }

  bind (property) {
    this.settings.bind(property, this.gSwitch, 'active')
  }
}

module.exports = { TextBoxWidget, Widget, ToggleButtonWidget }
