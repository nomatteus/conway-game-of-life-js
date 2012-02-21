
describe("Conway's Game of Life", function(){
  var default_params = {
      grid_width:   100,
      grid_height:  100,
      cell_width:   10,
      cell_height:  10
  },
  game = new GameOfLife(default_params);

  // Do stuff before running tests
  beforeEach(function(){
    //game.something("asdfasdf");
  });

  describe("a thing", function(){
    it("does something", function(){
      console.log(game);
      expect(2+3).toEqual(5);
    });
  });

});
