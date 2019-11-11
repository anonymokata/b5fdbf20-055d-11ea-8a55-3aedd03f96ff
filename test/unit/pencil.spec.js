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
                eraserDurability: Infinity,
                editPosition: null
            });
        });

        it('should create pencil with default paper', () => {
            // given
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { paper } = new Pencil(undefined);

            // then
            expect(paper).to.equal('');
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
            const givenPaper = chance.paragraph();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { paper } = new Pencil(givenPaper);

            // then
            expect(paper).to.equal(givenPaper);
        });

        it('should create pencil with default point durability', () => {
            // given

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDurability } = new Pencil(undefined, undefined);

            // then
            expect(pointDurability).to.equal(Infinity);
        });

        it('should create pencil with no point durability', () => {
            // given
            const givenPointDurability = 0;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { pointDurability } = new Pencil(undefined, givenPointDurability);

            // then
            expect(pointDurability).to.equal(givenPointDurability);
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

        it('should create pencil with no length', () => {
            // given
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { length } = new Pencil(undefined, undefined, undefined);

            // then
            expect(length).to.equal(Infinity);
        });

        it('should create pencil with no length', () => {
            // given
            const givenPencilLength = 0;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { length } = new Pencil(undefined, undefined, givenPencilLength);

            // then
            expect(length).to.equal(givenPencilLength);
        });

        it('should create pencil with given length', () => {
            // given
            const givenPencilLength = chance.natural();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { length } = new Pencil(undefined, undefined, givenPencilLength);

            // then
            expect(length).to.equal(givenPencilLength);
        });

        it('should create pencil with no eraser durability', () => {
            // given
            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { eraserDurability } = new Pencil(undefined, undefined, undefined, undefined);

            // then
            expect(eraserDurability).to.equal(Infinity);
        });

        it('should create pencil with no eraser durability', () => {
            // given
            const givenPencilDurability = 0;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { eraserDurability } = new Pencil(undefined, undefined, undefined, givenPencilDurability);

            // then
            expect(eraserDurability).to.equal(givenPencilDurability);
        });

        it('shoud create pencil with given eraser durability', () => {
            // given
            const givenPencilDurability = chance.natural();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const { eraserDurability } = new Pencil(undefined, undefined, undefined, givenPencilDurability);

            // then
            expect(eraserDurability).to.equal(givenPencilDurability);
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
            const wordToErase = chance.word({ length: 5 });
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
            const wordToErase = chance.word({ length: 5 });
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
            const wordToErase = chance.word({ length: 5 });
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

        it('should erase multiple words', () => {
            // given
            const prefix = chance.word();
            const firstWordToErase = chance.word();
            const secondWordToErase = chance.word();
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${firstWordToErase}${secondWordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(`${firstWordToErase}${secondWordToErase}`);

            // then
            expect(paper).to.equal(`${prefix}${chance.n(() => ' ', firstWordToErase.length).join('')}${chance.n(() => ' ', secondWordToErase.length).join('')}${suffix}`);
        });

        it('should stop erasing when no more instances exist', () => {
            // given
            const prefix = chance.word();
            const wordToErase = chance.word({ length: 5 });
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined);
            const { paper } = pencil.write(wordsToWrite).erase(wordToErase).erase(wordToErase).erase(wordToErase);

            // then
            expect(paper).to.equal(`${prefix}${chance.n(() => ' ', wordToErase.length).join('')}${chance.n(() => ' ', wordToErase.length).join('')}${suffix}`);
        });

        it('should degrade eraser when erasing', () => {
            // given
            const givenEraserDurability = chance.natural({ min: 20 });
            const prefix = chance.word();
            const wordToErase = chance.word({ length: 5 });
            const suffix = chance.word();
            const wordsToWrite = `${prefix}${wordToErase}${suffix}`;

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined, givenEraserDurability);
            const { eraserDurability } = pencil.write(wordsToWrite).erase(wordToErase);

            // then
            expect(eraserDurability).to.equal(givenEraserDurability - wordToErase.length);
        });

        it('should wear out eraser if erasing more than there is durability', () => {
            // given
            const givenEraserDurability = 1;
            const wordToErase = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined, givenEraserDurability);
            const { eraserDurability } = pencil.write(wordToErase).erase(wordToErase);

            // then
            expect(eraserDurability).to.equal(0);
        });

        it('should not degrade when erasing whitespace', () => {
            // given
            const givenEraserDurability = chance.natural();
            const newlineToErase = '\n';
            const carriageReturnToErase = '\r';
            const tabToErase = '\t';
            const spaceToErase = ' ';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined, givenEraserDurability);
            const { paper, eraserDurability } = pencil.write(`${newlineToErase}${carriageReturnToErase}${tabToErase}${spaceToErase}`).erase(newlineToErase).erase(carriageReturnToErase).erase(tabToErase).erase(spaceToErase);

            // then
            expect(paper).to.equal('    ');
            expect(eraserDurability).to.equal(givenEraserDurability);
        });

        it('should not degrade eraser below 0 when worn out', () => {
            // given
            const givenEraserDurability = 0;
            const wordToErase = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined, givenEraserDurability);
            const { eraserDurability } = pencil.write(wordToErase).erase(wordToErase);

            // then
            expect(eraserDurability).to.equal(0);
        });

        it('should not erase when eraser worn out', () => {
            // given
            const givenEraserDurability = 0;
            const wordToErase = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(undefined, undefined, undefined, givenEraserDurability);
            const { paper, eraserDurability } = pencil.write(wordToErase).erase(wordToErase);

            // then
            expect(paper).to.equal(wordToErase);
            expect(eraserDurability).to.equal(0);
        });
    });

    context('when edit() called', () => {
        it('should edit given word', () => {
            // given
            const wordLength = 5;
            const prefix = chance.word();
            const wordToEdit = chance.word({ length: wordLength });
            const suffix = chance.word();
            const newWordToWrite = chance.word({ length: wordLength });

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(`${prefix}${wordToEdit}${suffix}`).erase(wordToEdit).edit(newWordToWrite);

            // then
            expect(paper).to.equal(`${prefix}${newWordToWrite}${suffix}`);
        });

        it('should not edit if no erasure has happened', () => {
            // given
            const givenPaper = chance.paragraph();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const { paper } = pencil.edit(chance.word());

            // then
            expect(paper).to.equal(givenPaper);
        });

        it('should show collisions when writing over existing text', () => {
            // given
            const givenPaper = 'An apple a day keeps the doctor away';
            const wordToEdit = 'artichoke';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil(givenPaper);
            const { paper } = pencil.erase('apple').edit(wordToEdit);

            // then
            expect(paper).to.equal('An artich@k@ay keeps the doctor away');
        });

        it('should collide when editing in a larger word', () => {
            // given
            const prefix = 'prefix';
            const wordToEdit = 'car';
            const suffix = 'suffix';
            const newWordToWrite = 'cars';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(`${prefix}${wordToEdit}${suffix}`).erase(wordToEdit).edit(newWordToWrite);

            // then
            expect(paper).to.equal(`${prefix}car@uffix`);
        });

        it('should not collide when editing in a smaller word', () => {
            // given
            const prefix = 'prefix';
            const wordToEdit = 'trucks';
            const suffix = 'suffix';
            const newWordToWrite = 'truck';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(`${prefix}${wordToEdit}${suffix}`).erase(wordToEdit).edit(newWordToWrite);

            // then
            expect(paper).to.equal(`${prefix}truck ${suffix}`);
        });

        it('should not collide when editing in a word that is just right', () => {
            // given
            const prefix = 'prefix';
            const wordToEdit = 'trucks';
            const suffix = 'suffix';
            const newWordToWrite = 'planes';

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(`${prefix}${wordToEdit}${suffix}`).erase(wordToEdit).edit(newWordToWrite);

            // then
            expect(paper).to.equal(`${prefix}${newWordToWrite}${suffix}`);
        });

        it('should not edit twice', () => {
            // given
            const prefix = 'prefix';
            const wordToEdit = chance.word({ length: 5 });
            const suffix = 'suffix';
            const firstWordToEdit = chance.word({ length: 5 });
            const secondWordToEdit = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(`${prefix}${wordToEdit}${suffix}`).erase(wordToEdit).edit(firstWordToEdit).edit(secondWordToEdit);

            // then
            expect(paper).to.equal(`${prefix}${firstWordToEdit}${suffix}`);
        });

        it('should not edit after writing', () => {
            // given
            const wordToEdit = chance.word({ length: 5 });
            const wordToWrite = chance.word();
            const newWordToWrite = chance.word();

            const { Pencil } = proxyquire(MODULE_PATH, {});

            // when
            const pencil = new Pencil();
            const { paper } = pencil.write(wordToEdit).erase(wordToEdit).write(wordToWrite).edit(newWordToWrite);

            // then
            expect(paper).to.equal(`     ${wordToWrite}`);
        });
    });
});
