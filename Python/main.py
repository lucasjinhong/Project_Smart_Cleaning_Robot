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
    #yolo = cv2.dnn.readNet('./yolov5n.pt', './yolov5n.yaml')

    wait = 0

    while True:
        # 影像處理
        _, frame = cap.read()
        orig_frame = frame.copy()

        result = model(orig_frame)
        data = Counter(result.pandas().xyxy[0].name).most_common()

        '''
        classes = []

        with open("./coco.yaml", 'r') as f:
            classes = f.read().splitlines()

        blob = cv2.dnn.blobFromImage(orig_frame, 1/255, (320,320), (0,0,0), swapRB=True, crop=False)
        yolo.setInput(blob)
        output_layers_name = yolo.getUnconnectedOutLayersNames()
        layeroutput = yolo.forward(output_layers_name)

        boxes = []
        confidences = []
        class_ids = []
        width = 320
        height = 320

        for output in layeroutput:
            for detection in output:
                score = detection[5:]
                class_id = np.argmax(score)
                confidence = score[class_id]

                if confidence > 0.7:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[0] * height)
                    w = int(detection[0] * width)
                    h = int(detection[0] * height)

                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x,y,w,h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)

        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
        font = cv2.FONT_HERSHEY_PLAIN
        colors = np.random.uniform(0, 255, size=(len(boxes), 3))

        for i in indexes.flatten():
            x,y,w,h = boxes[i]

            label = str(classes[class_ids[i]])
            confi = str(round(confidences[i], 2))
            color = colors[i]

            cv2.rectangle(orig_frame, (x,y), (x+w, y+h), color, 1)
            cv2.putText(orig_frame, label +" "+confi, (x, y+20), font, 2, (255,255,255), 1)
        '''

        font = cv2.FONT_HERSHEY_SIMPLEX
        if data:
            cv2.putText(orig_frame, data[0][0], (10, 30), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

        cv2.imshow('Detected Objects', orig_frame)

        if wait < 100:
            wait += 1

        else:
            if data:
                payload = {'obejct': [data[0][0]]}
                print(json.dumps(payload))

            # Send http request
                r = requests.patch(url, json.dumps(payload), headers=headers)
                print(f"Status Code: {r.status_code}, Response: {r.json()}")

            wait = 0

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()  # 釋放攝影機
    cv2.destroyAllWindows()  # 關閉所有 OpenCV 視窗


if __name__ == '__main__':
    main()
