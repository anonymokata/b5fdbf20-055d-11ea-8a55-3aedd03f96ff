class Pencil {
    constructor(paper = '') {
        this.paper = paper;
    }

    write(text) {
        this.paper += text;

        return this;
    }
}

module.exports = {
    Pencil
};
