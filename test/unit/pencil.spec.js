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
                maxPointDurability: Infinity,
                length: Infinity,
                eraserDurability: Infinity
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

        it('should reduce length for every sharpen', () => {
            // given
            const givenLength = chance.natural({ min: 10 });

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, givenLength);
            const { length } = pencil.sharpen().sharpen().sharpen();

            // then
            expect(length).to.equal(givenLength - 3);
        });

        it('should stop sharpening when no more length', () => {
            // given
            const givenLength = 1;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, givenLength);
            const { length } = pencil.sharpen().sharpen();

            // then
            expect(length).to.equal(0);
        });

        it('should continue writing after sharpening', () => {
            // given
            const givenLength = chance.natural();
            const wordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, givenLength);
            const { paper, length } = pencil.sharpen().write(wordToWrite);

            // then
            expect(paper).to.equal(wordToWrite);
            expect(length).to.equal(givenLength - 1);
        });

        it('should stop writing after sharpening to a nub', () => {
            // given
            const givenPointDurability = 5;
            const givenLength = 1;
            const firstWordToWrite = 'first';
            const secondWordToWrite = 'second';
            const thirdWordToWrite = 'third';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, givenPointDurability, givenLength);
            const { paper, length } = pencil.write(firstWordToWrite).sharpen().write(secondWordToWrite).sharpen().write(thirdWordToWrite);

            // then
            expect(paper).to.equal('firstsecon      ');
            expect(length).to.equal(0);
        });
    });

    context('when erase() called', () => {
        it('should erase given word', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });

        it('should erase last instance of given word', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${wordToErase}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });

        it('should erase word on given paper', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word();
            const suffix = chance.word();
            const givenPaper = `${prefix}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper, undefined, undefined);
            const { paper } = pencil.erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });

        it('should not erase if word doesn\'t exist', () => {
            // given
            const prefix = chance.word();
            const word = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${word}${suffix}`;
            const wordToErase = '!!!';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase);

            // then
            expect(paper).to.equal(wordsToWrite);
        });

        it('should erase n instances of word if called n times', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${wordToErase}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase).erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${wordToErase}${chance.n(() => ' ', wordToErase.length).join('')}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });

        it('should stop erasing when no more instances exist', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase).erase(wordToErase).erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${chance.n(() => ' ', wordToErase.length).join('')}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });
    });
});
