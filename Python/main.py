import cv2
import numpy as np
import json
import requests
import torch
from collections import Counter


def main():
    # 選擇第二隻攝影機
    cap = cv2.VideoCapture(0)

    url = "http://35.77.46.57:3000/home/data/627bb1b46013fa5837d41835"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    model = torch.hub.load('ultralytics/yolov5', 'yolov5n')

    wait = 0

    while True:
        # 影像處理
        _, frame = cap.read()
        orig_frame = frame.copy()
        cv2.imshow('Detected Objects', orig_frame)

        if wait < 20:
            wait += 1

        else:
            result = model(orig_frame)
            data = Counter(result.pandas().xyxy[0].name).most_common()
            print(data)

            payload = {'obejct': data}

            # Send http request
            '''if data:
                r = requests.post(url, json.dumps(payload), headers=headers)
                print(f"Status Code: {r.status_code}, Response: {r.json()}")'''

            wait = 0

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()  # 釋放攝影機
    cv2.destroyAllWindows()  # 關閉所有 OpenCV 視窗


if __name__ == '__main__':
    main()
