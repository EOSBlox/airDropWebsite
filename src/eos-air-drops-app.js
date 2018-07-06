import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/iron-ajax/iron-ajax.js';


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


      </style>

      <iron-ajax
        id="ironAjax"
        method="POST"
        url="https://eosairdrops.app/api"
        body='{{data}}'
        content-type="application/json"
        handle-as="text"
        on-response="_handleResponse">
      </iron-ajax>

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
            <input type="text" name="account" class="account" id="account" placeholder="EOS Account Name or Public Key" >
            <label for="account">EOS Account Name or Public Key</label>
            <input type="submit" value="Register" class="submit" on-click="_register">
          </div>
        </div>

        <div class="download-container">
          <div class="group-footer-container">
            <div><img src="images/csv-download.svg" alt="CSV file available for download"></div>
            <div class="download-text">Download the complete list for your airdrop</div>
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
      }
    };
  }

  _register(){
    const account = this.shadowRoot.querySelector('#account').value
    if (account.length == 12 || account.length == 53){
      this.data = {account};
      this.$.ironAjax.generateRequest();
    } 
  }
  _handleResponse(response){
    console.log(response.detail.__data.response)
  }

} window.customElements.define('eos-air-drops-app', EosAirDropsApp);
