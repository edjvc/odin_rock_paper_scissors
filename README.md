## rock-paper-scissors v 2 (developing...)

### pseudocode

### UI

page:
- [ ] header:
  - [ ] text: Round number
  - [ ] text: Round result
- [ ] footer:
  - [ ] game result
  - [ ] button: play again! (after game over)
- [ ] content-upper:
  - [ ] image: computer
  - [ ] text: computer's score
  - [ ] text: computer's choice (emoji)
  - [ ] buttons: mode switches (normal/ hell)
- [ ] content-lower:
  - [ ] image: human
  - [ ] text: human's score
  - [ ] text: human's choice (emoji)
  - [ ] buttons: options (r, p, s) (emoji)

### functions

- [x] Computer makes choice (randomly).
  - [x] Put 3 options in an array, and make random numbers from 0 to 2 to pick the option (by array index).
- [x] Human makes choice (enter in prompt)
  - [x] Allow to enter either uppercase and lowercase.
- [x] Show these information:
  - Round number
  - Human and computer's choice
  - Round result
  - Human and computer's score
  - When the game is over, show game result: SB Won The Game!
- [ ] Game rules:
  - The winner get 1 score
  - The game finishes when anyone scores 3!