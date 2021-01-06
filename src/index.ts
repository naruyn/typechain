import * as CryptoJS from "crypto-js";

class Block {
	public index: number;
	public hash: string;
	public prevHash: string;
	public data: string;
	public timestamp: number;

	static calcBlockHash = (index: number, prevHash: string, data: string, timestamp: number): string =>
		CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

	static validBlock = (checkBlock: Block) =>
		typeof checkBlock.index === "number" &&
		typeof checkBlock.hash === "string" &&
		typeof checkBlock.prevHash === "string" &&
		typeof checkBlock.data === "string" &&
		typeof checkBlock.timestamp === "number";

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

const createBlock = (data: string): Block => {
	const prevBlock: Block = getLastBlockchain();
	const newIndex: number = prevBlock.index + 1;
	const newTimestamp: number = getNewTimestamp();
	const newHash: string = Block.calcBlockHash(newIndex, prevBlock.hash, data, newTimestamp);
	const newBlock: Block = new Block(newIndex, newHash, prevBlock.hash, data, newTimestamp);
	addBlock(newBlock);
	return newBlock;
};

const getHashForBlock = (targetBlock: Block): string =>
	Block.calcBlockHash(targetBlock.index, targetBlock.prevHash, targetBlock.data, targetBlock.timestamp);

const isVaildBlock = (candidateBlock: Block, prevBlock: Block): boolean => {
	if (!Block.validBlock(candidateBlock)) {
		return false;
	} else if (prevBlock.index + 1 !== candidateBlock.index) {
		return false;
	} else if (prevBlock.hash !== candidateBlock.prevHash) {
		return false;
	} else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
		return false;
	} else {
		return true;
	}
};

const addBlock = (candidateBlock: Block): void => {
	if (isVaildBlock(candidateBlock, getLastBlockchain())) {
		blockchain.push(candidateBlock);
	}
};

export {};
