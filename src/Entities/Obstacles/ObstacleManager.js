import * as Constants from "../../Constants";
import { randomInt, calculateOpenPosition } from "../../Core/Utils";
import { Obstacle } from "./Obstacle";

const DISTANCE_BETWEEN_OBSTACLES = 50;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;

export class ObstacleManager {
  obstacles = [];

  constructor() {}

  getObstacles() {
    return this.obstacles;
  }

  drawObstacles(canvas, assetManager) {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(canvas, assetManager);
    });
  }

  placeInitialObstacles() {
    const numberObstacles = Math.ceil(
      (Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) *
        (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER)
    );

    const minX = -Constants.GAME_WIDTH / 2;
    const maxX = Constants.GAME_WIDTH / 2;
    const minY = STARTING_OBSTACLE_GAP;
    const maxY = Constants.GAME_HEIGHT / 2;

    for (let i = 0; i < numberObstacles; i++) {
      this.placeRandomObstacle(minX, maxX, minY, maxY);
    }

    this.obstacles.sort((obstacle1, obstacle2) => {
      return obstacle1.getPosition().y - obstacle2.getPosition().y;
    });
  }

  placeNewObstacle(gameWindow, previousGameWindow) {
    const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);
    // Making sure that the previousGameWindow is not null.
    // This can happen at the bigining of the game
    if (shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE || !previousGameWindow) {
      return;
    }

    if (gameWindow.left < previousGameWindow.left) {
      this.placeObstacleLeft(gameWindow);
    } else if (gameWindow.left > previousGameWindow.left) {
      this.placeObstacleRight(gameWindow);
    }

    if (gameWindow.top < previousGameWindow.top) {
      this.placeObstacleTop(gameWindow);
    } else if (gameWindow.top > previousGameWindow.top) {
      this.placeObstacleBottom(gameWindow);
    }
  }

  placeObstacleLeft(gameWindow) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.left,
      gameWindow.top,
      gameWindow.bottom
    );
  }

  placeObstacleRight(gameWindow) {
    this.placeRandomObstacle(
      gameWindow.right,
      gameWindow.right,
      gameWindow.top,
      gameWindow.bottom
    );
  }

  placeObstacleTop(gameWindow) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.right,
      gameWindow.top,
      gameWindow.top
    );
  }

  placeObstacleBottom(gameWindow) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.right,
      gameWindow.bottom,
      gameWindow.bottom
    );
  }

  placeRandomObstacle(minX, maxX, minY, maxY) {
    const position = calculateOpenPosition(
      minX,
      maxX,
      minY,
      maxY,
      this.obstacles,
      DISTANCE_BETWEEN_OBSTACLES
    );
    const newObstacle = new Obstacle(position.x, position.y);

    this.obstacles.push(newObstacle);
  }
}
