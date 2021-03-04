import "./main.scss";

import TestPage from "./pages/page/page.animation"
import DataController from "./core/DataController"

import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build


export const tl = gsap.timeline({paused: true})


window.onload = function(){
    gsap.registerPlugin(CSSPlugin)



    const test = new TestPage()
    test.hide();


    tl.add(test.setPageStartingPos());
    tl.add(test.createAnimationIn());
    tl.add(test.createAnimationMain())


    setTimeout(() => {
      //  DataController.updateState("gridData", [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0])
      tl.play();
    }, 2000)

 
}