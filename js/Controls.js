// Global
const cntrl = {
	moveLeft: false, moveRight: false, moveDown: false, moveUp: false, moveBackward: false, moveForward: false,
	turnDown: false, turnUp: false, turnLeft: false, turnRight: false, spinLeft: false, spinRight: false,
	// New
	moveLeftSel: false, moveRightSel: false, moveDownSel: false, moveUpSel: false, moveBackwardSel: false, moveForwardSel: false,
	turnDownSel: false, turnUpSel: false, turnLeftSel: false, turnRightSel: false, spinLeftSel: false, spinRightSel: false,
	unitSelected: {},
	// // New
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
	// New
	if (e.key === 'j') {cntrl.moveLeftSel = true;}
	if (e.key === 'l') {cntrl.moveRightSel = true;}
	if (e.key === ',') {cntrl.moveDownSel = true;}
	if (e.key === '8') {cntrl.moveUpSel = true;}
	if (e.key === 'k') {cntrl.moveBackwardSel = true;}
	if (e.key === 'i') {cntrl.moveForwardSel = true;}
	if (e.key === 'h') {cntrl.turnDownSel = true;}
	if (e.key === 'y') {cntrl.turnUpSel = true;}
	if (e.key === 'u') {cntrl.turnLeftSel = true;}
	if (e.key === 'o') {cntrl.turnRightSel = true;}
	if (e.key === 'm') {cntrl.spinLeftSel = true;}
	if (e.key === '.') {cntrl.spinRightSel = true;}
	// // New
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
	// New
	if (e.key === 'j') {cntrl.moveLeftSel = false;}
	if (e.key === 'l') {cntrl.moveRightSel = false;}
	if (e.key === ',') {cntrl.moveDownSel = false;}
	if (e.key === '8') {cntrl.moveUpSel = false;}
	if (e.key === 'k') {cntrl.moveBackwardSel = false;}
	if (e.key === 'i') {cntrl.moveForwardSel = false;}
	if (e.key === 'h') {cntrl.turnDownSel = false;}
	if (e.key === 'y') {cntrl.turnUpSel = false;}
	if (e.key === 'u') {cntrl.turnLeftSel = false;}
	if (e.key === 'o') {cntrl.turnRightSel = false;}
	if (e.key === 'm') {cntrl.spinLeftSel = false;}
	if (e.key === '.') {cntrl.spinRightSel = false;}
	// // New
}
// Control Loop Function
// 0
function updatePos(pr, dt) {
	if (cntrl.moveLeft) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(-250*dt, 0, 0));}
	if (cntrl.moveRight) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(250*dt, 0, 0));}
	if (cntrl.moveDown) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, -250*dt, 0));}
	if (cntrl.moveUp) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 250*dt, 0));}
	if (cntrl.moveBackward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, 250*dt));}
	if (cntrl.moveForward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, -250*dt));}
	let RU = Math.PI/6*dt, rotX = 0, rotY = 0, rotZ = 0;
	if (cntrl.turnDown) {rotX += RU;}
	if (cntrl.turnUp) {rotX -= RU;}
	if (cntrl.turnLeft) {rotY -= RU;}
	if (cntrl.turnRight) {rotY += RU;}
	if (cntrl.spinLeft) {rotZ -= RU;}
	if (cntrl.spinRight) {rotZ += RU;}
	let quat = q4.eulerToQuat(rotX, rotY, rotZ);
	pr.camMatrix = m4.mult(pr.camMatrix, q4.quatToRotMat(quat));
	// New
	if (cntrl.unitSelected.data.pos.spd) {
		cntrl.unitSelected.data.pos.spd.x = 0;
		cntrl.unitSelected.data.pos.spd.y = 0;
		cntrl.unitSelected.data.pos.spd.z = 0;
		if (cntrl.moveLeftSel) {cntrl.unitSelected.data.pos.spd.x += -25;}
		if (cntrl.moveRightSel) {cntrl.unitSelected.data.pos.spd.x += 25;}
		if (cntrl.moveDownSel) {cntrl.unitSelected.data.pos.spd.y += -25;}
		if (cntrl.moveUpSel) {cntrl.unitSelected.data.pos.spd.y += 25;}
		if (cntrl.moveBackwardSel) {cntrl.unitSelected.data.pos.spd.z += 25;}
		if (cntrl.moveForwardSel) {cntrl.unitSelected.data.pos.spd.z += -25;}
	}
	if (cntrl.unitSelected.data.rot.spd) {
		cntrl.unitSelected.data.rot.spd.x = 0;
		cntrl.unitSelected.data.rot.spd.y = 0;
		cntrl.unitSelected.data.rot.spd.z = 0;
		if (cntrl.turnDownSel) {cntrl.unitSelected.data.rot.spd.x += Math.PI/20;}
		if (cntrl.turnUpSel) {cntrl.unitSelected.data.rot.spd.x += -Math.PI/20;}
		if (cntrl.turnLeftSel) {cntrl.unitSelected.data.rot.spd.y += -Math.PI/20;}
		if (cntrl.turnRightSel) {cntrl.unitSelected.data.rot.spd.y += Math.PI/20;}
		if (cntrl.spinLeftSel) {cntrl.unitSelected.data.rot.spd.z += -Math.PI/20;}
		if (cntrl.spinRightSel) {cntrl.unitSelected.data.rot.spd.z += Math.PI/20;}
	}
	// // New
}
