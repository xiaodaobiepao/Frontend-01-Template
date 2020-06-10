# 每周总结可以写在这里
### Animation
- @keyframes定义
- animation使用
```css
@keyframes mykf {
  from {background: red}
  to {background: yellow}
}
div {
  animation:mykf 5s infinite;
}
```
- animation-name 时间曲线
- animation-duration  动画的时长
- animation-timing-function 动画的时间曲线
- anmation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

### Transition
- transition-property 要变换的属性
- transition-duration 变换的时长
- transitioin-timing-function 时间曲线
- transition-delay 延迟

### cubic-bezier