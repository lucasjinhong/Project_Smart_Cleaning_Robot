## How to Run the Detection

1. go to the yolov5 dir
2. install the yolov5's requirement 

```
pip install -r requirements.txt
```

3. run it

```
python detect.py --source 0 --weights runs/train/yolo_road_det5/weights/best.pt --conf 0.85
```
