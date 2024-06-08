import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import { Widget, ToggleButtonWidget, ColorChooserWidget, NumberInputWidget } from './preferences/widget.js'

class HelpWidget extends Widget {
  constructor (name, settings) {
    super(
      new Gtk.Box({
        spacing: 10
      })
    )
    this.parent.set_margin_start(10)
    this.parent.set_margin_end(10)
    this.parent.set_orientation(Gtk.Orientation.VERTICAL)
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

    this.parent.append(activationTitle)
    this.parent.append(activationDescription)

    this.parent.append(focusTitle)
    this.parent.append(focusDescription)

    this.parent.append(closeTitle)
    this.parent.append(closeDescription)
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
    label.set_wrap(true)
    return label
  }
}

/*eslint-disable */
// Required by Gnome Shell
import { PROPERTIES } from './settings.js'
import { PrefLogger } from './utils.js'

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import {Settings} from './settings.js';

export default class OverviewNavigationPreferences extends ExtensionPreferences {
    constructor(...args) {
        super(...args);
        this.settings = new Settings(
            this.getSettings(),
            Gio.SettingsBindFlags.DEFAULT
        );
        this.logger = new PrefLogger('SettingsWidget', this.settings);
        this.properties = PROPERTIES;
    }

    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: _('Overview Navigation settings'),
        })

        window.add(this.createBehaviorPage())
        window.add(this.createStylePage())
        window.add(this.createHelpPage())
        // group.add(ui.parent)
        // page.add(group)
        // window.add(page)
    }

    createBehaviorPage() {
        const page = new Adw.PreferencesPage({ title: _('Behavior') })
        const group = new Adw.PreferencesGroup()
        page.add(group)

        const overviewToggleButton = new ToggleButtonWidget(
            'Show Overview When Change Workspace',
            this.settings
        )
        overviewToggleButton.bind(
            this.properties.SHOW_OVERVIEW_WHEN_CHANGE_WORKSPACE_KEY
        )

        const showWindowSelectorToggleButton = new ToggleButtonWidget(
            'Show Window Selector when show Overview',
            this.settings
        )
        showWindowSelectorToggleButton.bind(
            this.properties.SHOW_WINDOW_SELECTOR_WHEN_SHOW_OVERVIEW
        )

        const loggingToggleButton = new ToggleButtonWidget(
            'Logging', this.settings
        )
        loggingToggleButton.bind(this.properties.LOGGING)

        group.add(overviewToggleButton.parent)
        group.add(showWindowSelectorToggleButton.parent)
        group.add(loggingToggleButton.parent)

        return page
    }

    createStylePage() {
        const backgroundColorText = new ColorChooserWidget(
            'Hint background color',
            this.settings,
            this.properties.HINT_BACKGROUND_COLOR,
            this.logger
        )
        const fontColorText = new ColorChooserWidget(
            'Hint focusing font color',
            this.settings,
            this.properties.HINT_FONT_COLOR,
            this.logger
        )
        const closingFontColorText = new ColorChooserWidget(
            'Hint closing font color',
            this.settings,
            this.properties.HINT_CLOSING_FONT_COLOR,
            this.logger
        )
        const borderColor = new ColorChooserWidget(
            'Hint border color',
            this.settings,
            this.properties.HINT_BORDER_COLOR,
            this.logger
        )
        const borderSize = new NumberInputWidget(
            'Hint border size (px)',
            this.settings,
            this.properties.HINT_BORDER_SIZE,
            this.logger
        )

        const page = new Adw.PreferencesPage({ title: _('Style') })
        const group = new Adw.PreferencesGroup()
        page.add(group)

        group.add(backgroundColorText.parent)
        group.add(fontColorText.parent)
        group.add(closingFontColorText.parent)
        group.add(borderColor.parent)
        group.add(borderSize.parent)

        return page

    }

    createHelpPage() {
        const page = new Adw.PreferencesPage({ title: _('Help') })
        const group = new Adw.PreferencesGroup()
        page.add(group)

        group.add(new HelpWidget().parent)

        return page
    }
};
