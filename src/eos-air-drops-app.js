import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'blox-backup';
import './shared-styles.js';

setPassiveTouchGestures(true);
setRootPath(BloxAppGlobals.rootPath);

class EosAirDropsApp extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        .heavy{
          font-weight: 800;
        }
        .icon-container{
          max-width: 190px;
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
        .downloading{
          height:90px;
          display:block;
          margin: 0 auto;
          height: 229px;
        }
        .download-text {
          color: #004D78;
          font-size:26px;
        }
        .download-text:hover {
          text-decoration:underline
        }
        .created {
          color: #004D78;
          font-size:11px;
        }
        a {
          color: #0A82CB
        }
        .la-ball-fall {
          color: #078CD8;
          margin: 0 auto;
          padding-top: 80px;
        }
        .la-header {
          padding: 50px 20px;
          text-align: center;
          display:flex;
        }
        .la-register {
          text-align: center;
          padding: 20px;
        }
        .la-error {
          text-align: center;
          min-height: 22px;
          padding: 0 20px 0 20px;
        }
        .la-clouds {
          padding: 20px;
          text-align: center;
          margin: 0;
          background: url("images/clouds.svg");
          background-position:center bottom;
          background-size: fit;
          background-repeat: no-repeat;
          background-size: 2200px 406px;
          background-repeat: repeat-x;
          height: 380px;
          overflow:hidden;
        }
        .la-body {
          padding: 20px;
          background-color: #CCECFE;
          height:100%;
        }
        .cloud-spacer{
          width: 100%;
          height: 100px;
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
          outline:0;
          margin-right:20px;
          z-index: 10;
          text-indent: 20px;
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
        .wide {
          width: 752px
        }
        .la-clouds img {
          width: 70px;
          cursor: pointer;
          padding-bottom: 96px;
          padding-top: 35px;
        }
        .title-container {
          max-width: 600px;
          display: flex;
          flex-wrap: wrap;
          flex: 1;
        }
        .center {
          margin: 0 auto;
          display: flex;
        }
        .fade{
          background: -moz-linear-gradient(top, #015f97 0%, #0999ea 100%);
          background: -webkit-linear-gradient(top, #015f97 0%,#0999ea 100%);
          background: linear-gradient(to bottom, #015f97 0%,#0999ea 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#015f97', endColorstr='#0999ea',GradientType=0 );
        }
        .icon-container img {
                max-width: 160px;
            }

        @media screen and (max-width: 800px) {
            .account {
              width: 100%;
            }
            .submit {
              margin-top:20px;
              width: 100%;
              font-size:20px;
            }
            .la-clouds img {
              width: 60px;
            }
            .download-text {
              font-size: 20px;
            }
            .la-clouds {
              background-size: 1626px 300px;
              height: 286px;
            }
            .la-clouds img {
              padding-bottom: 66px;
              padding-top: 0;
            }
            .icon-container {
                max-width: 100px;
                padding-right: 20px;
            }
            .icon-container img {
                max-width: 100px;
            }
            h1 {
              font-size: 64px;
            }
            h2 {
              font-size: 22px;
            }
            
        }
        @media screen and (max-width: 412px) {
            .submit {
              font-size:15px
            }
            .account {
              font-size:16px
            }
            .la-clouds img {
              width: 50px;
              padding-bottom: 33px;
              padding-top: 0;
            }
            .download-text {
              font-size: 18px;
            }
            h1 {
              font-size: 64px;
            }
            h2 {
              font-size: 22px;
            }
            .center {
              display: block
            }
            .icon-container{
              margin: 0 auto;
            }
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
<div class="fade">
        <div class="la-header">
          <div class="center">
            <div class="icon-container"><img src="images/airdrops-icon.png" alt="Picture of a crate with a parachute attached"></div>
            <div class="title-container">
              <h1>EOS <span class="heavy"> AirDrops</span></h1>
              <h2>Register your EOS acocunt today!</h2>
            </div>
          </div>
        </div>
        <div class="la-register">
          <template is="dom-if" if="{{initial}}">
            <input type="text" name="account" class="account" id="account" placeholder="EOS Account Name or Public Key" >
            <input type="submit" value="Register" class="submit" on-click="_register">
          </template>
          <template is="dom-if" if="{{loading}}">
            <input type="submit" value="Finding your account..." class="submit wide">
          </template>
          <template is="dom-if" if="{{complete}}">
            <input type="submit" value="Success! You are now registered!" class="submit wide">
          </template>
        </div>
        <div class="la-error">
          <template is="dom-if" if="{{error}}">
              <p>Sorry, that's not right, please try again.</p>
          </template>
        </div>
        <div class="la-clouds">
          <div class="cloud-spacer"></div>
          <template is="dom-if" if="{{!downloading}}">
            <img src="images/json-download.svg" alt="CSV file available for download" on-click="_getData">
          </template>
          <template is="dom-if" if="{{downloading}}">
            <div class="downloading">
              <div class="la-ball-fall la-2x"><div></div><div></div><div></div></div>
            </div>
          </template>
          <div class="download-text" on-click="_getData">Download the complete list for your airdrop</div>
          <div class="created">Created with love by <a href="http://www.eosblox.com" target="_blank">EOS Blox</a> as a gift to the EOS community</div>
        </div>
</div>

        <div class="la-body">

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
      },
      downloading: {
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
    this.downloading = true;
  }
  _download(response){
    this.downloading = false;
    this.$.bloxBackup.backup('eosAirDrops', response.detail.__data.response, 'json')
  }

} window.customElements.define('eos-air-drops-app', EosAirDropsApp);
