import Component, { html, css } from '../class/Component.js';
import AppButton from './app-button.js';
// import QrScanner from '../library/qr-scanner.min.js';
import $ from '../class/DOM.js';

const constraints = {
  video: {
    width: 480,
    height: 640,
    facingMode: "environment"
  },
  audio: false
};

// QrScanner.WORKER_PATH = '../qr-scanner-worker.min.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    position: relative;
    height: 100%;
  }
  #camera-access {
    width: 90%;
    margin: 0 5%;
    position: absolute;
    bottom: 10px;
  }
  video {
    width: 100%;
    display: none;
  }
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  slot {
    display: block;
  }`;

/** name {AppCamera} @class @ui @component <app-camera />
  * description
  */
  export default class AppCamera extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <video></video>
        <canvas></canvas>
        <app-button secondary wide id="camera-access">Turn camera on</app-button>
        <div id="devices"></div>
      </template>`;

  // /** Создание компонента {AppCamera} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {AppCamera} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      let sended = false;

      /** @type {HTMLVideoElement} */
      // @ts-ignore
      const video = $('video', node);

      /** @type {HTMLCanvasElement} */
      // @ts-ignore
      const canvas = $('canvas', node);
      const context = canvas.getContext("2d");
      const list = $('#devices', node);

      const access = $("#camera-access", node);
      // let streamStarted = false;

      const selectDevice = async id => {
        const updatedConstraints = {
          ...constraints,
          deviceId: {
            exact: id
          }
        };
        startStream(updatedConstraints);
        // startStream(id);
        // const qrScanner = new QrScanner(video, result => {
        //   console.log('decoded qr code:', result);
        // });
        // await qrScanner.setCamera(constraints);
        // video.play();
        // await qrScanner.start();
      }

      const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
      };

      const handleStream = (stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        this.store({ stream, paused: false });
        requestAnimationFrame(tick);

        list.remove();
        access.remove();
        // debugger;

        // setTimeout(() => qr(stream), 100);
        // play.classList.add('d-none');
        // pause.classList.remove('d-none');
        // screenshot.classList.remove('d-none');

        // @ts-ignore
        // var barcodeDetector = new BarcodeDetector({formats: ['qrcode']});
      };



      const tick = () => {
        // loadingMessage.innerText = "⌛ Loading video..."
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          // loadingMessage.hidden = true;
          // canvasElement.hidden = false;
          // outputContainer.hidden = false;

          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          // @ts-ignore
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            drawLine(context, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(context, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            // outputMessage.hidden = true;
            // outputData.parentElement.hidden = false;
            // outputData.innerText = code.data;
            if (!sended) {
              this.event("qr-code", code.data);
              sended = true;
            }
          } else {
            // outputMessage.hidden = false;
            // outputData.parentElement.hidden = true;
          }
        }
        const { paused } = this.store();
        if (!paused) requestAnimationFrame(tick);
      }


      const getCameraSelection = async () => {
        const devices = (await navigator.mediaDevices.enumerateDevices())
          .filter(device => device.kind === 'videoinput');
        // const devices = await QrScanner.listCameras(true);

        if (devices.length === 1) {
          selectDevice(devices[0]);
          return;
        }

        if (devices.length > 1) {
          devices.forEach(device => {
            const button = document.createElement('button');
            button.innerText = device.label;
            button.addEventListener('click', () => selectDevice(device.deviceId));
            list.appendChild(button);
          });
        }
      };

      access.addEventListener('click', getCameraSelection);
      return this;
    }

    /** */
    unmount(node) {
      const { stream } = this.store();

      if (stream) {
        console.log(stream);
        stream.getTracks().forEach(track => {
          track.stop();
          console.log(track);
        });
        this.store({ paused: true });
      }

      return this;
    }
  }

Component.init(AppCamera, 'app-camera', { attributes, properties });

function drawLine(context, begin, end, color) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.lineWidth = 4;
  context.strokeStyle = color;
  context.stroke();
}
