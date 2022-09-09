/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 let WIDTH = 7;
 let HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let i = 0; i < HEIGHT; i++){
    const row = [];
    for (let i = 0; i< WIDTH; i++){
        row.push('')
    }
    board.push(row)
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard=document.querySelector('#board')
   // TODO: add comment for this code
   let top = document.createElement("tr");//creating a table row elment
   top.setAttribute("id", "column-top");//giving the table row element an id of top
   top.addEventListener("click", handleClick);//giving the table row qith an id of top an event listener to listen for a click
 
 
   
    for (let x = 0; x < WIDTH; x++) {//repeating to fill the top row with the correct number of cells given the width
     const headCell = document.createElement("td");//creating a cell
     headCell.setAttribute("id", x);//giving the cell an id to denote it's horizontal placement in the row
     top.append(headCell);//putting the cell in the top row
   }
   htmlBoard.append(top);
   // TODO: add comment for this code
   for (let y = 0; y <HEIGHT; y++) {//repeating to fill the the table with the correct number of rows given the height
     const row = document.createElement("tr");//creating new table rom
     for (let x = 0; x < WIDTH; x++) {////repeating to fill the  row with the correct number of cells given the width
       const cell = document.createElement("td");//creating cell
       cell.setAttribute("id", `${y}-${x}`);//giving the cell an id to denote its vertical and horizontal placement in the table
       row.append(cell);//adding the cell to the row
     }
     htmlBoard.append(row);//adding the row to the table
   }
  
  
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
//    return 0
   const arr = [];
   for (let y = 0; y<HEIGHT;y++){
    if (board[y][x]==='')
    arr.push(y)
   };
   return Math.max(...arr);
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   let piece = document.createElement("div");
   piece.classList.add("piece",`p${currPlayer}`)
   let target = document.getElementById(`${y}-${x}`);
   target.append(piece)

 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg)
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
   board[y][x]=currPlayer;
   
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   const topRow = [...board[0]]
   let status = topRow.every(function(cell){
    return cell !== '' 
   })
   if(status){
    return endGame('The game ended in a tie.')
   }
   
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer===1 ? currPlayer=2 : currPlayer=1
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) {//iterating over the rows
     for (let x = 0; x < WIDTH; x++) {//iterating over the cells of the rows
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];//collecting a possible winning set of cells horizontally starting from this cell
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];//collecting a possible winning set of cells vertically starting from this cell
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];//collecting a possible winning set of cells diagonal to the right and down starting from this cell
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];//collecting a possible winning set of cells diagonal to the left and down starting from thiss cell
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;//checking if any of the possible sets starting with this cell win
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 