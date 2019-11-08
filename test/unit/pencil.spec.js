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
                pointDurability: Infinity,
                maxPointDurability: Infinity
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

        it('should create pencil with no point durability', () => {
            // given
            const givenPointDurability = undefined;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDurability } = new Pencil(undefined, givenPointDurability);

            // then
            expect(pointDurability).to.equal(Infinity);
        });

        it('should create pencil with given point durability', () => {
            // given
            const givenPointDurability = chance.natural();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDurability } = new Pencil(undefined, givenPointDurability);

            // then
            expect(pointDurability).to.equal(givenPointDurability);
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
            const givenPointDurability = chance.natural({ min: 10, max: 20 });
            const wordToWrite = chance.word({ length: 5 });

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { pointDurability } = pencil.write(wordToWrite);

            // then
            expect(pointDurability).to.equal(givenPointDurability - wordToWrite.length);
        });

        it('should only degrade for written words and not any given text', () => {
            // given
            const givenPaper = chance.string();
            const givenPointDurability = 100;
            const wordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper, givenPointDurability);
            const { paper, pointDurability } = pencil.write(wordToWrite);

            // then
            expect(paper).to.equal(`${givenPaper}${wordToWrite}`);
            expect(pointDurability).to.equal(givenPointDurability - wordToWrite.length);
        });

        it('should not degrade when not writing', () => {
            // given
            const givenPointDurability = 100;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDurability } = new Pencil('', givenPointDurability);

            // then
            expect(pointDurability).to.equal(givenPointDurability);
        });

        it('should not degrade when writing whitespace', () => {
            // given
            const givenPointDurability = chance.natural();
            const newlineToWrite = '\n';
            const carriageReturnToWrite = '\r';
            const tabToWrite = '\t';
            const spaceToWrite = ' ';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { pointDurability } = pencil.write(newlineToWrite).write(carriageReturnToWrite).write(tabToWrite).write(spaceToWrite);

            // then
            expect(pointDurability).to.equal(givenPointDurability);
        });

        it('should not degrade below 0', () => {
            // given
            const givenPointDurability = 1;
            const wordToWrite = 'test';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { pointDurability } = pencil.write(wordToWrite);

            // then
            expect(pointDurability).to.equal(0);
        });

        it('should go dull and write whitespace instead', () => {
            // given
            const givenPointDurability = 1;
            const wordToWrite = 'test';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { paper, pointDurability } = pencil.write(wordToWrite);

            // then
            expect(pointDurability).to.equal(0);
            expect(paper).to.equal('t   ');
        });

        it('should degrade twice as fast when writing capital characters', () => {
            // given
            const givenPointDurability = 100;
            const wordToWrite = chance.string({ alpha: true, casing: 'upper' });
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { paper, pointDurability } = pencil.write(wordToWrite);

            // then
            expect(pointDurability).to.equal(givenPointDurability - (wordToWrite.length * 2));
            expect(paper).to.equal(wordToWrite);
        });

        it('should write lowercase character if too dull to complete uppercase character', () => {
            // given
            const givenPointDurability = 3;
            const wordToWrite = 'caT';
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { paper } = pencil.write(wordToWrite);

            // then
            expect(paper).to.equal('cat');
        });
    });

    context('when sharpen() called', () => {
        it('should reset durability to initial', () => {
            // given
            const givenPointDurability = chance.natural();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil('', givenPointDurability);
            const { pointDurability } = pencil.write(chance.word()).sharpen();

            // then
            expect(pointDurability).to.equal(givenPointDurability);
        });
    });
});
