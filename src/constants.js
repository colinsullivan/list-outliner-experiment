
export const DRAG_STATES = {
  // default
  "NONE": "NONE",

  // when there is a selection and the mouse is pressed down on it
  "STARTING_MOVE_SELECTION": "STARTING_MOVE_SELECTION",
  // when the mouse starts moving after mousedown
  "MOVE_SELECTION": "MOVE_SELECTION",

  // when mousedown on the outside canvas area
  "STARTING_NEW_SELECTION_BOX": "STARTING_NEW_SELECTION_BOX",
  // when mouse moves after starting the selection box
  "NEW_SELECTION_BOX": "NEW_SELECTION_BOX",
};
