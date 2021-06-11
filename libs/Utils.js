
const deleteWhiteSpace = (str) => {
    return str ? str.replace(/\s+/g, "") : "";
};

module.exports = { deleteWhiteSpace };
