import cv2
import numpy as np
import json
import requests
import torch
from collections import Counter
from PIL import Image, ImageDraw

def main():
    # 選擇第二隻攝影機
    cap = cv2.VideoCapture(0)

    url = "http://35.77.46.57:3000/home/data/627bb1b46013fa5837d41835"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

    model = torch.hub.load('../yolo/yolov5', 'custom', path='../yolo/yolov5/runs/train/yolo_road_det5/weights/best.pt', source='local')
    model.conf = 0.9
    model.source = 0

    font = cv2.FONT_HERSHEY_SIMPLEX
    wait = 0

    while True:
        # 影像處理
        _, frame = cap.read()
        orig_frame = frame.copy()

        result = model(orig_frame)
        jsonData = json.loads(result.pandas().xyxy[0].to_json(orient="records"))

        hCenter, wCenter = 320, 240

        if len(jsonData):
            for j in jsonData:
                xmax, ymax, xmin, ymin = int(j['xmax']), int(j['ymax']), int(j['xmin']), int(j['ymin'])
                name = j['name']
                conf = str('{0:.2}'.format(j['confidence']))

                height = xmax - xmin
                width = ymax - ymin

                xmaxD = abs(xmax - wCenter)
                xminD = abs(xmin - wCenter)
                ymaxD = abs(ymax - wCenter)
                yminD = abs(ymin - wCenter)

                #if abs(xmaxD - xminD) < 10 and  abs(ymaxD - yminD) < 10:
                    #print(xmaxD, xminD, ymaxD, yminD)

                #pixel = height * width

                #if(pixel > 100*100):
                    #print('yes')
                
                cv2.rectangle(orig_frame, (xmin,ymin), (xmax,ymax), (0, 255, 0), 2)
                cv2.putText(orig_frame, name + conf, (xmin,ymin), font, 1, (0, 255, 0), 2, cv2.LINE_AA)  

        cv2.rectangle(orig_frame, (hCenter - 5, wCenter - 5), (hCenter + 5, wCenter + 5), (0, 0, 255), 1)
        cv2.imshow('Detected Objects', orig_frame)

        '''
        if wait < 100:
            wait += 1

        else:
            if data:
                payload = {'object': [data[0][0]]}
                print(json.dumps(payload))

            # Send http request
                r = requests.patch(url, json.dumps(payload), headers=headers)
                print(f"Status Code: {r.status_code}, Response: {r.json()}")

            wait = 0
        '''

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()  # 釋放攝影機
    cv2.destroyAllWindows()  # 關閉所有 OpenCV 視窗


if __name__ == '__main__':
    main()
