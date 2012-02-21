/* Author:

*/

/*
var canvas = document.getElementById('life');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');


  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);
  
  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);



}

*/




var GameOfLife = function(params){
  // User-set params
  var num_cells_y = params["init_cells"].length,
      num_cells_x = params["init_cells"][0].length,
      cell_width  = params["cell_width"]  || 10,
      cell_height = params["cell_height"] || 10,
      init_cells  = params["init_cells"]  || [],
      canvas_id   = params["canvas_id"]   || "life",

      cell_array = [],
      display     = new GameDisplay(num_cells_x, num_cells_y, cell_width, cell_height, canvas_id),
      init        = function() {
        // Convert init_cells array of 0's and 1's to actual Cell objects
        var length_y = init_cells.length,
            length_x,
            y, x;
        // each row
        for (y = 0; y < length_y; y++) {
          length_x = init_cells[y].length;
          // each column in rows
          for (x = 0; x < length_x; x++) {
            var state = (init_cells[y][x] == 1) ? 'alive' : 'dead';
            init_cells[y][x] = new Cell(x, y, state);
          }
        }
        cell_array = init_cells;
        display.update(cell_array);
      },
      // Function to calculate the next generation of cells, based
      //  on the rules of the Game of Life
      nextGenCells = function() {
        // TODO: ACtually do the calculations!!
        // HARDCODING THIS FOR NOW, just to test animation
        
        var next_gen = cell_array;
        next_gen[0][0].setState("dead");
        next_gen[0][1].setState("alive");
        next_gen[1][0].setState("alive");
        next_gen[1][1].setState("dead");

        return next_gen;
      }
  ;
  init();
  return {
    // Returns the next generation array of cells
    step: function(){
      console.log("step!");
      var next_gen = nextGenCells();
      // Set next gen as current cell array
      cell_array = next_gen;
      console.log(next_gen);
      display.update(cell_array);
    },
    // Returns the current generation array of cells
    getCurrentGenCells: function() {
      return cell_array;
    },
    getNextGenCels: function() {
      
    }
  };
};

// This is an object that will take care of all display-related features.
// Theoretically, you should be able to use any method of display without
// too much extra code. i.e. if you want to display the game using HTML tables,
// svg, or whatever other method you feel like. Just create a new <___>Display
// Object!
var GameDisplay = function(num_cells_x, num_cells_y, cell_width, cell_height, canvas_id) {
  var canvas = document.getElementById('life'),
      ctx = canvas.getContext && canvas.getContext('2d'),
      width_pixels = num_cells_x * cell_width,
      height_pixels = num_cells_y * cell_height,
      drawGridLines = function() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
        ctx.beginPath();
        // foreach column
        for (var i = 0; i <= num_cells_x; i++) {
          ctx.moveTo(i*cell_width, 0);
          ctx.lineTo(i*cell_width, height_pixels);
        }
        // foreach row
        for (var j = 0; j <= num_cells_y; j++) {
          ctx.moveTo(0, j*cell_height);
          ctx.lineTo(width_pixels, j*cell_height);
        }
        ctx.stroke();
      },
      updateCells = function(cell_array) {
        var length_y = cell_array.length,
            length_x,
            y, x;
        // each row
        for (y = 0; y < length_y; y++) {
          length_x = cell_array[y].length;
          // each column in rows
          for (x = 0; x < length_x; x++) {
            //console.log(cell_array[y][x].getXPos());
            //console.log(cell_array[y][x].getYPos());
            //console.log(cell_array[y][x].getState());
            // Draw Cell on Canvas
            drawCell(cell_array[y][x]);
          }
        }
      },
      drawCell = function(cell) {
        // find start point (top left)
        var start_x = cell.getXPos() * cell_width,
            start_y = cell.getYPos() * cell_height;
        // draw rect from that point, to bottom right point by adding cell_height/cell_width
        if (cell.getState() == "alive") {
          console.log("it's alive!");
          ctx.fillRect(start_x, start_y, cell_width, cell_height);
        } else {
          ctx.clearRect(start_x, start_y, cell_width, cell_height);
        }
      },
      init = function() {
        //console.log("width_pixels: " + width_pixels);
        //console.log("height_pixels: " + height_pixels);

        // Resize Canvas
        canvas.width = width_pixels;
        canvas.height = height_pixels;

        drawGridLines();
      };
  init();
  return {
    update: function(cell_array) {
      updateCells(cell_array);
    }
  };


};

var Cell = function(x_pos, y_pos, state) {
  //console.log("Creating cell at " + x_pos + "," + y_pos + ", and cell state is: " + state);
  /*var x_pos = 0,        // X Position of Cell in Grid
      y_pos = 0,        // Y position of cell in Grid
      state = "dead",   // Cell state: dead or alive.
      asdf;*/
  return {
    getXPos: function() {
      return x_pos;
    },
    getYPos: function() {
      return y_pos;
    },
    getState: function() {
      return state;
    },
    setState: function(new_state) {
      state = new_state;
    }
  };
};


/*
var rules = {
  live && neighbours == 0|1  => dies   (underpopulation),
  live && neighbours == 2|3  => lives  (nextgen),
  live && neighbours == 3+   => dies   (overpopulation),
  dead && neighbours == 3    => live   (reproduction)
}
  */


var starting_cells = [

      [1,0],
      [0,1]

/*
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,1,0],
      [0,1,0,0,0],
      [0,0,0,0,0]*/

      /*[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]*/
    ],
    params = {
      // Required
      canvas_id:    "life",
      // Optional
      cell_width:   10,
      cell_height:  10,
      init_cells:   starting_cells
    },
    game = new GameOfLife(params);

setTimeout(game.step, 1000);

//var interval = setInterval(game.step, 1000);
