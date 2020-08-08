import { create, Text, Wrapper } from './createElement'
// import { TimeLine, Animation } from './animation'
// import { ease } from './cubicBezier'
import { Panel } from './Panel.js'
import { TabPanel } from './TabPanel.js'
import { Carousel } from './Carousel.js'
import { ListView } from './ListView'

// import css from './carousel.css'
import './carousel.css'


// console.log(css)
// let panel = <Panel title="this is my panel" >
//   <span>this is content</span>
// </Panel>

// console.log(panel)

let component = <Carousel data={[
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg ',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg ',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg ',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg ',
]}></Carousel>

component.mountTo(document.getElementById('container'))

// let tabpanel = <TabPanel>
//   <span title="title1">this is content1</span>
//   <span title="title2">this is content2</span>
//   <span title="title3">this is content3</span>
//   <span title="title4">this is content4</span>
// </TabPanel>

// let tabpanel = <CarouselView>
//   <span>This is content1</span>
//   <span>This is content2</span>
//   <span>This is content3</span>
//   <span>This is content4</span>
// </CarouselView>-

// let data = [
//   { title: '蓝猫', url: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg' },
//   { title: '白猫', url: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg' },
//   { title: '黑猫', url: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg' },
//   { title: '花猫', url: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg' }
// ]

// let list = <ListView data={data}>
//   {
//     record => <figure>
//     <img />
//     <figcaption></figcaption>
//   </figure>
//   }
// </ListView>

// list.mountTo(document.getElementById('container'))
