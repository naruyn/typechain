"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, prevHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calcBlockHash = (index, prevHash, data, timestamp) => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
Block.validBlock = (checkBlock) => typeof checkBlock.index === "number" &&
    typeof checkBlock.hash === "string" &&
    typeof checkBlock.prevHash === "string" &&
    typeof checkBlock.data === "string" &&
    typeof checkBlock.timestamp === "number";
const genesisBlock = new Block(0, "hash", "prevHas", "data", 123456);
const blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLastBlockchain = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createBlock = (data) => {
    const prevBlock = getLastBlockchain();
    const newIndex = prevBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calcBlockHash(newIndex, prevBlock.hash, data, newTimestamp);
    const newBlock = new Block(newIndex, newHash, prevBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (targetBlock) => Block.calcBlockHash(targetBlock.index, targetBlock.prevHash, targetBlock.data, targetBlock.timestamp);
const isVaildBlock = (candidateBlock, prevBlock) => {
    if (!Block.validBlock(candidateBlock)) {
        return false;
    }
    else if (prevBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (prevBlock.hash !== candidateBlock.prevHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isVaildBlock(candidateBlock, getLastBlockchain())) {
        blockchain.push(candidateBlock);
    }
};
//# sourceMappingURL=index.js.map