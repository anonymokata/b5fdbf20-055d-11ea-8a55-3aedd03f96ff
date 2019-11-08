const CHARATER_COST = 1;
const CAPITAL_CHARACTER_COST = CHARATER_COST * 2;

class Pencil {
    constructor(paper = '', pointDurability = Infinity) {
        this.paper = paper;
        this.pointDurability = pointDurability;
        this.maxPointDurability = pointDurability;
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

    _degradePoint(character) {
        if (/[\s]/.test(character)) {
            this.pointDurability -= 0;
        } else if (this._isCapital(character)) {
            this.pointDurability -= CAPITAL_CHARACTER_COST;
        } else {
            this.pointDurability -= CHARATER_COST;
        }
    }

    _writeCharacter(character) {
        const characterToWrite = this._canWrite() ? character : ' ';
        const casedCharacterToWrite = this._canWriteCapital() ? characterToWrite : characterToWrite.toLowerCase();

        this.paper += casedCharacterToWrite;
        this._degradePoint(casedCharacterToWrite);
    }

    write(text) {
        for (const character of text) {
            this._writeCharacter(character);
        }

        return this;
    }

    sharpen() {
        this.pointDurability = this.maxPointDurability;

        return this;
    }
}

module.exports = {
    Pencil
};
