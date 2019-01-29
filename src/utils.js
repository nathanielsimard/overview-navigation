function injectToFunction(parent, name, func) {
    let origin = parent[name];
    parent[name] = function () {
        let ret;
        ret = origin.apply(this, arguments);
        if (ret === undefined)
            ret = func.apply(this, arguments);
        return ret;
    }
    return origin;
}