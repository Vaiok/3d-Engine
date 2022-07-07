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
function updatePos(program, objsArr, deltaTime) {
	//
	if (cntrl.moveLeft) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(-250*deltaTime, 0, 0));}
	if (cntrl.moveRight) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(250*deltaTime, 0, 0));}
	if (cntrl.moveDown) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(0, -250*deltaTime, 0));}
	if (cntrl.moveUp) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(0, 250*deltaTime, 0));}
	if (cntrl.moveBackward) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(0, 0, 250*deltaTime));}
	if (cntrl.moveForward) {program.camMatrix = m4.multiply(program.camMatrix, m4.translate(0, 0, -250*deltaTime));}
	if (cntrl.turnDown) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateX(-Math.PI/6*deltaTime));}
	if (cntrl.turnUp) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateX(Math.PI/6*deltaTime));}
	if (cntrl.turnLeft) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateY(-Math.PI/6*deltaTime));}
	if (cntrl.turnRight) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateY(Math.PI/6*deltaTime));}
	if (cntrl.spinLeft) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateZ(-Math.PI/6*deltaTime));}
	if (cntrl.spinRight) {program.camMatrix = m4.multiply(program.camMatrix, m4.rotateZ(Math.PI/6*deltaTime));}
	//
	for (let partsArr of objsArr) {updateBoxes(partsArr, deltaTime);}
}
// 1
function updateBoxes(partsArr, deltaTime) {	
	//
	if (partsArr.categ === 'anchor') {
		//
		partsArr.mat = m4.multiply(partsArr.mat, m4.translate(partsArr.data.pos.spd.x*deltaTime*10, partsArr.data.pos.spd.y*deltaTime*10, partsArr.data.pos.spd.z*deltaTime*10));
		partsArr.data.pos.x = partsArr.mat[12];
		partsArr.data.pos.y = partsArr.mat[13];
		partsArr.data.pos.z = partsArr.mat[14];
		//
		if (partsArr.data.pos.z > objsArray[objsArray.length-1].data.size.z/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.z > tempMatrix[14]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.z > tempMatrix[14]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.z > tempMatrix[14]) {partsArr.data.pos.spd.z *= -1;}
		}
		if (partsArr.data.pos.z < -objsArray[objsArray.length-1].data.size.z/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.z < tempMatrix[14]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.z < tempMatrix[14]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.z < tempMatrix[14]) {partsArr.data.pos.spd.z *= -1;}
		}
		if (partsArr.data.pos.x > objsArray[objsArray.length-1].data.size.x/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.x > tempMatrix[12]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.x > tempMatrix[12]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.x > tempMatrix[12]) {partsArr.data.pos.spd.z *= -1;}
		}
		if (partsArr.data.pos.x < -objsArray[objsArray.length-1].data.size.x/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.x < tempMatrix[12]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.x < tempMatrix[12]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.x < tempMatrix[12]) {partsArr.data.pos.spd.z *= -1;}
		}
		if (partsArr.data.pos.y > objsArray[objsArray.length-1].data.size.x/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.y > tempMatrix[13]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.y > tempMatrix[13]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.y > tempMatrix[13]) {partsArr.data.pos.spd.z *= -1;}
		}
		if (partsArr.data.pos.y < -objsArray[objsArray.length-1].data.size.x/2) {
			let tempMatrix = m4.multiply(partsArr.mat, m4.translate(-partsArr.data.pos.spd.x*deltaTime*10, 0, 0));
			if (partsArr.data.pos.y < tempMatrix[13]) {partsArr.data.pos.spd.x *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, -partsArr.data.pos.spd.y*deltaTime*10, 0));
			if (partsArr.data.pos.y < tempMatrix[13]) {partsArr.data.pos.spd.y *= -1;}
			tempMatrix = m4.multiply(partsArr.mat, m4.translate(0, 0, -partsArr.data.pos.spd.z*deltaTime*10));
			if (partsArr.data.pos.y < tempMatrix[13]) {partsArr.data.pos.spd.z *= -1;}
		}
	}
	//
	if (partsArr.categ === 'joint') {
		for (let {func, ind} of [{func: m4.rotateX, ind: 'x'}, {func: m4.rotateY, ind: 'y'}, {func: m4.rotateZ, ind: 'z'}]) {
			if (partsArr.data.rot[ind] < partsArr.data.rot.min[ind] || partsArr.data.rot[ind] > partsArr.data.rot.max[ind]) {
				partsArr.data.rot.spd[ind] *= -1;
				resetPartsRot(partsArr, func, ind);
			}
		}
		for (let {func, ind} of [{func: m4.rotateX, ind: 'x'}, {func: m4.rotateY, ind: 'y'}, {func: m4.rotateZ, ind: 'z'}]) {updatePartsRot(partsArr, func, ind, deltaTime);}
	}
	//
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {updateBoxes(box, deltaTime);}}
}
// 2
function resetPartsRot(partsArr, rotFunc, ind) {
	let tempRotSpd;
	if (partsArr.data.rot[ind] < partsArr.data.rot.min[ind]) {tempRotSpd = partsArr.data.rot.min[ind] - partsArr.data.rot[ind];}
	if (partsArr.data.rot[ind] > partsArr.data.rot.max[ind]) {tempRotSpd = partsArr.data.rot.max[ind] - partsArr.data.rot[ind];}
	partsArr.mat = m4.multiply(partsArr.mat, rotFunc(tempRotSpd));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, rotFunc(tempRotSpd));
	partsArr.data.rot[ind] += tempRotSpd;
}
// 2
function updatePartsRot(partsArr, rotFunc, ind, deltaTime) {
	partsArr.mat = m4.multiply(partsArr.mat, rotFunc(partsArr.data.rot.spd[ind]*deltaTime));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, rotFunc(partsArr.data.rot.spd[ind]*deltaTime));
	partsArr.data.rot[ind] += partsArr.data.rot.spd[ind]*deltaTime;
}
