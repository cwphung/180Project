import cv2
from cvzone.HandTrackingModule import HandDetector

cap = cv2.VideoCapture(0)

detector = HandDetector(detectionCon=0.6, maxHands= 2)

while True:
  _, img = cap.read()
  hands, img = detector.findHands(img)
  cv2.imshow("Smart Camera",img)
  if cv2.waitKey(1) == ord("q"):
    break