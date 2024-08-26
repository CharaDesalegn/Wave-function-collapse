const canvas = document.getElementById("canvas")
const img_width = 10
const canvas_width = 500


canvas.width = canvas_width
canvas.height = canvas_width
// canvas.style.background = "red"
const context = canvas.getContext("2d")
let pos = [
    [[], [0, 2, 3, 6, 8, 9], [], [0, 4, 5, 6, 7, 8]],
    [[1, 2, 5, 7, 8, 9], [], [1, 3, 4, 6, 7, 9], []],
    [[], [], [1, 3, 4, 6, 7, 9], [0, 4, 5, 6, 7, 8]],
    [[1, 2, 5, 7, 8, 9], [], [], [0, 4, 5, 6, 7, 8]],
    [[1, 2, 5, 7, 8, 9], [0, 2, 3, 6, 8, 9], [], []],
    [[], [0, 2, 3, 6, 8, 9], [1, 3, 4, 6, 7, 9], []],
    [[1, 2, 5, 7, 8, 9], [0, 2, 3, 6, 8, 9], [], [0, 4, 5, 6, 7, 8]],
    [[1, 2, 5, 7, 8, 9], [0, 2, 3, 6, 8, 9], [1, 3, 4, 6, 7, 9], []],
    [[], [0, 2, 3, 6, 8, 9], [1, 3, 4, 6, 7, 9], [0, 4, 5, 6, 7, 8]],
    [[1, 2, 5, 7, 8, 9], [], [1, 3, 4, 6, 7, 9], [0, 4, 5, 6, 7, 8]]
]



let grid = generate2DArray(canvas_width/img_width)
grid[canvas_width/img_width/2][canvas_width/img_width/2].push(rand(10)) 
const img1 = new Image()
const img2 = new Image()
const img3 = new Image()
const img4 = new Image()
const img5 = new Image()
const img6 = new Image()
const img7 = new Image()
const img8 = new Image()
const img9 = new Image()
const img10 = new Image()

img1.src = "horizontal.png"
img2.src = "vertical.png"
img3.src = "1.png"
img4.src = "2.png"
img5.src = "3.png"
img6.src = "4.png"
img7.src = "5.png"
img8.src = "6.png"
img9.src = "7.png"
img10.src = "8.png"
const imgs = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10]
let collapsed = []
function generate2DArray(rows) {
    const result = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
            const element = []
            row.push(element)
        }
        result.push(row);
    }
    return result;
}
function draw(i,x,y){
    context.drawImage(i,x*img_width,y*img_width,img_width,img_width)
}
function rand(size){
    return Math.floor(Math.random()*size)
}
function find_small_pos(){
    let small = 11
    for(let i = 0;i < canvas_width/img_width;i++){
        for(let j = 0;j < canvas_width/img_width;j++){
            if (grid[i][j].length >= 1 && !collapsed.includes(`${i}${j}`)){
                small = Math.min(small,grid[i][j].length)
            }
            // console.log(grid[i][j].length)

        }
    }
    if (small == 11){
        return 0
    }
    return small
}
function deleteElements(arr1, arr2) {
    arr2.forEach(element => {
        if (!arr1.includes(element)) {
            arr1.push(element);
        }
    });
    return arr1;
}

function reset(){
    context.clearRect(0,0,canvas_width,canvas_width)
    grid = generate2DArray(canvas_width/img_width)
    // setInterval(fill,50)

}
function fill(i,x,y){
    for(let i = 0;i < canvas_width/img_width;i++){
        for(let j = 0;j < canvas_width/img_width;j++){
            if (grid[i][j].length == 1){
                filter_grid(i,j)

            }
        }
    }
    let s = find_small_pos()
    for(let i = 0;i < canvas_width/img_width;i++){
        for(let j = 0;j < canvas_width/img_width;j++){
            if (grid[i][j].length == s){
                let indx = grid[i][j][rand(grid[i][j].length)]
                collapsed.push(`${i}${j}`);
                draw(imgs[indx],i,j);
                grid[i][j] = [indx];
                return
            }
        }
    }

}


function filter_grid(x,y){
    // console.log(grid[x][y])
    
    

    if (grid[x+1] && !collapsed.includes(`${x+1}${y}`)){
        grid[x+1][y] = deleteElements(grid[x+1][y],pos[grid[x][y][0]][1])
    }
    if (grid[x-1] && !collapsed.includes(`${x-1}${y}`)){
        grid[x-1][y] = deleteElements(grid[x-1][y],pos[grid[x][y][0]][3])
    }
    if (grid[x] && grid[x][y+1]&& !collapsed.includes(`${x}${y+1}`)){
        grid[x][y+1] = deleteElements(grid[x][y+1],pos[grid[x][y][0]][2])
    }
    if (grid[x] && grid[x][y-1]&& !collapsed.includes(`${x}${y-1}`)){
        grid[x][y-1] = deleteElements(grid[x][y-1],pos[grid[x][y][0]][0])
    }
   

    // draw(img2,3,20)
}
console.log(deleteElements([2,2],[]))
const b = [[3,[[]]]]
console.log(b[0][1].length)
console.log("aaaaaaaaaa",canvas)
setInterval(fill,50)