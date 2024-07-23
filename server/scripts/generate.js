const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getEthereumAddress(publicKey) {
    const publicKeyHash = keccak256(publicKey.slice(1));
    const ethereumAddress = publicKeyHash.slice(-20);
    return toHex(ethereumAddress);
}


const privateKey = secp256k1.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);

console.log('public key (full):', toHex(publicKey));

console.log('public key (etherem):', getEthereumAddress(publicKey));
