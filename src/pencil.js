const CHARATER_COST = 1;
const CAPITAL_CHARACTER_COST = CHARATER_COST * 2;

class Pencil {
    constructor(paper = '', pointDegradation = Infinity) {
        this.paper = paper;
        this.pointDegradation = pointDegradation;
    }

    _canWrite() {
        return this.pointDegradation > 0;
    }

    _canWriteCapital() {
        return this.pointDegradation >= 2;
    }

    _isCapital(character) {
        return character !== character.toLowerCase();
    }

    _degradePoint(character) {
        if (/[\s]/.test(character)) {
            this.pointDegradation -= 0;
        } else if (this._isCapital(character)) {
            this.pointDegradation -= CAPITAL_CHARACTER_COST;
        } else {
            this.pointDegradation -= CHARATER_COST;
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
}

module.exports = {
    Pencil
};
