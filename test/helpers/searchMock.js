class Search {
    disable() { }
    enable() { }
}

function create() {
    const search = new Search();
    spyOn(search, 'disable');
    spyOn(search, 'enable');
    return search;
}

module.exports = { create };