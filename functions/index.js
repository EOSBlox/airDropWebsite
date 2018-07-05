const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Eos = require('eosjs')

const config = {
    keyProvider: '', 
    httpEndpoint: 'http://mainnet.genereos.io',
    broadcast: true,
    sign: true,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    expireInSeconds: 30
}
eos = Eos(config)

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

function _accountName(accountName){
    return new Promise((resolve, reject) => {
        console.log("acocunt name");
        eos.getAccount({"account_name":accountName})
        .then((account)=>{
            const publicKey = account.permissions[0].required_auth.keys[0].key;
            resolve([accountName, publicKey]);
        })
        .catch((error)=>{
            reject(error);
        });
    });
}

function _publicKey(publicKey){
    return new Promise((resolve, reject) => {
        console.log("public key");
        eos.getKeyAccounts({"public_key": publicKey})
        .then((accountName)=>{
            resolve([accountName, publicKey]);
        })
        .catch((error)=>{
            reject(error);
        });
    });
}

function _saveAccount(array){
    return new Promise((resolve, reject) => {
        console.log("save account");
        let accountName = array[0];
        let publicKey = array[1];
        var docRef = db.collection('accountNames').doc(accountName);
        return setAda = docRef.set({accountName,publicKey})
        .then((snapshot) => {
            resolve(snapshot)
        })
        .catch((error)=>{
            reject(error);
        });
    });
}


exports.addAccount = functions.https.onRequest((req, res) => {
    const account = req.query.text;
    if (account.length === 12){
        console.log("12");
        _accountName(account)
        .then((account) => {
            console.log(account);
            return _saveAccount(account);
        })
        .then((account) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500)
        });
    } else if (account.length === 53){
        console.log("53")
        _publicKey(account)
        .then((account) => {
            console.log(account);
            return this._saveAccount(account);
        })
        .then((account) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500)
        })
    } else {
        console.log("JUNK")
        this.error = true;
    }
});


// curl --request POST   --url 'https://us-central1-eos-airdrops.cloudfunctions.net/addAccount' --data 'netrommorten'
