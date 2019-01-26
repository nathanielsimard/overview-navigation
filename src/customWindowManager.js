class CustomWindowManager {

    constructor(search, overview) {
        this.search = search;
        this.overview = overview;
    }

    actionMoveWorkspace() {
        this.search.disable();
        this.overview.show();
    }
}

if (!global.overviewNavigationTesting) {
    const WindowManager = imports.ui.windowManager;
    const Main = imports.ui.main;

    function initialize(injector, search) {
        injector.inject(CustomWindowManager, WindowManager.WindowManager, (parent) => {
            return new CustomWindowManager(search, Main.overview);
        });
    }
} else {
    module.exports = { CustomWindowManager }
}
