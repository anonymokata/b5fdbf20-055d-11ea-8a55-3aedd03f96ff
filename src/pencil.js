const SPACE = ' ';

const CHARATER_COST = 1;
const CAPITAL_CHARACTER_COST = CHARATER_COST * 2;

const SHARPEN_COST = 1;

const ERASE_COST = 1;

class Pencil {
    constructor(paper = '', pointDurability = Infinity, length = Infinity, eraserDurability = Infinity) {
        this.paper = paper;
        this.pointDurability = pointDurability;
        this.maxPointDurability = pointDurability;
        this.length = length;
        this.eraserDurability = eraserDurability;
    }

    _canWrite() {
        return this.pointDurability > 0;
    }

    _canWriteCapital() {
        return this.pointDurability >= CAPITAL_CHARACTER_COST;
    }

    _isCapital(character) {
        return character !== character.toLowerCase();
    }

    _isWhitespace(character) {
        return /[\s]/.test(character);
    }

    _degradePoint(character) {
        if (this._isWhitespace(character)) {
            this.pointDurability -= 0;
        } else if (this._isCapital(character)) {
            this.pointDurability -= CAPITAL_CHARACTER_COST;
        } else {
            this.pointDurability -= CHARATER_COST;
        }
    }

    _writeCharacterToPaper(character) {
        const characterToWrite = this._canWrite() ? character : SPACE;
        const casedCharacterToWrite = this._canWriteCapital() ? characterToWrite : characterToWrite.toLowerCase();

        this.paper += casedCharacterToWrite;
        this._degradePoint(casedCharacterToWrite);
    }

    write(text) {
        for (const character of text) {
            this._writeCharacterToPaper(character);
        }

        return this;
    }

    sharpen() {
        if (this.length >= SHARPEN_COST) {
            this.length -= SHARPEN_COST;
            this.pointDurability = this.maxPointDurability;
        }

        return this;
    }

    _paperHasText(text) {
        return this.paper.includes(text);
    }

    _canErase() {
        return this.eraserDurability > 0;
    }

    _degradeEraser(character) {
        if (this._isWhitespace(character)) {
            this.eraserDurability -= 0;
        } else {
            this.eraserDurability -= ERASE_COST;
        }
    }

    erase(text) {
        if (!this._paperHasText(text)) {
            return this;
        }

        const textEndIndex = this.paper.lastIndexOf(text) + text.length - 1;
        const characters = this.paper.split('');

        for (let i = 0; i < text.length; i++) {
            if (this._canErase()) {
                const characterToErase = characters[textEndIndex - i];
                characters[textEndIndex - i] = SPACE;
                this._degradeEraser(characterToErase);
            }
        }

        this.paper = characters.join('');

        return this;
    }
}

module.exports = {
    Pencil
};
