const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02e619b0b027a1bd852405c0046754797d9e270f9653a3238ee51f2b643b704624": 100,
  "0212cb92d3efd646180462fd0cd8506dad997cdce4ca156eb2a27b3b76329a8af3": 50,
  "02f0cc384f75805e8925d58d26093ebabf56b5217f768da1e077e878a225fb409b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recovery} = req.body;

  if(!signature) res.status(404).send({ message: "Signature is missing" });
  if(!recovery) res.status(400).send({ message: "Recovery is missing" });

  try {
    
    const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
    const hash = keccak256(bytes);

    const sig = new Uint8Array(signature);

    const publicKey =  secp.recoverPublicKey(hash, sig, recovery);

    if(toHex(publicKey) !== sender){
      res.status(400).send({ message: "signature no is valid" });
    }


    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
