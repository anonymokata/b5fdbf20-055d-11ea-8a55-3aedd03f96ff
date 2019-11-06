const { expect } = require('chai');
const proxyquire = require('proxyquire');


const MODULE_PATH = '../../src/pencil';

describe('Pencil', () => {
    context('when constructor() called', () => {
        it('should create pencil', () => {
            // given
            const { Pencil } = proxyquire(MODULE_PATH, {

            });

            // when
            const pencil = new Pencil();

            // then
            expect(pencil).to.deep.equal({});
        });
    });
});
