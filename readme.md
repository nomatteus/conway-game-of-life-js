<!--Conway's Game of Life in Javascript/Canvas-->
==========================================

How to Run
----------

Create new GameOfLife object, and pass it the grid size, cell size, 
a canvas ID, and optionally an array containing the starting cells:

    var game = new GameOfLife(grid_width, grid_height, cell_width, cell_height, "life");

Here's a sample with parameters (all parameters except `canvas_id` are optional):

    // Must be same size as game dimensions 
    //  (10 x 10 in this case)
    var starting_cells = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ],
    params = {
      // Required
      canvas_id:    "life",
      // Optional
      grid_width:   100,
      grid_height:  100,
      cell_width:   10,
      cell_height:  10,
      init_cells:   starting_cells
    },
    game = new GameOfLife(params);

This will simply init a game with the defaults:

    var game = new GameOfLife({canvas_id: "life"});

Advance the game to the next step:

    game.step();

You can get an array of the current cell positions by calling getCurrentCells():

    game.getCurrentCells()

To run this as an animation, just set an interval to call game.step(). In this
example, it will update every second, but you can modify it to use any millisecond value:

    var interval = setInterval(game.step, 1000);

You can stop the animation by calling clearInterval:

    clearInterval(interval);


Tests
-----

Tests are written using the Jasmine framework, and are located in `js/spec/spec.js`.

Open `js/SpecRunner.html` in your browser to run the test suite.
