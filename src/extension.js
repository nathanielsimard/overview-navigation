/* global imports */
const ExtensionUtils = imports.misc.extensionUtils
const OverviewNavigation = ExtensionUtils.getCurrentExtension()

const app = OverviewNavigation.imports.app
const utils = OverviewNavigation.imports.utils

let main, logger
/*eslint-disable */
function init() {
  /* eslint-enable */
  try {
    logger = new utils.Logger('Entension')
    main = new app.Main()
    logger.info('Initialized')
  } catch (err) {
    logger.error(err)
  }
}

/*eslint-disable */
function enable() {
  /* eslint-enable */
  try {
    logger.info('Enabling extension ...')
    main.start()
    logger.info('Enabled')
  } catch (err) {
    logger.error(err)
  }
}

/*eslint-disable */
function disable() {
  /* eslint-enable */
  try {
    logger.info('Disabling extension ...')
    main.stop()
    logger.info('Disabled')
  } catch (err) {
    logger.error(err)
  }
}
