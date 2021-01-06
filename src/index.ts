import * as CryptoJS from "crypto-js";

class Block {
	public index: number;
	public hash: string;
	public prevHash: string;
	public data: string;
	public timestamp: number;

	static calcBlockHash = (index: number, prevHash: string, data: string, timestamp: number): string =>
		CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

	constructor(index: number, hash: string, prevHash: string, data: string, timestamp: number) {
		this.index = index;
		this.hash = hash;
		this.prevHash = prevHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}

const genesisBlock: Block = new Block(0, "hash", "prevHas", "data", 123456);

const blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLastBlockchain = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

export {};
