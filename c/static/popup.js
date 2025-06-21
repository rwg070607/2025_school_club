const resultElement = document.getElementById("result");
const html5QrCode = new Html5Qrcode("reader");
let url = null;
let malicious = null;

Html5Qrcode.getCameras()
  .then((cameras) => {
    if (cameras && cameras.length) {
      const cameraId = cameras[0].id;
      html5QrCode
        .start(
          cameraId,
          { fps: 10, qrbox: 250 },
          (qrCodeMessage) => {
            resultElement.innerText = `QR Code: ${qrCodeMessage}`;
            url = qrCodeMessage;
            html5QrCode.stop(); // optional: stop after first scan
            update();
          },
          (errorMessage) => {
            // scanning error
          }
        )
        .catch((err) => {
          console.error("Unable to start camera", err);
        });
    }
  })
  .catch((err) => {
    console.error("Unable to get cameras", err);
  });

async function fetch_data() {
    try {
        const res = await fetch('http://127.0.0.1:5000/data', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                'data' : url
            })
        });
        const data = await res.json();
        malicious = data['malicious'];
        console.log(malicious);

    } catch (err) {
        console.log({'err' : err});
    }
};

async function update() {
    await fetch_data();
    const malicious_element = document.getElementById('malicious');
    malicious_element.innerHTML = malicious;
}