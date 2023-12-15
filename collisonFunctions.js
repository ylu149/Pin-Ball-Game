let totBounceCount = 0;
let ballCount = 0;
let ballLimit = 50;

function createBall(obj1, obj2, listOfGameObj, ctx, radBall){
  let x_pos, y_pos, rad; 
  console.log(radBall);
  if(obj1.getID().toLowerCase().includes("pentagon")){
    x_pos = obj1.getX();
    y_pos = obj1.getY();
    rad = obj1.getBounds().x;
  }
  else{
    x_pos = obj2.getX();
    y_pos = obj2.getY();
    rad = obj2.getBounds().x;
  }

  do{
    let randomValue = Math.random();
    let randomSign = randomValue < 0.5 ? 1 : -1;
    let randomNumber = Math.floor(Math.random() * rad * 1.25) + rad;
    x_pos += randomSign * rad + randomSign * randomNumber;
    y_pos += randomSign * rad + randomSign * randomNumber;
  } while (x_pos < 0 || x_pos > ctx.canvas.width || y_pos < 0 || y_pos > ctx.canvas.height);
  
  const newBall = new Ball(x_pos, y_pos, "black", "orange", "newball" + ballCount, ctx, radBall);
  if (ballCount > ballLimit){
    return null;
  }
  return newBall;
}


let collisionCooldown = false;
const cooldownDuration = 500;

function testGameObjCollision(listOfGameObj, ctx, radBall) {
  if (collisionCooldown) {
    return;
  }

  let pentagonFlag = false;
  let newBall = null;

  for (let ii = 0; ii < listOfGameObj.length; ii++) {
    const rad1 = listOfGameObj[ii].getBounds().x;
    const xPos1 = listOfGameObj[ii].getX();
    const yPos1 = listOfGameObj[ii].getY();

    for (let jj = ii + 1; jj < listOfGameObj.length; jj++) {
      const rad2 = listOfGameObj[jj].getBounds().x;
      const xPos2 = listOfGameObj[jj].getX();
      const yPos2 = listOfGameObj[jj].getY();
      const distance = Math.sqrt((xPos2 - xPos1) ** 2 + (yPos2 - yPos1) ** 2);

      if (distance <= rad1 + rad2 &&
        listOfGameObj[jj].getY() < ctx.canvas.height &&
        listOfGameObj[ii].getY() < ctx.canvas.height) {

        totBounceCount += 1;
        document.getElementById("demo").innerHTML = "Total Number of Obj-Obj Collisions: " + totBounceCount;

        if (listOfGameObj[ii].setDirection(listOfGameObj[jj])) {
          ballCount -= 1;
        }

        if (listOfGameObj[jj].setDirection(listOfGameObj[ii])) {
          ballCount -= 1;
        }

        listOfGameObj[ii].IncreNumBounces();
        listOfGameObj[jj].IncreNumBounces();

        if (listOfGameObj[ii].getID().toLowerCase().includes("pentagon") ||
          listOfGameObj[jj].getID().toLowerCase().includes("pentagon")) {
          newBall = createBall(listOfGameObj[ii], listOfGameObj[jj], listOfGameObj, ctx, radBall);
          ballCount += 1;
          pentagonFlag = true;
          collisionCooldown = true;
          if (!listOfGameObj[jj].getID().toLowerCase().includes("pentagon")){
            listOfGameObj[jj].setVelocity();
          }
          else{
            listOfGameObj[ii].setVelocity();
          }
          setTimeout(() => {
            collisionCooldown = false;
          }, cooldownDuration);
        }
      }

    }
  }

  if (pentagonFlag && newBall) {
    listOfGameObj.push(newBall);
  }
}

function handlePaddleMovement(pad) {
    if (pad.isRightArrowPressed) {
      pad.On_RightArrowKeyPress();
    }
    if (pad.isLeftArrowPressed) {
      pad.On_LeftArrowKeyPress();
    }
    pad.draw();
  }

  function handlePaddleMovementVertical(pad) {
    if (pad.isUpArrowPressed) {
      pad.On_UpArrowKeyPress();
    }
    if (pad.isDownArrowPressed) {
      pad.On_DownArrowKeyPress();
    }
    pad.draw();
  }

function AnimateFrame(listOfGameObj, ctx, radBall) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const paddleIndex = listOfGameObj.findIndex(obj => obj.getID().toLowerCase().includes("bottom paddle"));
  if (paddleIndex !== -1) {
    const pad = listOfGameObj[paddleIndex];
    handlePaddleMovement(pad);
  }

  const paddleIndex2 = listOfGameObj.findIndex(obj => obj.getID().toLowerCase().includes("left paddle"));
  if (paddleIndex2 !== -1) { // Use paddleIndex2 here
    const pad2 = listOfGameObj[paddleIndex2]; // Use pad2 here
    handlePaddleMovementVertical(pad2);
  }  

  const paddleIndex3 = listOfGameObj.findIndex(obj => obj.getID().toLowerCase().includes("right paddle"));
  if (paddleIndex3 !== -1) {
    const pad3 = listOfGameObj[paddleIndex3];
    handlePaddleMovementVertical(pad3);
  }

  for (let ii = 0; ii < listOfGameObj.length; ii++) {
    if (ii !== paddleIndex) {
      const obj = listOfGameObj[ii];
      obj.draw();
      obj.update();
    }
  }
  testGameObjCollision(listOfGameObj, ctx, radBall);
  printOnPage(listOfGameObj);

  requestAnimationFrame(() => AnimateFrame(listOfGameObj, ctx, radBall));
}

function printOnPage(gameObjs){
    let tempStr = "";
    let sum = 0;
    for (let ii = 0; ii < gameObjs.length; ii++){
      tempStr += gameObjs[ii].getID() + ": " + gameObjs[ii].getNumBounces() + "<br />";
      sum += gameObjs[ii].getNumBounces();
    }
    document.getElementById("ind_count").innerHTML = tempStr;
  }