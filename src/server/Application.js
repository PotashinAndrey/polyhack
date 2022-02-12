import Koa from 'koa';
import serve from 'koa-static';
// import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';

/**  */
  export default class Application {
  /**  */
    constructor(config) {
      this.config = config;
    }

  /**  */
    launch() {
      // ---
      const htdocs = new Koa();
      htdocs.use(serve(this.config.serve));

      // ---
      const api = new Koa();
      api.use(bodyParser());
      api.use(async (ctx, next) => {
        const path = 'https://' + this.config.proxy + '/api' + ctx.path;
        const method = ctx.method.toLowerCase();
        const isJSON = ctx.headers['content-type']?.toLowerCase() === 'application/json';
        const body = method === 'get' || !isJSON ? new URLSearchParams(ctx.request.body).toString() || ctx.request.querystring : JSON.stringify(ctx.request.body);
        const headers = { ...ctx.headers, host: this.config.proxy, 'accept-encoding': undefined, 'set-cookie': undefined };

        const url = method === 'get' ? path + '?' + body : path;
        const response = await fetch(url, { method, body: method !== 'get' ? body : null, headers });
        try {
          parseCookies(response).forEach(cookie => {
            ctx.cookies.set(cookie.name, cookie.value);
          });
          ctx.status = response.status;
          const json = response.headers.get('content-type')?.toLowerCase()?.startsWith('application/json');
          if (json) {
            const data = await response.json();
            ctx.body = data;
          } else {
            ctx.body = null;
          }
        } catch (e) {
          console.error(e);
        }
      });

      // ---
      const app = new Koa();
      app.use(mount('/', htdocs));
      app.use(mount('/api', api));

      // const router = new Router();
      // router.get('/authorizeMerchant', (ctx) => {
      //   console.log(ctx.request.headers.host)
      //   const data = {
      //     "status": "200",
      //     "statusMessage": {
      //       "nonce": "25b17b19",
      //       "retries": 0,
      //       "operationalAnalyticsIdentifier": "Apple Pay Demo:A77873CD368A460BD5D3325AD76B01C16BB7F838CFFF654F9A993F4B6A9B4098",
      //       "displayName": "Apple Pay Demo",
      //       "domainName": ctx.request.headers.host.split(":")[0],
      //       "merchantIdentifier": "A77873CD368A460BD5D3325AD76B01C16BB7F838CFFF654F9A993F4B6A9B4098",
      //       "epochTimestamp": new Date().valueOf(),
      //       "expiresAt": new Date().valueOf(),
      //       "merchantSessionIdentifier": "SSHA16E4B64D42940CFB3E9B0D6124DAAA8_A0E617ED4A56A343E07C6E1255BD4098423B3A8E1243236462D07B14B4A0F7C3", "signature": "308006092a864886f70d010702a0803080020101310f300d06096086480165030402010500308006092a864886f70d0107010000a080308203e330820388a00302010202084c304149519d5436300a06082a8648ce3d040302307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3139303531383031333235375a170d3234303531363031333235375a305f3125302306035504030c1c6563632d736d702d62726f6b65722d7369676e5f5543342d50524f4431143012060355040b0c0b694f532053797374656d7331133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004c21577edebd6c7b2218f68dd7090a1218dc7b0bd6f2c283d846095d94af4a5411b83420ed811f3407e83331f1c54c3f7eb3220d6bad5d4eff49289893e7c0f13a38202113082020d300c0603551d130101ff04023000301f0603551d2304183016801423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b304506082b0601050507010104393037303506082b060105050730018629687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c65616963613330323082011d0603551d2004820114308201103082010c06092a864886f7636405013081fe3081c306082b060105050702023081b60c81b352656c69616e6365206f6e207468697320636572746966696361746520627920616e7920706172747920617373756d657320616363657074616e6365206f6620746865207468656e206170706c696361626c65207374616e64617264207465726d7320616e6420636f6e646974696f6e73206f66207573652c20636572746966696361746520706f6c69637920616e642063657274696669636174696f6e2070726163746963652073746174656d656e74732e303606082b06010505070201162a687474703a2f2f7777772e6170706c652e636f6d2f6365727469666963617465617574686f726974792f30340603551d1f042d302b3029a027a0258623687474703a2f2f63726c2e6170706c652e636f6d2f6170706c6561696361332e63726c301d0603551d0e041604149457db6fd57481868989762f7e578507e79b5824300e0603551d0f0101ff040403020780300f06092a864886f76364061d04020500300a06082a8648ce3d0403020349003046022100be09571fe71e1e735b55e5afacb4c72feb445f30185222c7251002b61ebd6f55022100d18b350a5dd6dd6eb1746035b11eb2ce87cfa3e6af6cbd8380890dc82cddaa63308202ee30820275a0030201020208496d2fbf3a98da97300a06082a8648ce3d0403023067311b301906035504030c124170706c6520526f6f74204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3134303530363233343633305a170d3239303530363233343633305a307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004f017118419d76485d51a5e25810776e880a2efde7bae4de08dfc4b93e13356d5665b35ae22d097760d224e7bba08fd7617ce88cb76bb6670bec8e82984ff5445a381f73081f4304606082b06010505070101043a3038303606082b06010505073001862a687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c65726f6f7463616733301d0603551d0e0416041423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b300f0603551d130101ff040530030101ff301f0603551d23041830168014bbb0dea15833889aa48a99debebdebafdacb24ab30370603551d1f0430302e302ca02aa0288626687474703a2f2f63726c2e6170706c652e636f6d2f6170706c65726f6f74636167332e63726c300e0603551d0f0101ff0404030201063010060a2a864886f7636406020e04020500300a06082a8648ce3d040302036700306402303acf7283511699b186fb35c356ca62bff417edd90f754da28ebef19c815e42b789f898f79b599f98d5410d8f9de9c2fe0230322dd54421b0a305776c5df3383b9067fd177c2c216d964fc6726982126f54f87a7d1b99cb9b0989216106990f09921d00003182018b30820187020101308186307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b300906035504061302555302084c304149519d5436300d06096086480165030402010500a08195301806092a864886f70d010903310b06092a864886f70d010701301c06092a864886f70d010905310f170d3231313231313231323335365a302a06092a864886f70d010934311d301b300d06096086480165030402010500a10a06082a8648ce3d040302302f06092a864886f70d01090431220420c413910096ca56feb8044a31e8a249564d98cac3ea5e0477313c40897b1a9286300a06082a8648ce3d0403020446304402201259397bb3d12b452dd8d80f5f0ff9ed666fd2401e05ba4738fc232c63ae716502203c94fb20a1e7fc693775065dbadfed2eae3c22a0e3e9bfa338eb22274a702157000000000000"
      //     },
      //     "statusCode": 200
      //   }
      //   ctx.body = JSON.stringify(data);
      // });
      // app.use(router.routes());

      app.listen(this.config.port, () => {
        const location = `http://${this.config.host}:${this.config.port}`;
      });

      try {
        const ssl = {
          key: fs.readFileSync(this.config.ssl + this.config.key),
          cert: fs.readFileSync(this.config.ssl + this.config.cert)
        };
        https.createServer(ssl, app.callback()).listen(this.config.https, () => {
          const location = `https://${this.config.host}:${this.config.https}`;
          console.log(`server running at ${location}`);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  function parseCookies(response) {
    const raw = response.headers.raw()['set-cookie'] || [];
    return raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      const cookie = cookiePart.split('=');
      return { name: cookie[0], value: cookie[1] }
    });
  }
