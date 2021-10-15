const assert = require('chai').expect;

const LandingPage = require('../../client/components/LandingPage')

copyrightResult = LandingPage.Copyright()
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
})

