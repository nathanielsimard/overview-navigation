const Gtk = require('gi/Gtk')
const Gdk = require('gi/Gdk')

var Widget = class Widget {
  constructor (parent) {
    this.parent = parent
  }

  append (widget) {
    this.parent.append(widget.parent)
  }
}

var TextBoxWidget = class TextBoxWidget extends Widget {
  constructor (name, settings, property, logger) {
    super(
      new Gtk.Box({
        // 'margin-left': 10,
        // 'margin-right': 10,
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

    this.parent.append(this.gLabel)
    this.parent.append(this.gText)

    this.parent.connect('key-release-event', this.onKeyRelease.bind(this))
  }

  onKeyRelease (s, o) {
    this.settings.updateStringProperty(this.property, this.gText.get_text())
  }
}

var ToggleButtonWidget = class ToggleButtonWidget extends Widget {
  constructor (name, settings) {
    super(
      new Gtk.Box({
        // 'margin-left': 10,
        // 'margin-right': 10,
        spacing: 10,
        hexpand: true
      })
    )
    this.settings = settings

    this.gSwitch = new Gtk.Switch({ halign: Gtk.Align.END })
    this.gLabel = new Gtk.Label({ label: name, halign: Gtk.Align.START })

    this.parent.append(this.gLabel)
    this.parent.append(this.gSwitch)
  }

  bind (property) {
    this.settings.bind(property, this.gSwitch, 'active')
  }
}

var ColorChooserWidget = class ColorChooserWidget extends Widget {
  constructor (name, settings, property, logger) {
    super(
      new Gtk.Box({
        // 'margin-left': 10,
        // 'margin-right': 10,
        spacing: 10,
        hexpand: true
      })
    )
    this.settings = settings
    this.logger = logger
    this.property = property

    this.gLabel = new Gtk.Label({ label: name, halign: Gtk.Align.START })
    this.gButton = new Gtk.ColorButton({ halign: Gtk.Align.END })

    const currentColor = this.settings.getStringProperty(this.property)

    if (currentColor) {
      const rgba = new Gdk.RGBA()
      rgba.parse(currentColor)
      this.gButton.set_rgba(rgba)
    }

    this.gButton.connect('color-set', this.clicked.bind(this))

    this.parent.append(this.gLabel)
    this.parent.append(this.gButton)
  }

  clicked () {
    const color = this.gButton.rgba.to_string()
    this.settings.updateStringProperty(this.property, color)
  }
}

var NumberInputWidget = class NumberInputWidget extends Widget {
  constructor (name, settings, property, logger) {
    super(
      new Gtk.Box({
        // 'margin-left': 10,
        // 'margin-right': 10,
        spacing: 10,
        hexpand: true
      })
    )
    this.settings = settings
    this.property = property
    this.logger = logger

    const initValue = this.settings.getNumberProperty(this.property)

    const adjustment = new Gtk.Adjustment({
      lower: 0,
      upper: 100,
      step_increment: 1
    })

    this.gSpin = new Gtk.SpinButton({
      halign: Gtk.Align.END,
      numeric: true,
      update_policy: Gtk.SpinButtonUpdatePolicy.IF_VALID,
      adjustment: adjustment
    })

    this.gSpin.set_value(initValue)

    this.gLabel = new Gtk.Label({ label: name, halign: Gtk.Align.START })

    this.parent.append(this.gLabel)
    this.parent.append(this.gSpin)
    this.gSpin.connect('value-changed', this.updateProperty.bind(this))
  }

  updateProperty () {
    const value = this.gSpin.get_value()
    this.settings.updateNumberProperty(this.property, value)
  }
}

module.exports = { TextBoxWidget, Widget, ToggleButtonWidget, ColorChooserWidget, NumberInputWidget }
