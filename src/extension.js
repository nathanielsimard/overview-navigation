import Gio from 'gi://Gio'
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js'
import { Main } from './app.js'
import { Settings } from './settings.js'
import { Logger } from './utils.js'

let main, logger

export default class OverviewNavigationExtension extends Extension {
    constructor(metadata) {
        super(metadata)

        this.settings = new Settings(
            this.getSettings(),
            Gio.SettingsBindFlags.DEFAULT
        )

        /* eslint-enable */
        logger = new Logger('Extension', this.settings)
        main = new Main(this.settings)
        logger.info('Initialized')
    }

    enable() {
        logger.info('Enabling extension ...')
        main.start()
        logger.info('Enabled')
    }

    disable() {
        logger.info('Disabling extension ...')
        main.stop()
        logger.info('Disabled')
    }
}
