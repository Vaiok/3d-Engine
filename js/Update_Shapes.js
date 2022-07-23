// 0
function updateBoxes(partsArr, dt) {
	if (partsArr.categ === 'anchor') {partsArr.mat = checkOBTrans(partsArr, dt);}
	if (partsArr.categ === 'joint') {
		// New
		[partsArr.mat, partsArr.quat] = checkOBRot(partsArr, dt);
		let loopArr = [
			{ind: 'x', func: q4.quatToEuler2X}, {ind: 'y', func: q4.quatToEuler2Y}, {ind: 'z', func: q4.quatToEuler2Z}
		];
		for (let {ind, func} of loopArr) {partsArr.data.rot[ind] = func(partsArr.quat);}
		// // New
		/* Old
		let padr = {x: partsArr.data.rot.x, y: partsArr.data.rot.y, z: partsArr.data.rot.z,
			spd: {x: partsArr.data.rot.spd.x, y: partsArr.data.rot.spd.y, z: partsArr.data.rot.spd.z},
			min: {x: partsArr.data.rot.min.x, y: partsArr.data.rot.min.y, z: partsArr.data.rot.min.z},
			max: {x: partsArr.data.rot.max.x, y: partsArr.data.rot.max.y, z: partsArr.data.rot.max.z}
		};
		let loopArr = [
			{ind: 'x', func: q4.quatToEulerX}, {ind: 'y', func: q4.quatToEulerY}, {ind: 'z', func: q4.quatToEulerZ}
		];
		// Movement
		let quat = q4.eulerToQuat(padr.spd.x*dt, padr.spd.y*dt, padr.spd.z*dt);
		partsArr.mat = m4.mult(partsArr.mat, q4.quatToRotMat(quat));
		partsArr.quat = q4.mult(partsArr.quat, quat);
		for (let {ind, func} of loopArr) {padr[ind] = func(partsArr.quat);}
		*/ // Old
	}
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {updateBoxes(box, dt);}}
}
// 1
function checkOBTrans(partsArr, dt) {
	let padp = partsArr.data.pos;
	partsArr.mat = m4.mult(partsArr.mat, m4.translate(padp.spd.x*dt*10, padp.spd.y*dt*10, padp.spd.z*dt*10));
	padp.x = partsArr.mat[12], padp.y = partsArr.mat[13], padp.z = partsArr.mat[14];
	const ob = {
		x: objsArray[objsArray.length-1].data.size.x/2,
		y: objsArray[objsArray.length-1].data.size.z/2,
		z: objsArray[objsArray.length-1].data.size.z/2
	};
	if (padp.x > ob.x) {padp.x = partsArr.mat[12] = ob.x;}
	if (padp.x < -ob.x) {padp.x = partsArr.mat[12] = -ob.x;}
	if (padp.y > ob.y) {padp.y = partsArr.mat[13] = ob.y;}
	if (padp.y < -ob.y) {padp.y = partsArr.mat[13] = -ob.y;}
	if (padp.z > ob.z) {padp.z = partsArr.mat[14] = ob.z;}
	if (padp.z < -ob.z) {padp.z = partsArr.mat[14] = -ob.z;}
	return partsArr.mat;
}
// 1
function checkOBRot(partsArr, dt) {
	// Establish Temporary Copies
	let padr = {x: partsArr.data.rot.x, y: partsArr.data.rot.y, z: partsArr.data.rot.z,
		spd: {x: partsArr.data.rot.spd.x, y: partsArr.data.rot.spd.y, z: partsArr.data.rot.spd.z},
		min: {x: partsArr.data.rot.min.x, y: partsArr.data.rot.min.y, z: partsArr.data.rot.min.z},
		max: {x: partsArr.data.rot.max.x, y: partsArr.data.rot.max.y, z: partsArr.data.rot.max.z}
	};
	let loopArr = [
		{ind: 'x', func: q4.quatToEuler2X}, {ind: 'y', func: q4.quatToEuler2Y}, {ind: 'z', func: q4.quatToEuler2Z}
	];
	// Movement
	let quat = q4.eulerToQuat(padr.spd.x*dt, padr.spd.y*dt, padr.spd.z*dt);
	let nextMat = m4.mult(partsArr.mat, q4.quatToRotMat(quat));
	let nextQuat = q4.mult(partsArr.quat, quat);
	for (let {ind, func} of loopArr) {padr[ind] = func(nextQuat);}

	// Boundary Object
	// Old
	const rotObj = {
		x: padr.x > padr.max.x ? 1 : padr.x < padr.min.x ? -1 : 0,
		y: padr.y > padr.max.y ? 1 : padr.y < padr.min.y ? -1 : 0,
		z: padr.z > padr.max.z ? 1 : padr.z < padr.min.z ? -1 : 0
	};
	// // Old
	/* New
	let quatYZ = q4.mult(nextQuat, q4.eulerToQuat(-padr.x, 0, 0));
	const rotObj = {
		x: 0,
		y: quatYZ[0] < 0.5**0.5 ? 1 : 0,
		z: quatYZ[0] < 0.5**0.5 ? 1 : 0
	};
	*/ // New

	// Skip the Rest if Not Out of Bounds
	let notOB = true;
	for (let ind in rotObj) {if (rotObj[ind]) {notOB = false;}}
	if (notOB) {return [nextMat, nextQuat];}
	// Possible Solutions Object
	const axisRot = {
		xx: {q: q4.mult(partsArr.quat, q4.eulerToQuat(padr.spd.x*dt, 0, 0)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(padr.spd.x*dt, 0, 0)))
		},
		yy: {q: q4.mult(partsArr.quat, q4.eulerToQuat(0, padr.spd.y*dt, 0)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(0, padr.spd.y*dt, 0)))
		},
		zz: {q: q4.mult(partsArr.quat, q4.eulerToQuat(0, 0, padr.spd.z*dt)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(0, 0, padr.spd.z*dt)))
		},
		xy: {q: q4.mult(partsArr.quat, q4.eulerToQuat(padr.spd.x*dt, padr.spd.y*dt, 0)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(padr.spd.x*dt, padr.spd.y*dt, 0)))
		},
		yz: {q: q4.mult(partsArr.quat, q4.eulerToQuat(0, padr.spd.y*dt, padr.spd.z*dt)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(0, padr.spd.y*dt, padr.spd.z*dt)))
		},
		zx: {q: q4.mult(partsArr.quat, q4.eulerToQuat(padr.spd.x*dt, 0, padr.spd.z*dt)),
			m: m4.mult(partsArr.mat, q4.quatToRotMat(q4.eulerToQuat(padr.spd.x*dt, 0, padr.spd.z*dt)))
		}
	};
	let possSol = [];
	// Find Possible Solutions
	for (let axis in axisRot) {
		for (let {ind, func} of loopArr) {padr[ind] = func(axisRot[axis].q);}
		/* New
		quatYZ = q4.mult(axisRot[axis].q, q4.eulerToQuat(-padr.x, 0, 0));
		rotObj.x = 0;
		rotObj.y = quatYZ[0] < 0.5**0.5 ? 1 : 0;
		rotObj.z = quatYZ[0] < 0.5**0.5 ? 1 : 0;
		*/ // New
		// Old
		for (let ind in rotObj) {rotObj[ind] = padr[ind] > padr.max[ind] ? 1 : padr[ind] < padr.min[ind] ? -1 : 0;}
		// // Old
		let isIB = true;
		for (let ind in rotObj) {if (rotObj[ind]) {isIB = false;}}
		if (isIB) {possSol.unshift([axisRot[axis].m, axisRot[axis].q]);}
	}
	// Return Solutions
	if (possSol.length > 0) {return possSol[0];}
	else {return [partsArr.mat, partsArr.quat];}
}
