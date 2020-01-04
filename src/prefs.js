const Gtk = require('gi/Gtk')
const { Widget, TextBoxWidget, ToggleButtonWidget } = require('./preferences/widget')
const { NotebookPage } = require('./preferences/notebook')

class SettingsUI extends Widget {
  constructor (logger, settings, properties) {
    super(new Gtk.Box({}))
    this.parent.set_orientation(Gtk.Orientation.VERTICAL)
    this.notebook = new Gtk.Notebook()
    this.notebook.set_show_border(true)
    this.parent.pack_end(this.notebook, true, true, 0)

    this.logger = logger
    this.settings = settings
    this.properties = properties
  }

  initialize () {
    this.initializeBehaviorPage()
    this.initializeStylePage()
    this.initializeHelpPage()
  }

  initializeStylePage () {
    const style = new NotebookPage('Style')

    const backgroundColorText = new TextBoxWidget(
      'Hint background color',
      this.settings,
      this.properties.HINT_BACKGROUND_COLOR,
      this.logger
    )
    const fontColorText = new TextBoxWidget(
      'Hint font color',
      this.settings,
      this.properties.HINT_FONT_COLOR,
      this.logger
    )
    const borderColor = new TextBoxWidget(
      'Hint border color',
      this.settings,
      this.properties.HINT_BORDER_COLOR,
      this.logger
    )
    const borderSize = new TextBoxWidget(
      'Hint border size',
      this.settings,
      this.properties.HINT_BORDER_SIZE,
      this.logger
    )

    style.add(backgroundColorText)
    style.add(fontColorText)
    style.add(borderColor)
    style.add(borderSize)
    style.register(this.notebook)
  }

  initializeHelpPage () {
    const helpPage = new NotebookPage('Help')
    helpPage.add(new HelpWidget())
    helpPage.register(this.notebook)
  }

  initializeBehaviorPage () {
    const overviewToggleButton = new ToggleButtonWidget('Show Overview When Change Workspace', this.settings)
    overviewToggleButton.bind(this.properties.SHOW_OVERVIEW_WHEN_CHANGE_WORKSPACE_KEY)

    const showWindowSelectorToggleButton = new ToggleButtonWidget(
      'Show Window Selector when show Overview',
      this.settings
    )
    showWindowSelectorToggleButton.bind(this.properties.SHOW_WINDOW_SELECTOR_WHEN_SHOW_OVERVIEW)

    const loggingToggleButton = new ToggleButtonWidget('Logging', this.settings)
    loggingToggleButton.bind(this.properties.LOGGING)

    const behaviorPage = new NotebookPage('Behavior')
    behaviorPage.add(overviewToggleButton)
    behaviorPage.add(showWindowSelectorToggleButton)
    behaviorPage.add(loggingToggleButton)
    behaviorPage.register(this.notebook)
  }
}

class HelpWidget extends Widget {
  constructor (name, settings) {
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
  createTitle (text) {
    const label = new Gtk.Label({
      halign: Gtk.Align.START
    })
    label.set_markup(`<b>${text}</b>`)
    return label
  }

  createTextDescription (text) {
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
  const ui = new SettingsUI(logger, settings, PROPERTIES)

  ui.initialize()
  ui.parent.show_all()
  return ui.parent
}
