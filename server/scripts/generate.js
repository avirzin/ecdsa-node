const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

// Getting ethereum address from public key
function getEthereumAddress(publicKey) {
    const publicKeyHash = keccak256(publicKey.slice(1));
    const ethereumAddress = publicKeyHash.slice(-20);
    return toHex(ethereumAddress);
}

// Private key generation
const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

// Public key generation
const publicKey = secp256k1.getPublicKey(privateKey);
console.log('public key (full):', toHex(publicKey));

// Ethereum address generation
console.log('public key (ethereum):', getEthereumAddress(publicKey));
