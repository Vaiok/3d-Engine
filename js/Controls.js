// Global
const cntrl = {
	moveLeft: false, moveRight: false, moveDown: false, moveUp: false, moveBackward: false, moveForward: false,
	turnDown: false, turnUp: false, turnLeft: false, turnRight: false, spinLeft: false, spinRight: false,
	prevTime: 0
};
// Event Functions
// 0
function keyDown(e) {
	if (e.key === 'a') {cntrl.moveLeft = true;}
	if (e.key === 'd') {cntrl.moveRight = true;}
	if (e.key === 'x') {cntrl.moveDown = true;}
	if (e.key === '2') {cntrl.moveUp = true;}
	if (e.key === 's') {cntrl.moveBackward = true;}
	if (e.key === 'w') {cntrl.moveForward = true;}
	if (e.key === 'f') {cntrl.turnDown = true;}
	if (e.key === 'r') {cntrl.turnUp = true;}
	if (e.key === 'q') {cntrl.turnLeft = true;}
	if (e.key === 'e') {cntrl.turnRight = true;}
	if (e.key === 'z') {cntrl.spinLeft = true;}
	if (e.key === 'c') {cntrl.spinRight = true;}
}
// 0
function keyUp(e) {
	if (e.key === 'a') {cntrl.moveLeft = false;}
	if (e.key === 'd') {cntrl.moveRight = false;}
	if (e.key === 'x') {cntrl.moveDown = false;}
	if (e.key === '2') {cntrl.moveUp = false;}
	if (e.key === 's') {cntrl.moveBackward = false;}
	if (e.key === 'w') {cntrl.moveForward = false;}
	if (e.key === 'f') {cntrl.turnDown = false;}
	if (e.key === 'r') {cntrl.turnUp = false;}
	if (e.key === 'q') {cntrl.turnLeft = false;}
	if (e.key === 'e') {cntrl.turnRight = false;}
	if (e.key === 'z') {cntrl.spinLeft = false;}
	if (e.key === 'c') {cntrl.spinRight = false;}
}


// Change for Quaternions
// Control Loop Function
// 0
function updatePos(pr, dt) {
	if (cntrl.moveLeft) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(-250*dt, 0, 0));}
	if (cntrl.moveRight) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(250*dt, 0, 0));}
	if (cntrl.moveDown) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, -250*dt, 0));}
	if (cntrl.moveUp) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 250*dt, 0));}
	if (cntrl.moveBackward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, 250*dt));}
	if (cntrl.moveForward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, -250*dt));}
	if (cntrl.turnDown) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateX(Math.PI/6*dt));}
	if (cntrl.turnUp) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateX(-Math.PI/6*dt));}
	if (cntrl.turnLeft) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateY(-Math.PI/6*dt));}
	if (cntrl.turnRight) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateY(Math.PI/6*dt));}
	if (cntrl.spinLeft) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateZ(-Math.PI/6*dt));}
	if (cntrl.spinRight) {pr.camMatrix = m4.mult(pr.camMatrix, m4.rotateZ(Math.PI/6*dt));}
}
// // Change for Quaternions
