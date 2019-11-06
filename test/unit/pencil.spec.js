const { expect } = require('chai');
const proxyquire = require('proxyquire');
const Chance = require('chance');

const chance = new Chance();

const MODULE_PATH = '../../src/pencil';

describe('Pencil', () => {
    context('when constructor() called', () => {
        it('should create pencil with default values', () => {
            // given
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();

            // then
            expect(pencil).to.deep.equal({
                paper: ''
            });
        });

        it('should create pencil with given paper', () => {
            // given
            const givenPaper = chance.string();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);

            // then
            expect(pencil).to.deep.equal({
                paper: givenPaper
            });
        });
    });

    context('when write() called', () => {
        it('should write text on paper', () => {
            // given
            const givenText = chance.string();

            const { Pencil } = proxyquire(MODULE_PATH, {});
            const pencil = new Pencil();

            // when
            const result = pencil.write(givenText);

            // then
            expect(result).to.equal(givenText);
        });
    });
});
