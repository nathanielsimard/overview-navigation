class WindowSelector {
    registerWindow(metaWindow, callback) { }
    reset() { }
}

function create() {
    const windowSelector = new WindowSelector();
    spyOn(windowSelector, 'registerWindow');
    spyOn(windowSelector, 'reset');
    return windowSelector;
}


module.exports = { create }