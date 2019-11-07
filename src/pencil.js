class Pencil {
    constructor(paper = '', pointDegradation = Infinity) {
        this.paper = paper;
        this.pointDegradation = pointDegradation;
    }

    _canWrite() {
        return this.pointDegradation > 0;
    }

    _degradePoint(character) {
        /[\s]/.test(character) ? this.pointDegradation -= 0 : this.pointDegradation > 0 ? this.pointDegradation-- : 0;
    }

    _writeCharacter(character) {
        const characterToWrite = this._canWrite() ? character : ' ';

        this.paper += characterToWrite;
        this._degradePoint(characterToWrite);
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
