import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'blox-backup';

setPassiveTouchGestures(true);
setRootPath(BloxAppGlobals.rootPath);

class EosAirDropsApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
          margin: 0;
          background: url("images/clouds.svg");
          background-attachment:fixed;
          background-position:center bottom;
          background-size: fit;
          background-repeat: no-repeat;
          background-size: 2200px 406px;
          background-repeat: repeat-x;
          min-width: 900px;
          min-height: 900px;
        }
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-wrap: nowrap;
        }
        .header-container {
          flex: 1;
        }
        .action-container {
          flex: 1;
        }
        .download-container {
          min-height:400px;
        }

        .title-container {
          max-width: 854px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          flex: 1;
        }
        .heavy{
          font-weight: 800;
        }

        .icon-container{
          max-width: 200px;
          flex: 1;
          margin-top: 20px;
        }
        h1 {
          font-size: 90px;
          font-weight: 300;
          margin:0;
        }
        h2 {
          font-size: 40px;
          font-weight: 300;
          font-style: normal;
          margin:0;
        }
        .group-header-container {
          padding:50px 20px;
          max-width: 854px;
          margin: 0 auto;
          display: flex;
          flex:1;
          flex-wrap: wrap;
        }


        .download-container img {
          width: 50px;
          cursor: pointer;
          padding-bottom: 20px;
        }
        .group-footer-container{
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          height: 100%;
          min-height:400px;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
        .download-text {
          color: #004D78;
          font-size:26px;
        }
        .download-text:hover {
          text-decoration:underline
        }
        .created {
          padding: 40px 0 10px 0;
          color: #004D78;
          font-size:11px;
        }
        .group-action-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
        .account {
          background-image: linear-gradient(-270deg, #DDF1FB 0%, #B9DEF5 100%);
          border: 1px solid #003E63;
          box-shadow: inset 0 3px 3px 0 rgba(0,0,0,0.50);
          border-radius: 8px;
          width: 500px;
          height: 70px;
          font-size: 25px;
          color: #003453;
          text-align: left;
          padding-left:30px;
          outline:0;
          margin-right:20px;
          z-index: 10;
        }
        .submit{
          background-image: linear-gradient(-180deg, #DDF1FB 0%, #B9DEF5 100%);
          border: 1px solid #003E63;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
          border-radius: 8px;
          width: 200px;
          height: 70px;
          font-size: 26px;
          color: #003453;
          font-size: 31px;
          color: #003554;
          outline:0;
          text-shadow: 0 2px 1px #FFFFFF;
          cursor: pointer;
        }
        label {
          position: absolute;
          z-index: 0;
        }
        .wide {
          width: 752px
        }
      </style>

      <iron-ajax
        id="ironAjaxPost"
        method="POST"
        url="https://eosairdrops.app/api"
        body='{{data}}'
        content-type="application/json"
        handle-as="text"
        on-response="_complete">
      </iron-ajax>

      <iron-ajax
        id="ironAjaxGet"
        method="GET"
        url="https://eosairdrops.app/api"
        content-type="application/json"
        handle-as="text"
        on-response="_download">
      </iron-ajax>

      <blox-backup id="bloxBackup"></blox-backup>

      <div class="container">
      {{json(lastResponse)}}
        <div class="header-container">
          <div class="group-header-container">
            <div class="icon-container"><img src="images/airdrops-icon.png" alt="Picture of a crate with a parachute attached"></div>
            <div class="title-container">
              <h1>EOS <span class="heavy"> AirDrops</span></h1>
              <h2>Register your EOS acocunt today!</h2>
            </div>
          </div>
        </div>

        <div class="action-container">
          <div class="group-action-container">
            <template is="dom-if" if="{{initial}}">
              <input type="text" name="account" class="account" id="account" placeholder="EOS Account Name or Public Key" >
              <label for="account">EOS Account Name or Public Key</label>
              <input type="submit" value="Register" class="submit" on-click="_register">
            </template>
            <template is="dom-if" if="{{loading}}">
              <input type="submit" value="Finding your account..." class="submit wide">
            </template>
            <template is="dom-if" if="{{complete}}">
              <input type="submit" value="Success! You are registered!" class="submit wide">
            </template>
          </div>
          <template is="dom-if" if="{{error}}">
            <div class="group-action-container">
              <p>Sorry, that's not right, please try again.</p>
            </div>
          </template>
        </div>

        <div class="download-container">
          <div class="group-footer-container">
            <div><img src="images/csv-download.svg" alt="CSV file available for download" on-click="_getData"></div>
            <div class="download-text" on-click="_getData">Download the complete list for your airdrop</div>
            <div class="created">Created with love by EOS Blox as a gift to the EOS community</div>
          </div>
        </div>

      </div>
    `;
  }
  static get properties() {
    return {
      data: {
        type: Object,
      },
      initial: {
        type: Boolean,
        value: true
      },
      loading: {
        type: Boolean,
        value: false
      },
      complete: {
        type: Boolean,
        value: false
      },
      error: {
        type: Boolean,
        value: false
      }
    };
  }

  _register(){
    this.error = false;
    const account = this.shadowRoot.querySelector('#account').value
    if (account.length == 12 || account.length == 53){
      this.data = {account};
      this.$.ironAjaxPost.generateRequest();
      this.initial = false;
      this.loading = true;
    } else {
      this.error = true;
    }
  }
  _complete(response){
    if (JSON.parse(response.detail.__data.response).publicKey){
      this.loading = false;
      this.complete = true;
      this.error = false;
    } else {
      this.loading = false;
      this.complete = false;
      this.initial = true;
      this.error = true;
    }
  }
  _getData(){
    this.$.ironAjaxGet.generateRequest();
  }
  _download(response){
    this.$.bloxBackup.backup('eosAirDrops', response.detail.__data.response, 'json')
  }

} window.customElements.define('eos-air-drops-app', EosAirDropsApp);
