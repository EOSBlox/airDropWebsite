const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const request = require('request-promise');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

app.use(cors({ origin: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  var accounts = db.collection('account-name');
  var response = [];
  var allAccounts = accounts.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      response.push(doc.data())
    });
    res.send(response);
  })
  .catch(err => {
    res.send({"error":"Error getting documents" + err});
  });
})
app.post('/api', (req, res) => {
  const account = req.body.account;
  if (account.length === 12) {
    getPublicKey(account)
    .then((result) => {
      let publicKey = result.permissions[0].required_auth.keys[0].key;
      let accountName = account;
      return saveAccount({publicKey, accountName})
    })
    .then((accountObj) => {
      res.send(accountObj);
    })
    .catch((error) => {
      res.send(error)
    })
  } else if (account.length === 53) {
    getUser(account)
    .then((result) => {
      let publicKey = account;
      let accountName = result.account_names[0];
      return saveAccount({publicKey, accountName})
    })
    .then((accountObj) => {
      res.send(accountObj);
    })
    .catch((error) => {
      res.send(error)
    })
  }
})

function getUser(public_key) {
  return request({
    "method":"POST", 
    "uri": "https://api.eosnewyork.io/v1/history/get_key_accounts",
    "json": true,
    "body": {public_key}
  });
}

function getPublicKey(account_name) {
  return request({
    "method":"POST", 
    "uri": "https://api.eosnewyork.io/v1/chain/get_account",
    "json": true,
    "body": {account_name}
  });
}

function saveAccount(accountObj) {
  var insert1 = db.collection('account-name').doc(accountObj.accountName);
  insert1.set(accountObj);
  var insert2 = db.collection('public-key').doc(accountObj.publicKey);
  insert2.set(accountObj);
  return accountObj;
}

exports.api = functions.https.onRequest(app);




