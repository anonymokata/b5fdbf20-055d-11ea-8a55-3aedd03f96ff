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
                paper: '',
                pointDegradation: Infinity
            });
        });

        it('should create pencil with blank paper', () => {
            // given
            const givenPaper = '';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { paper } = new Pencil(givenPaper);

            // then
            expect(paper).to.equal(givenPaper);
        });

        it('should create pencil with given paper', () => {
            // given
            const givenPaper = chance.string();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { paper } = new Pencil(givenPaper);

            // then
            expect(paper).to.equal(givenPaper);
        });

        it('should create pencil with no point degradation', () => {
            // given
            const givenPointDegradation = undefined;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDegradation } = new Pencil(undefined, givenPointDegradation);

            // then
            expect(pointDegradation).to.equal(Infinity);
        });

        it('should create pencil with given point degradation', () => {
            // given
            const givenPointDegradation = chance.natural();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDegradation } = new Pencil(undefined, givenPointDegradation);

            // then
            expect(pointDegradation).to.equal(givenPointDegradation);
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
            const { paper } = pencil.write(wordToWrite);

            // then
            expect(paper).to.equal(wordToWrite);
        });

        it('should write multiple words on blank paper', () => {
            // given
            const givenPaper = '';
            const firstWordToWrite = chance.word();
            const secondWordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const { paper } = pencil.write(firstWordToWrite).write(secondWordToWrite);

            // then
            expect(paper).to.equal(`${firstWordToWrite}${secondWordToWrite}`);
        });

        it('should write a word on paper with existing text', () => {
            // given
            const givenPaper = chance.string();
            const wordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const { paper } = pencil.write(wordToWrite);

            // then
            expect(paper).to.equal(`${givenPaper}${wordToWrite}`);
        });

        it('should write multiple words on paper with existing text', () => {
            // given
            const givenPaper = chance.string();
            const firstWordToWrite = chance.word();
            const secondWordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const { paper } = pencil.write(firstWordToWrite).write(secondWordToWrite);

            // then
            expect(paper).to.equal(`${givenPaper}${firstWordToWrite}${secondWordToWrite}`);
        });

        it('should write a word and degrade', () => {
            // given
            const givenPointDegradation = chance.natural({ min: 10, max: 20 });
            const wordToWrite = chance.word({ length: 5 });

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDegradation);
            const { pointDegradation } = pencil.write(wordToWrite);

            // then
            expect(pointDegradation).to.equal(givenPointDegradation - wordToWrite.length);
        });

        it('should not degrade when writing whitespace', () => {
            // given
            const givenPointDegradation = chance.natural();
            const newlineToWrite = '\n';
            const carriageReturnToWrite = '\r';
            const tabToWrite = '\t';
            const spaceToWrite = ' ';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDegradation);
            const { pointDegradation } = pencil.write(newlineToWrite).write(carriageReturnToWrite).write(tabToWrite).write(spaceToWrite);

            // then
            expect(pointDegradation).to.equal(givenPointDegradation);
        });

        it('should not degrade below 0', () => {
            // given
            const givenPointDegradation = 1;
            const wordToWrite = 'test';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDegradation);
            const { pointDegradation } = pencil.write(wordToWrite);

            // then
            expect(pointDegradation).to.equal(0);
        });

        it('should go dull and write whitespace instead', () => {
            // given
            const givenPointDegradation = 1;
            const wordToWrite = 'test';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDegradation);
            const { paper, pointDegradation } = pencil.write(wordToWrite);

            // then
            expect(pointDegradation).to.equal(0);
            expect(paper).to.equal('t   ');
        });
    });
});
