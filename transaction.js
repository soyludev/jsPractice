var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/37c8ad4a54a24596a63cda7735e82367')


const account1='0xf2B9f78be459E4bcbD72BCd4292Ffa2D35b3704b'
const account2= '0xD8D61053cd4fa3B9943e2eF6780f3f9FeE86c909'


const privKey1 = Buffer.from(process.env.PRIVATE_KEY1, 'hex')
const privKey2 = Buffer.from(process.env.PRIVATE_KEY2, 'hex')

//web3.eth.getBalance(account2, (err, bal)=>{console.log(web3.utils.fromWei(bal,'ether'))})

//console.log(res)


web3.eth.getTransactionCount(account1, (err, txCount) =>{
    // build the transaction

    const txObject = {
        noce: web3.utils.toHex(txCount),
        to:account2,
        value: web3.utils.toHex(web3.utils.toWei('0.01','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // sign the transaction
    // console.log(txObject)
    const tx = new Tx(txObject)
    tx.sign(privKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    // bradcast the transaction

    web3.eth.sendSignedTransaction(raw, (err, txhash) => {
        console.log('txhash', txhash)
    })

})


