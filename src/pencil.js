class Pencil {
    constructor(paper = '') {
        this.paper = paper;
    }

    write(text) {
        return this.paper + text;
    }
}

module.exports = {
    Pencil
};
