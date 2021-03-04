


/*
    - set-start
    - fade-in
    - animation-in
    - animation-main
    - animation-out
    

*/

/*


*/

import {dashedStringToCammelCase} from "../utils/utils"

import gsap from "gsap/gsap-core";


// "rijndael-page-9"

class AnimationPage{
    constructor(pageID){

        this.id = pageID;
        this.page = document.getElementById(pageID)

        this.FADE_IN_DURATION = .001;
        this.FADE_OUT_DURATION = .001;
        this.FADE_OUT_DELAY = 3;


        this.pageElements = {}

       // this.movables = new MovablesController();


       this.movables = {}
       this.landings = {}

       this.initPage();
    }

    initPage(){
        // preinit
        this.collectCallableItems();
        this.init();

        this.collectMovables()
        this.collectLandings()

        // get movables

       
        // collect id
        // postinit();
    }


    collectMovables(){
        const elements = this.page.querySelectorAll('.movable') 


        elements.forEach(element => {
            if(!element.id) throw new Error(`movable element missing id: ${element}`)

            // check if has connected landing
            

            // remove from current parent
            element.parentNode.removeChild(element);

            // add to the end of page
            this.page.appendChild(element)

            this.movables[element.id] = element;
        })
        // paste to absolute position on page end

        // add to movable
    }

    collectLandings(){
        const elements = this.page.querySelectorAll('.landing') 
    }

    collectCallableItems(){


        const prefix = `rijndael-${this.id}`

        // ge all elements on this page with id starting with prefix
        const elements = this.page.querySelectorAll(`[id^='${prefix}']`) 

    
      
        const obj = [...elements].reduce((prev, elem) => {          
            // remove prefix
            const elementObjID = dashedStringToCammelCase(elem.id.replace(`${prefix}-`, ''))

            return {...prev, [elementObjID]: elem}
        }, {})
        

        this.pageElements = obj;
        return obj;
    }

    // create missing elements with javascript & register them with services
    init(){}


    setPageStartingPos(){}
    createFadeIn(){}
    createAnimationMain(){}
    createAnimationOut(){}
    createAnimationIn(){}
    createFadeOut(){}


    hide(){
        gsap.set(this.page, {opacity: 1})
    }


    /* movable helpers */


    createMovables(landingElements, classList=[]){
        classList = [...classList, "movable"]

        const createdMovables = []

        landingElements.forEach(element => {
          
            const movable = document.createElement("div")
            movable.classList.add(...classList)
            movable.id = `${element.id}--movable`;
            movable.dataset.currentLanding = element.id;
            movable.dataset.ogLanding = element.id;
            this.fitMovableToParent(movable)
            this.movables[element.id] = movable; 
                
            this.page.appendChild(movable)
            createdMovables.push(movable)
        })

        return createdMovables;
    }

    
    getBoundsRelativeToMovable(landingElement){    
        const pageBounds = this.page.getBoundingClientRect();
        const landingBounds = landingElement.getBoundingClientRect();

        return {
            x: landingBounds.x - pageBounds.x,
            y: landingBounds.y - pageBounds.y,
            width: landingBounds.width,
            height: landingBounds.height
        }
    }

    fitMovableToParent(movable){
        // loop over list and gsap set
        const landing = document.getElementById(movable.dataset.currentLanding)
        const bounds = this.getBoundsRelativeToMovable(landing)

        gsap.set(movable, {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
        })
    }

    moveToLanding(movable, landing){
        const landingBounds = this.getBoundsRelativeToMovable(landing)
        console.log(movable, landing)
        const tl = gsap.timeline();
        tl.to(movable, {
            zIndex: 10,
            x: landingBounds.x,
            y: landingBounds.y
        })
        tl.set(movable, {zIndex: 5})
        return tl;
    }

    
}

export default AnimationPage;