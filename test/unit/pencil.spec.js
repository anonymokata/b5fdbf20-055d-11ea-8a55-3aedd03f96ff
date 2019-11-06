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
            expect(pencil instanceof Pencil).to.equal(true);
            expect(pencil).to.deep.equal({
                paper: ''
            });
        });

        it('should create pencil with blank paper', () => {
            // given
            const givenPaper = '';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);

            // then
            expect(pencil).to.deep.equal({
                paper: givenPaper
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
        it('should write a word on blank paper', () => {
            // given
            const givenPaper = '';
            const wordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const result = pencil.write(wordToWrite);

            // then
            expect(result).to.equal(wordToWrite);
        });

        it('should write multiple words on blank paper', () => {
            // given
            const givenPaper = '';
            const firstWordToWrite = chance.word();
            const secondWordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            pencil.write(firstWordToWrite);
            const result = pencil.write(secondWordToWrite);

            // then
            expect(result).to.equal(`${firstWordToWrite}${secondWordToWrite}`);
        });

        it('should write a word on paper with existing text', () => {
            // given
            const givenPaper = chance.string();
            const wordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const result = pencil.write(wordToWrite);

            // then
            expect(result).to.equal(`${givenPaper}${wordToWrite}`);
        });

        it('should write multiple words on paper with existing text', () => {
            // given
            const givenPaper = chance.string();
            const firstWordToWrite = chance.word();
            const secondWordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            pencil.write(firstWordToWrite);
            const result = pencil.write(secondWordToWrite);

            // then
            expect(result).to.equal(`${givenPaper}${firstWordToWrite}${secondWordToWrite}`);
        });
    });
});
