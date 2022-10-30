import {
  appCanvas,
  appColors,
  appContext,
  appFrameTime,
  appSqrtTwo,
} from "./appcontants";
import { drawTabela, randomSpawnPointer, signedRandom } from "./apphelpers";

import Enemy from "./Enemy";
import GameObjectColor from "./GameObjectColor";
import Particle from "./Particle";
import Player from "./Player";
import Projectile from "./Projectile";
import Stats from "stats.js";
import Vector2 from "./Vector2";
import gsap from "gsap";

document.body.prepend(appCanvas);

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

appCanvas.width = innerWidth;
appCanvas.height = innerHeight;

const player = new Player(
  new Vector2(appCanvas.width / 2, appCanvas.height / 2),
  30,
  appColors.white
);

let projectiles: Array<Projectile> = [];
let enemies: Array<Enemy> = [];
let particles: Array<Particle> = [];

function spawnEnemies() {
  setInterval(() => {
    const enemyRadius = 15 + Math.random() * 30;
    const enemyPos = randomSpawnPointer(enemyRadius);
    const enemyVelocity: Vector2 = player.pos
      .clone()
      .subtract(enemyPos)
      .setLength(appSqrtTwo);

    enemies.push(
      new Enemy(
        enemyPos,
        enemyRadius,
        new GameObjectColor(
          55 + Math.random() * 200,
          Math.random() * 255,
          Math.random() * 255,
          1
        ),
        enemyVelocity
      )
    );
  }, 100);
}

let lastRenderTime = 0;
let animationId: number = 0;
let score: number = 0;
function animate(time?: number) {
  animationId = requestAnimationFrame(animate);

  if (time && time - lastRenderTime > appFrameTime) {
    stats.begin();

    lastRenderTime = time;
    appContext.fillStyle = "rgba(0,0,0,0.2)";
    appContext.fillRect(0, 0, appCanvas.width, appCanvas.height);
    player.draw();
    const shouldBeRemoved: Record<"projectiles" | "enemies", Array<number>> = {
      projectiles: [],
      enemies: [],
    };

    projectiles.forEach((item, index) => {
      item.update();
      if (
        item.pos.x + item.radius < 0 ||
        item.pos.x - item.radius > appCanvas.width ||
        item.pos.y + item.radius < 0 ||
        item.pos.y - item.radius > appCanvas.height
      ) {
        shouldBeRemoved.projectiles.push(index);
      }
    });
    enemies.forEach((enemy, index) => {
      enemy.update();

      const distWithPlayer = enemy.pos.distance(player.pos);

      if (distWithPlayer - enemy.radius - player.radius < 0) {
        cancelAnimationFrame(animationId);
      }

      projectiles.forEach((projectile, pIndex) => {
        const dist = enemy.pos.distance(projectile.pos);
        if (dist - enemy.radius - projectile.radius < 0) {
          const particleCount = 4 + Math.random() * 5;
          for (let i = 0; i < particleCount; i++) {
            particles.push(
              new Particle(
                projectile.pos.clone(),
                2 + Math.random() * 3,
                enemy.color.clone(),
                new Vector2(signedRandom(), signedRandom()).setLength(5)
              )
            );
          }
          shouldBeRemoved.enemies.push(index);
          shouldBeRemoved.projectiles.push(pIndex);
        }
      });
    });
    drawTabela(score);

    particles.forEach((item) => {
      item.update();
    });
    particles = particles.filter((item) => {
      return item.color.getValues().a > 0;
    });
    enemies = enemies.map((item, index) => {
      if (shouldBeRemoved.enemies.indexOf(index) > -1) {
        console.log(item);

        gsap.to(item, {
          radius: item.radius - 10,
          duration: 0.2,
        });
        score += 20;
      }
      return item;
    });
    enemies = enemies.filter((item, index) => {
      if (item.radius > 14) {
        return true;
      }
      score += Math.floor(item.radius);
      return false;
    });
    projectiles = projectiles.filter(
      (item, index) => shouldBeRemoved.projectiles.indexOf(index) === -1
    );
    stats.end();
  }
}

window.addEventListener("mousemove", (e) => {
  const eventVector = new Vector2(e.clientX, e.clientY);
  eventVector.subtract(player.pos).setLength(10);

  projectiles.push(
    new Projectile(new Vector2(player.pos), 6, appColors.white, eventVector)
  );
});

animate();
spawnEnemies();
