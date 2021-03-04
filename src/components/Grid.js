/*

    const grid = new Grid(id, rows, columns, (row, col) => {
        return `
            <div id={}>
            </div>
        `
    }  )
    x.appendChild(grid.getComponent())


*/



class Component{
    constructor(id){
        this.id = id;
        this.component = null;
    }

    getComponent = () => this.component

    setComponent = (domElement) => this.component = domElement;
}

/*

    new Grid("test", 4, 4, ["classlist"])
*/

class Grid extends Component {
    constructor(id, rows, cols, cellClassList=[], movables=false){
        super(id)
        this.rows = rows;
        this.cols = cols;
        this.movables = 

        this.cellClassList = cellClassList;



        this.cells = []

        this.init()
    }

    init(){
        const grid = document.createElement("div")
        grid.classList.add("rijndael-grid")
        grid.id = this.id;

        grid.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        grid.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;

        // create cells

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){

                const cell = document.createElement("div")

                cell.id = `${this.id}-cell-${row}-${col}`
                cell.classList.add(...this.cellClassList)

                this.cells.push(cell)
                    
                grid.appendChild(cell)
          
            }
        }

        for(let i = 0; i < this.rows * this.cols; i++){
            if(this.createCell){
                const cell = this.createCell()
            }
        }
       
        this.setComponent(grid)
    }



    getCells = () => {
        return this.cells;
    }

    getCellsByCols = () => {

    }

    getCell(col, row){

    }

    getRow(row){
        return this.getCells().slice(this.cols * row, this.cols*row + this.cols)
    }

    getCol(col){

    }

    createElementFromHTMLString(htmlString){
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div.firstChild; 
    }
}

export default Grid;