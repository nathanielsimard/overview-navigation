require("./helpers/core");

const loggerMock = require("./helpers/loggerMock");
const searchMock = require("./helpers/searchMock");
const stageMock = require("./helpers/stageMock");
const overviewMock = require("./helpers/overviewMock");
const windowSelectorMock = require("./helpers/windowSelectorMock");

const cwv = require("../src/customWorkspaceView");

describe("Custom Workspace View", function () {

    let logger;
    let search;
    let windowSelector;
    let stage;
    let overview;

    beforeEach(function () {
        logger = loggerMock.create();
        search = searchMock.create();
        windowSelector = windowSelectorMock.create();
        stage = stageMock.create();
        overview = overviewMock.create();
    });

    describe("when initializing", function () {

        let customWorkspaceView;

        beforeEach(function () {
            customWorkspaceView = new cwv.CustomWorkspaceView(logger,
                search,
                windowSelector,
                stage,
                [],
                null,
                null,
                overview,
                null,
                null);
            customWorkspaceView._init()
        });

        it("disables search", function () {
            expect(search.disable).toHaveBeenCalled();
        });

        it("binds stage key event", function () {
            expect(stage.connect).toHaveBeenCalledTimes(2);
        });
    });

    describe("when destroying", function () {

        beforeEach(function () {
            customWorkspaceView = new cwv.CustomWorkspaceView(logger,
                search,
                windowSelector,
                stage,
                [],
                null,
                null,
                overview,
                null,
                null);
            customWorkspaceView._onDestroy();
        });

        it("enables search", function () {
            expect(search.enable).toHaveBeenCalled();
        });

        it("resets window selector", function () {
            expect(windowSelector.reset).toHaveBeenCalled();
        });

        it("unbinds stage key event", function () {
            expect(stage.disconnect).toHaveBeenCalledTimes(2);
        });
    });
});