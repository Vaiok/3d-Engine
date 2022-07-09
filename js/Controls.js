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
// Control Loop Function
// 0
function updatePos(pr, objsArr, dt) {
	let prcm = pr.camMatrix;
	if (cntrl.moveLeft) {prcm = m4.multiply(prcm, m4.translate(-250*dt, 0, 0));}
	if (cntrl.moveRight) {prcm = m4.multiply(prcm, m4.translate(250*dt, 0, 0));}
	if (cntrl.moveDown) {prcm = m4.multiply(prcm, m4.translate(0, -250*dt, 0));}
	if (cntrl.moveUp) {prcm = m4.multiply(prcm, m4.translate(0, 250*dt, 0));}
	if (cntrl.moveBackward) {prcm = m4.multiply(prcm, m4.translate(0, 0, 250*dt));}
	if (cntrl.moveForward) {prcm = m4.multiply(prcm, m4.translate(0, 0, -250*dt));}
	if (cntrl.turnDown) {prcm = m4.multiply(prcm, m4.rotateX(-Math.PI/6*dt));}
	if (cntrl.turnUp) {prcm = m4.multiply(prcm, m4.rotateX(Math.PI/6*dt));}
	if (cntrl.turnLeft) {prcm = m4.multiply(prcm, m4.rotateY(-Math.PI/6*dt));}
	if (cntrl.turnRight) {prcm = m4.multiply(prcm, m4.rotateY(Math.PI/6*dt));}
	if (cntrl.spinLeft) {prcm = m4.multiply(prcm, m4.rotateZ(-Math.PI/6*dt));}
	if (cntrl.spinRight) {prcm = m4.multiply(prcm, m4.rotateZ(Math.PI/6*dt));}
	for (let partsArr of objsArr) {updateBoxes(partsArr, dt);}
}
// 1
function updateBoxes(partsArr, dt) {
	if (partsArr.categ === 'anchor') {
		let padp = partsArr.data.pos;
		partsArr.mat = m4.multiply(partsArr.mat, m4.translate(padp.spd.x*dt*10, padp.spd.y*dt*10, padp.spd.z*dt*10));
		padp.x = partsArr.mat[12];
		padp.y = partsArr.mat[13];
		padp.z = partsArr.mat[14];
		if (padp.z > objsArray[objsArray.length-1].data.size.z/2) {resetPartsDir(partsArr, padp, dt);}
		if (padp.z < -objsArray[objsArray.length-1].data.size.z/2) {resetPartsDir(partsArr, padp, dt);}
		if (padp.x > objsArray[objsArray.length-1].data.size.x/2) {resetPartsDir(partsArr, padp, dt);}
		if (padp.x < -objsArray[objsArray.length-1].data.size.x/2) {resetPartsDir(partsArr, padp, dt);}
		if (padp.y > objsArray[objsArray.length-1].data.size.x/2) {resetPartsDir(partsArr, padp, dt);}
		if (padp.y < -objsArray[objsArray.length-1].data.size.x/2) {resetPartsDir(partsArr, padp, dt);}
	}
	if (partsArr.categ === 'joint') {
		let loopArr = [{func: m4.rotateX, ind: 'x'}, {func: m4.rotateY, ind: 'y'}, {func: m4.rotateZ, ind: 'z'}];
		let padr = partsArr.data.rot;
		for (let {func, ind} of loopArr) {
			if (padr[ind] < padr.min[ind] || padr[ind] > padr.max[ind]) {
				padr.spd[ind] *= -1;
				resetPartsRot(partsArr, padr, func, ind);
			}
		}
		for (let {func, ind} of loopArr) {updatePartsRot(partsArr, padr, func, ind, dt);}
	}
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {updateBoxes(box, dt);}}
}
// 2
function resetPartsDir(partsArr, padp, dt) {
	let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-padp.spd.x*dt*10, 0, 0));
	if (padp.z > tempMatrix[14]) {padp.spd.x *= -1;}
	tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -padp.spd.y*dt*10, 0));
	if (padp.z > tempMatrix[14]) {padp.spd.y *= -1;}
	tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -padp.spd.z*dt*10));
	if (padp.z > tempMatrix[14]) {padp.spd.z *= -1;}
}
// 2
function resetPartsRot(partsArr, padr, rotFunc, ind) {
	let tempRotSpd;
	if (padr[ind] < padr.min[ind]) {
		tempRotSpd = padr.min[ind] - padr[ind];
	}
	if (padr[ind] > padr.max[ind]) {
		tempRotSpd = padr.max[ind] - padr[ind];
	}
	partsArr.mat = m4.multiply(partsArr.mat, rotFunc(tempRotSpd));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, rotFunc(tempRotSpd));
	padr[ind] += tempRotSpd;
}
// 2
function updatePartsRot(partsArr, padr, rotFunc, ind, dt) {
	partsArr.mat = m4.multiply(partsArr.mat, rotFunc(padr.spd[ind]*dt));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, rotFunc(padr.spd[ind]*dt));
	padr[ind] += padr.spd[ind]*dt;
}
