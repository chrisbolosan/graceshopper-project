const assert = require('chai').expect;

const LandingPage = require('../../client/components/LandingPage')

copyrightResult = LandingPage.Copyright()
landingPageResult = LandingPage.LandingPage()
//basic returns for functionality no styling
describe('LandingPage', function() {
    describe('Copyright()' , function () {
        it("Copyright should return Copyright © Ray's Kitchen", function () {
            assert.include(copyrightResult, "Copyright © Ray's Kitchen");
        })
        it('Copyright should return type string', function () {
            assert.typeOf(copyrightResult, 'string');
        });
    })
    describe('LandingPage()', function () {
        it("LandingPage should return reviews from customers", function () {
            assert.include(landingPageResult, "Reviews from our customers");
        });
        it('Landingpage should return type string', function () {
            assert.typeOf(landingPageResult, 'string');
        })
    })
})

