## rock-paper-scissors v 2 (developing...)

### pseudocode

### UI

page:
- [x] header:
  - [x] text: Round number
- [x] upper-content:
  - [x] image: computer
  - [x] text: computer's score
  - [x] text: computer's choice (emoji)
- [x] lower-content:
  - [x] image: human
  - [x] text: human's score
  - [x] text: human's choice (emoji)
- [x] footer:
  - [x] buttons: options (r, p, s) (emoji)
  - [x] game result
  - [x] buttons: mode switches (normal/ hell)

### functions

- [x] Select mode to start the game (normal/ hell).
  - The game can be restart at anytime when click mode button.
  
- [x] Normal mode:
  - [x] Human makes choice: click the option buttons.
  - [x] Computer makes choice (randomly).
    - [x] Put 3 options in an array, and make random numbers from 0 to 2 to pick the option (by array index).

- [x] Hell mode:
  - [x] Human makes choice: click the option buttons.
  - [x] Computer makes choice depend on human's choice for making sure computer wins every round.
  
- [x] Show choices from both sides.
- [x] Get round result and update information (scores, round number) from both sides.
- [x] Game finishes when anyone reaches score 3!
  - [x] Show game result.

- [x] Game rules:
  - The winner get 1 score
  - The game finishes when anyone scores 3!
