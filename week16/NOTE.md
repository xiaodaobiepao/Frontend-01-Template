# 每周总结可以写在这里
## 手势
- Tap
- Pan
- Flick
- Press

### 手势关系
- start-->end->tap
- start-->0.5->pressstart-->移动10px->panstart-->move->panmove->panend
- start-->0.5s->pressstart-->end->pressend
- start-->移动10px->panstart-->移动->panmove->panend
- flick是panend的一个变形，可能同时触发