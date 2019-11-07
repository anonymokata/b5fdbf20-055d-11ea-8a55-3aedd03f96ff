class Pencil {
    constructor(paper = '', pointDegradation = Infinity) {
        this.paper = paper;
        this.pointDegradation = pointDegradation;
    }

    write(text) {
        this.paper += text;

        return this;
    }
}

module.exports = {
    Pencil
};
