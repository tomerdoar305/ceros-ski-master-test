import "babel-polyfill";
import { Game } from "./Game.js";
import * as Constants from "../Constants";

const skiGame = new Game();

test("Should get up to the left side after getting crashed when pressing left", () => {
  //Crashing the Skier
  skiGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

  //Clicking the left key
  const event = new KeyboardEvent("keyup", {
    which: Constants.KEYS.LEFT,
  });
  skiGame.handleKeyDown(event);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

test("Should skier change direction while he is on the air (when jumping)", () => {
  //Clicking the down key
  const event1 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.DOWN,
  });
  skiGame.handleKeyDown(event1);

  //Clicking the left key
  const event2 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.LEFT,
  });
  skiGame.handleKeyDown(event2);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

  //Clicking the jump key
  const event3 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.JUMP,
  });
  skiGame.handleKeyDown(event3);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);

  //Clicking the down key
  const event4 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.DOWN,
  });
  skiGame.handleKeyDown(event4);

  expect(skiGame.skier.jumpDirection).not.toBe(Constants.SKIER_DIRECTIONS.DOWN);
  expect(skiGame.skier.jumpDirection).toBe(
    Constants.SKIER_DIRECTIONS.LEFT_DOWN
  );
});

test("Should skier keep moving after he being catch by rhino", () => {
  jest.setTimeout(30000);

  console.log("testttttttt");
  return skiGame.load().then(() => {
    console.log("testttttttt11111");
    // skiGame.init();
    // skiGame.run();

    // //Clicking the down key
    // const event1 = new KeyboardEvent("keyup", {
    //   which: Constants.KEYS.DOWN,
    // });
    // skiGame.handleKeyDown(event1);

    // console.log("testttttttt");

    // expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

    // skiGame.rhinoManager.placeRandomRhino(
    //   skiGame.gameWindow.left,
    //   skiGame.gameWindow.left,
    //   skiGame.gameWindow.top,
    //   skiGame.gameWindow.bottom
    // );

    // const rhinos = skiGame.rhinoManager.getRhinos();

    // expect(rhinos.length).toBe(1);

    // skiGame.rhinoManager.rhinos[0].x = skiGame.skier.x;
    // skiGame.rhinoManager.rhinos[0].y = skiGame.skier.y;

    // expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
  });
});
