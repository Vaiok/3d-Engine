// Setup Shaders
setupShaderProgram(canvas, webGL, prog1);
// Build Entities
for (let i = 0; i < entityCount; i++) {objsArray[i] = buildEntity(0, BU*7, -BU*5, 0, 0, 0, 0, Math.PI/7, 0);}
objsArray = objsArray.concat(buildGround(0, -BU*20, 0, 0, 0, 0, 0, 0, 0));
// Selected Object for Controlling
cntrl.unitSelected = objsArray[0].sat[1].sat[0].sat[0];
// Event Listeners
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
// Game Loop
requestAnimationFrame(runProgram);
// 0
function runProgram(currTime) {
	requestAnimationFrame(runProgram);
	let deltaTime = getDeltaTime(currTime);
	updatePos(prog1, deltaTime);
	for (let partsArr of objsArray) {updateBoxes(partsArr, deltaTime);}
	runShaderProgram(canvas, webGL, prog1, objsArray);
}
// 1
function getDeltaTime(currTime) {
	currTime *= 0.001;
	let deltaTime = currTime - cntrl.prevTime;
	cntrl.prevTime = currTime;
	return deltaTime;
}
