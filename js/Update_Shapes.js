// Change for Quaternions
// 0
function updateBoxes(partsArr, dt) {
	if (partsArr.categ === 'anchor') {
		let padp = partsArr.data.pos;
		partsArr.mat = m4.mult(partsArr.mat, m4.translate(padp.spd.x*dt*10, padp.spd.y*dt*10, padp.spd.z*dt*10));
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
// 1
function resetPartsDir(partsArr, padp, dt) {
	let tempMatrix = m4.mult(partsArr.mat, m4.translate(-padp.spd.x*dt*10, 0, 0));
	if (padp.z > tempMatrix[14]) {padp.spd.x *= -1;}
	tempMatrix = m4.mult(partsArr.mat, m4.translate(0, -padp.spd.y*dt*10, 0));
	if (padp.z > tempMatrix[14]) {padp.spd.y *= -1;}
	tempMatrix = m4.mult(partsArr.mat, m4.translate(0, 0, -padp.spd.z*dt*10));
	if (padp.z > tempMatrix[14]) {padp.spd.z *= -1;}
}
// 1
function resetPartsRot(partsArr, padr, rotFunc, ind) {
	let tempRotSpd;
	if (padr[ind] < padr.min[ind]) {
		tempRotSpd = padr.min[ind] - padr[ind];
	}
	if (padr[ind] > padr.max[ind]) {
		tempRotSpd = padr.max[ind] - padr[ind];
	}
	partsArr.mat = m4.mult(partsArr.mat, rotFunc(tempRotSpd));
	partsArr.rotMat = m4.mult(partsArr.rotMat, rotFunc(tempRotSpd));
	padr[ind] += tempRotSpd;
}
// 1
function updatePartsRot(partsArr, padr, rotFunc, ind, dt) {
	partsArr.mat = m4.mult(partsArr.mat, rotFunc(padr.spd[ind]*dt));
	partsArr.rotMat = m4.mult(partsArr.rotMat, rotFunc(padr.spd[ind]*dt));
	padr[ind] += padr.spd[ind]*dt;
}
// // Change for Quaternions
