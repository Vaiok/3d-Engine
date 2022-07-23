// Global
const cntrl = {
	moveLeft: false, moveRight: false, moveDown: false, moveUp: false, moveBackward: false, moveForward: false,
	turnDown: false, turnUp: false, turnLeft: false, turnRight: false, spinLeft: false, spinRight: false,
	moveLeftSel: false, moveRightSel: false, moveDownSel: false, moveUpSel: false,
	moveBackwardSel: false, moveForwardSel: false, turnDownSel: false, turnUpSel: false,
	turnLeftSel: false, turnRightSel: false, spinLeftSel: false, spinRightSel: false,
	unitSelected: {}, prevTime: 0
};
// Event Functions
// 0
function keyDown(e) {setKeysTo(e, true);}
// 0
function keyUp(e) {setKeysTo(e, false);}
// 1
function setKeysTo(e, val) {
	if (e.key === 'a') {cntrl.moveLeft = val;}
	if (e.key === 'd') {cntrl.moveRight = val;}
	if (e.key === 'x') {cntrl.moveDown = val;}
	if (e.key === '2') {cntrl.moveUp = val;}
	if (e.key === 's') {cntrl.moveBackward = val;}
	if (e.key === 'w') {cntrl.moveForward = val;}
	if (e.key === 'f') {cntrl.turnDown = val;}
	if (e.key === 'r') {cntrl.turnUp = val;}
	if (e.key === 'q') {cntrl.turnLeft = val;}
	if (e.key === 'e') {cntrl.turnRight = val;}
	if (e.key === 'z') {cntrl.spinLeft = val;}
	if (e.key === 'c') {cntrl.spinRight = val;}
	if (e.key === 'j') {cntrl.moveLeftSel = val;}
	if (e.key === 'l') {cntrl.moveRightSel = val;}
	if (e.key === ',') {cntrl.moveDownSel = val;}
	if (e.key === '8') {cntrl.moveUpSel = val;}
	if (e.key === 'k') {cntrl.moveBackwardSel = val;}
	if (e.key === 'i') {cntrl.moveForwardSel = val;}
	if (e.key === 'h') {cntrl.turnDownSel = val;}
	if (e.key === 'y') {cntrl.turnUpSel = val;}
	if (e.key === 'u') {cntrl.turnLeftSel = val;}
	if (e.key === 'o') {cntrl.turnRightSel = val;}
	if (e.key === 'm') {cntrl.spinLeftSel = val;}
	if (e.key === '.') {cntrl.spinRightSel = val;}
}
// Control Loop Function
// 0
function updatePos(pr, dt) {
	updateCamTrans(pr, dt);
	updateCamRot(pr, dt);
	updateSelTrans();
	updateSelRot();
}
// 1
function updateCamTrans(pr, dt) {
	if (cntrl.moveLeft) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(-250*dt, 0, 0));}
	if (cntrl.moveRight) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(250*dt, 0, 0));}
	if (cntrl.moveDown) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, -250*dt, 0));}
	if (cntrl.moveUp) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 250*dt, 0));}
	if (cntrl.moveBackward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, 250*dt));}
	if (cntrl.moveForward) {pr.camMatrix = m4.mult(pr.camMatrix, m4.translate(0, 0, -250*dt));}
}
// 1
function updateCamRot(pr, dt) {
	let RU = Math.PI/6*dt, rotX = 0, rotY = 0, rotZ = 0;
	if (cntrl.turnDown) {rotX += RU;}
	if (cntrl.turnUp) {rotX -= RU;}
	if (cntrl.turnLeft) {rotY -= RU;}
	if (cntrl.turnRight) {rotY += RU;}
	if (cntrl.spinLeft) {rotZ -= RU;}
	if (cntrl.spinRight) {rotZ += RU;}
	let quat = q4.eulerToQuat(rotX, rotY, rotZ);
	pr.camMatrix = m4.mult(pr.camMatrix, q4.quatToRotMat(quat));
}
// 1
function updateSelTrans() {
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
}
// 1
function updateSelRot() {
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
}
