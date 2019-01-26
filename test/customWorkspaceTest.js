require("./helpers/core");

const loggerMock = require("./helpers/loggerMock");
const windowOverlayMock = require("./helpers/windowOverlayMock");
const CustomWorkspace = require("../src/customWorkspace");


describe("Custom Workspace", function () {

    let windowOverlay;
    let otherWindowOverlay;
    let logger;
    let customWorkspace;

    beforeEach(function () {
        logger = loggerMock.create();
        windowOverlay = windowOverlayMock.create();
        otherWindowOverlay = windowOverlayMock.create();
        customWorkspace = new CustomWorkspace.CustomWorkspace(logger, [windowOverlay, otherWindowOverlay]);
    });

    describe("when show windows tooltips", function () {
        beforeEach(function () {
            customWorkspace.showWindowsTooltips()
        });

        it("should show window overlay tooltip", function () {
            expect(windowOverlay.showTooltip).toHaveBeenCalled();
            expect(otherWindowOverlay.showTooltip).toHaveBeenCalled();
        });
    });

    describe("when hide windows tooltips", function () {
        beforeEach(function () {
            customWorkspace.hideWindowsTooltips()
        });

        it("should hide windows overlay tooltip", function () {
            expect(windowOverlay.hideTooltip).toHaveBeenCalled();
            expect(otherWindowOverlay.hideTooltip).toHaveBeenCalled();
        });
    });
});