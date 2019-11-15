var Gtk = require('gi/Gtk')

class Widget {
  constructor(parent) {
    this.parent = parent
  }

  add(widget) {
    this.parent.add(widget.parent)
  }
}

class SettingsWidget extends Widget {
  constructor(logger, settings, properties) {
    super(new Gtk.Box({}))
    this.parent.set_orientation(Gtk.Orientation.VERTICAL)
    this.notebook = new Gtk.Notebook()
    this.notebook.set_show_border(true)
    this.parent.pack_end(this.notebook, true, true, 0)

    this.logger = logger
    this.settings = settings
    this.properties = properties
  }

  initialize() {
    const overviewToggleButton = new ToggleButtonWidget('Show Overview When Change Workspace', this.settings)
    const showWindowSelectorToggleButton = new ToggleButtonWidget(
      'Show Window Selector when show Overview',
      this.settings
    )
    const debugToggleButton = new ToggleButtonWidget('Debug', this.settings)

    overviewToggleButton.bind(this.properties.SHOW_OVERVIEW_WHEN_CHANGE_WORKSPACE_KEY)
    showWindowSelectorToggleButton.bind(this.properties.SHOW_WINDOW_SELECTOR_WHEN_SHOW_OVERVIEW)
    debugToggleButton.bind(this.properties.DEBUG)

    const behaviorPage = new NotebookPage('Behavior')
    behaviorPage.add(overviewToggleButton)
    behaviorPage.add(showWindowSelectorToggleButton)
    behaviorPage.add(debugToggleButton)
    behaviorPage.register(this.notebook)

    const helpPage = new NotebookPage('Help')
    helpPage.add(new HelpWidget())
    helpPage.register(this.notebook)
  }
}

class NotebookPage extends Widget {
  constructor(name) {
    super(
      new Gtk.Box({
        'margin-top': 10,
        'border-width': '2px',
        spacing: 5
      })
    )
    this.name = name
    this.parent.set_orientation(Gtk.Orientation.VERTICAL)
  }

  register(notebook) {
    const label = new Gtk.Label({ label: this.name })
    notebook.append_page(this.parent, label)
  }
}

class ToggleButtonWidget extends Widget {
  constructor(name, settings) {
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

  bind(property) {
    this.settings.bind(property, this.gSwitch, 'active')
  }
}
class HelpWidget extends Widget {
  constructor(name, settings) {
    super(
      new Gtk.VBox({
        'margin-left': 10,
        'margin-right': 10,
        spacing: 10
      })
    )
    this.name = 'Help'

    const activationTitle = this.createTitle(`Activation`)
    const activationDescription = this.createTextDescription(
      `In the overview, you can press SPACE and letters are going to pop in the corner of every window.` +
      `The search will be disabled and the user will be able to focus or close windows.`
    )

    const focusTitle = this.createTitle(`Focus a Window`)
    const focusDescription = this.createTextDescription(
      `When the activation is done, to focus a particular window, you have to press its letters one after the other.`
    )

    const closeTitle = this.createTitle(`Close a Window`)
    const closeDescription = this.createTextDescription(
      `It is also possible to close a window in the same way, but while keeping SHIFT pressed.`
    )

    this.parent.add(activationTitle)
    this.parent.add(activationDescription)

    this.parent.add(focusTitle)
    this.parent.add(focusDescription)

    this.parent.add(closeTitle)
    this.parent.add(closeDescription)
  }
  createTitle(text) {
    const label = new Gtk.Label({
      halign: Gtk.Align.START
    })
    label.set_markup(`<b>${text}</b>`)
    return label
  }

  createTextDescription(text) {
    const label = new Gtk.Label({
      label: text,
      halign: Gtk.Align.START
    })
    label.set_line_wrap(true)
    return label
  }
}

/*eslint-disable */
// Required by Gnome Shell
function init() {
  /* eslint-enable */
}

/*eslint-disable */
// Required by Gnome Shell
function buildPrefsWidget() {
  const { PrefLogger } = require('./utils')
  const { initialize, PROPERTIES } = require('./settings')

  const settings = initialize()
  const logger = new PrefLogger('SettingsWidget', settings)
  const widget = new SettingsWidget(logger, settings, PROPERTIES)

  widget.initialize()
  widget.parent.show_all()
  return widget.parent
}
