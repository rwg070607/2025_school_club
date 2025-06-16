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

fetch('http://127.0.0.1:5000/data')
  .then((res) => res.json())  // 응답을 JSON 형식으로 파싱
  .then((data) => console.log(data))
  .catch((err) => console.log('Error:', err));
