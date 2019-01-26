require("./helpers/core");

const searchMock = require("./helpers/searchMock");
const overviewMock = require("./helpers/overviewMock");
const customWindowManager = require("../src/customWindowManager");

describe("Custom Window Manager", function () {

    let overview;
    let search;
    let wm;

    beforeEach(function () {
        overview = overviewMock.create();
        search = searchMock.create();
        wm = new customWindowManager.CustomWindowManager(search, overview);
    });

    describe("when show overview", function () {
        beforeEach(function () {
            wm.actionMoveWorkspace();
        });

        it("should show overview", function () {
            expect(overview.show).toHaveBeenCalled();
        });

        it("should disable search", function () {
            expect(search.disable).toHaveBeenCalled();
        });
    });
});