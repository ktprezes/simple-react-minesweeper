# Simple REACT Minesweeper

## Objective

Create a naive implementation of the classic minesweeper game<br>with the javascript programming language and the react library.


## Anticipated stages

0. Create basic react application from the template provided:<br>the `npx create-react-app minesweeper` command and its magic (_status: done_).

1. Create visual react components representing all main parts<br> of the application's UI (_status: in progress_).

   _Intermediate goals_:

   1.1 Style these components with CSS (_status: done_),

   1.2 Handle (at the very basic level) user generated events<br>e.g.: 'left click' - open the cell, 'right click' - mark/unmark the cell (_status: done_).

   1.3 Present the designed UI as the [website](https://ktprezes.github.io/simple-react-minesweeper/) (_status: done_).

2. Provide the game logic (_status:  planned_)

   _e.g.:_

   2.1 Open all the empty (with 0/zero 'bombs' in the neighborhood) cells adjacent to the clicked one and their neighbors,

   2.2 Present to the user the number of 'bombs' located next to the open cells (_status: done_).

3. Provide the 'status area' logic (_status: planned_)

   _e.g.:_

   3.1 Timer,

   3.2 Marked 'bombs' counter (_status: done_),

   3.3 'New game/Reset' button.

4. Other improvements (_status: planned_).

