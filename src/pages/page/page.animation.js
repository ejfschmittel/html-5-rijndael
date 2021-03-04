import AnimationPage from "../../core/AnimationPage"

import DataController from "../../core/DataController"
import Grid from "../../components/Grid"

// id === html page id

import {gsap} from "gsap"


import {tl} from "../../index"


import "./page.styles.scss";

class TestPage extends AnimationPage{
    constructor(){
        super("page-9")
    }

    init(){
        
        const {gridContainer } = this.pageElements

        const grid = new Grid("test-grid", 4, 4, ["rijndael-grid__cell", "rijndael-grid__cell--yellow", ])

        //const movablesGrid = new Grid("test-grid2", 4, 4, ["rijndael-grid__cell", "rijndael-grid__cell--yellow", "movable"])

       // const hiddenGrid = newGrid("hidden-grid", 4, 4, ["rijndael-grid__cell", "rijndael-grid__cell--yellow", "landing"])
        

       
        
        DataController.subscribe("gridData", grid.getCells())

        gridContainer.appendChild(grid.getComponent())
        //gridContainer.appendChild(hiddenGrid.getComponent())

        const gridMovables = this.createMovables(grid.getCells(), ["rijndael-grid__cell", "rijndael-grid__cell--yellow"])

        gridMovables.forEach((movable, idx) => {
       // console.log(movable)
       movable.innerHTML = idx
        })


        this.pageElements = {
            ...this.pageElements,
            grid: grid.getComponent(), 
            gridMovables,
        }

        this.grid = grid 
        this.addResizeEvent();
    }



   addResizeEvent(){
       window.addEventListener("resize", () => {
           // snyc movables

            const progress = tl.totalTime();

            console.log(progress)

         
            Object.keys(this.movables).forEach(key => {
                const movable = this.movables[key]

                // maybe conditionally if visible

                this.fitMovableToParent(movable)
            })
        
         
           // recalc timeline (debounced)
           tl.pause();
          tl.clear();
          tl.delay(1)

          // recreate timeline
          console.time("createtl")
          tl.add(this.setPageStartingPos());
           tl.add(this.createAnimationIn());
           tl.add(this.createAnimationMain())
           console.timeEnd("createtl")
            // 
            // jump to current progress

         tl.play(progress)
       })
   }




    setPageStartingPos(){

        const {
            animatableBackground,
            animatableBackgroundBar,
            page,
            pageBody,
            grid,
        } = this.pageElements

        let c = {val: 0};
        const tl = gsap.timeline()
        tl.to(c, {val: 1, duration: .0001})
        tl.set(animatableBackground, {y: "100%"})

        tl.set([page, pageBody], {opacity: 0})

        return tl;
    }

    createAnimationIn(){

        const {
            animatableBackground,
            animatableBackgroundBar,
            page,
            pageBar,
            pageTitleMask,
            pageBody,
            grid,
            gridMovables
        } = this.pageElements


        const pagePos = page.getBoundingClientRect()
        const barPos = pageBar.getBoundingClientRect()
        

        const tl = gsap.timeline();


        console.log(this.pageElements)


        console.log(grid)
        tl.set(gridMovables, {y: (idx, target) => {
            const landing = document.getElementById(target.dataset.currentLanding);
            const bounds = this.getBoundsRelativeToMovable(landing)

            return bounds.y +100;

        }})
        tl.to(animatableBackground, {y: 0, duration: 1.5})

        tl.to(animatableBackgroundBar, {y: barPos.y - pagePos.y})

        tl.to(page, {opacity: 1})
        tl.to(pageTitleMask, {x: "100%", duration: 1})
        tl.to(pageBody, {opacity: 1})
        tl.to(gridMovables, {y: (idx, target) => {
            const landing = document.getElementById(target.dataset.currentLanding);
            const bounds = this.getBoundsRelativeToMovable(landing)

            return bounds.y;

        }, duration: 3})
        return tl;
    }


    shiftRow(rowMovables, rowLandings){
        const tl = gsap.timeline()
        


        const landingBounds = this.getBoundsRelativeToMovable(rowLandings[3])
        const landingBoundsFirst = this.getBoundsRelativeToMovable(rowLandings[0])
        const firstCellTl = gsap.timeline();

        firstCellTl.set(rowMovables[0], {zIndex: 11})

        firstCellTl.to(rowMovables[0], {
            x: landingBoundsFirst.x + (landingBounds.x - landingBoundsFirst.x) / 2,
            y: landingBounds.y -100,
        })
        firstCellTl.to(rowMovables[0], {
            x: landingBounds.x,
            y: landingBounds.y,
        })
      
        firstCellTl.set(rowMovables[0], {zIndex: 5})
        tl.add(firstCellTl)
        tl.add(this.moveToLanding(rowMovables[1], rowLandings[0]), "<")
        tl.add(this.moveToLanding(rowMovables[2], rowLandings[1]), "<")
        tl.add(this.moveToLanding(rowMovables[3], rowLandings[2]), "<")
       
        return tl;
    }

    createAnimationMain(){
        const {
            animatableBackground,
            animatableBackgroundBar,
            page,
            pageBar,
            pageTitleMask,
            pageBody,
            grid,
            gridMovables
        } = this.pageElements
        const tl = gsap.timeline();

        const firstRowLandings = this.grid.getRow(1);
        const secondRowLandings = this.grid.getRow(2)
        const thirdRowLandings = this.grid.getRow(3)

        const firstRowMovables = gridMovables.slice(4, 8) // second row;
        const secondsRowMovables = gridMovables.slice(8, 12) // third row;
        const thirdRowMovables = gridMovables.slice(12, 16) // 4th row;

        tl.add(this.shiftRow(firstRowMovables, firstRowLandings))


        


        tl.add(this.shiftRow(secondsRowMovables, secondRowLandings))
        tl.add(this.shiftRow(this.shift(secondsRowMovables, 1), secondRowLandings))

        tl.add(this.shiftRow(thirdRowMovables, thirdRowLandings))
        tl.add(this.shiftRow(this.shift(thirdRowMovables, 1), thirdRowLandings))
        tl.add(this.shiftRow(this.shift(thirdRowMovables, 2), thirdRowLandings))
      

        return tl;
    }

    shift(array, count){
        const arrayCopy = [...array];
        return arrayCopy.concat(arrayCopy.splice(0, count)) 
    }


    

    

}

export default TestPage;