const _overviewNavigation = {
    imports: {
        utils: {}
    }
}

const imports = {
    misc: {
        extensionUtils:
        {
            getCurrentExtension: function () {
                return _overviewNavigation;
            }
        }
    },
    gi: {
        St: {}
    },
    ui: {
        workspace: {}
    }
}

global.imports = imports;
global.overviewNavigationTesting = true;
