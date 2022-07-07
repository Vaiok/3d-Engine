// Setup Shaders
setupShaderProgram(canvas, webGL, prog1);
// Build Entities
for (let i = 0; i < entityCount; i++) {objsArray[i] = buildEntity(-100, BU*7, -BU*30, 0, 0, 0, 0, Math.PI, 0);}
objsArray = objsArray.concat(buildGround(0, -BU*20, 0, 0, 0, 0, 0, 0, 0));
// Event Listeners
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
// Game Loop
requestAnimationFrame(runProgram);
// 0
function runProgram(currTime) {
	//
	requestAnimationFrame(runProgram);
	//
	currTime *= 0.001;
	let deltaTime = currTime - cntrl.prevTime;
	cntrl.prevTime = currTime;
	//
	updatePos(prog1, objsArray, deltaTime);
	runShaderProgram(canvas, webGL, prog1, objsArray);
}
