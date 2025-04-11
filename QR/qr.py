import qrcode
import cv2

img = qrcode.make('Hello World!')

img.save('qr_code.png')

qr_img = cv2.imread("qr_code.png")
qr_detector = cv2.QRCodeDetector()
data, box, straight_qrcode = qr_detector.detectAndDecode(qr_img)

print(data)