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
const genesisBlock = new Block(0, "hash", "prevHas", "data", 123456);
const blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLastBlockchain = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
//# sourceMappingURL=index.js.map