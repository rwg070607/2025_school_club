const resultElement = document.getElementById("result");
const html5QrCode = new Html5Qrcode("reader");

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
            html5QrCode.stop(); // optional: stop after first scan

            // 여기서 안전성 검사 AJAX 요청 보내기
            // fetch('https://my-python-server/check', { method: 'POST', body: JSON.stringify({ data: qrCodeMessage }) })
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
