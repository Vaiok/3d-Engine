// 0
function updateBoxes(partsArr, dt) {
	if (partsArr.categ === 'anchor') {
		let padp = partsArr.data.pos;
		// Movement
		partsArr.mat = m4.mult(partsArr.mat, m4.translate(padp.spd.x*dt*10, padp.spd.y*dt*10, padp.spd.z*dt*10));
		padp.x = partsArr.mat[12];
		padp.y = partsArr.mat[13];
		padp.z = partsArr.mat[14];
		// Check OB
		let prevPos = {
			xRev: false, yRev: false, zRev: false,
			xx: m4.mult(partsArr.mat, m4.translate(-padp.spd.x*dt, 0, 0))[12],
			xy: m4.mult(partsArr.mat, m4.translate(0, -padp.spd.y*dt, 0))[12],
			xz: m4.mult(partsArr.mat, m4.translate(0, 0, -padp.spd.z*dt))[12],
			yx: m4.mult(partsArr.mat, m4.translate(-padp.spd.x*dt, 0, 0))[13],
			yy: m4.mult(partsArr.mat, m4.translate(0, -padp.spd.y*dt, 0))[13],
			yz: m4.mult(partsArr.mat, m4.translate(0, 0, -padp.spd.z*dt))[13],
			zx: m4.mult(partsArr.mat, m4.translate(-padp.spd.x*dt, 0, 0))[14],
			zy: m4.mult(partsArr.mat, m4.translate(0, -padp.spd.y*dt, 0))[14],
			zz: m4.mult(partsArr.mat, m4.translate(0, 0, -padp.spd.z*dt))[14]
		};
		let obx = objsArray[objsArray.length-1].data.size.x/2, oby = objsArray[objsArray.length-1].data.size.z/2;
		let obz = objsArray[objsArray.length-1].data.size.z/2, strArr = ['x','y','z'];
		if (padp.z > obz) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.z > prevPos['z' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
		if (padp.z < -obz) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.z < prevPos['z' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
		if (padp.x > obx) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.x > prevPos['x' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
		if (padp.x < -obx) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.x < prevPos['x' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
		if (padp.y > oby) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.y > prevPos['y' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
		if (padp.y < -oby) {for (let ind of strArr) {if (!prevPos[ind + 'Rev'] && padp.y < prevPos['y' + ind]) {
			padp.spd[ind] *= -1;
			prevPos[ind + 'Rev'] = true;
		}}}
	}
	if (partsArr.categ === 'joint') {
		let padr = partsArr.data.rot;
		let loopArr = [
			{ind: 'x', func: q4.quatToEulerX}, {ind: 'y', func: q4.quatToEulerY}, {ind: 'z', func: q4.quatToEulerZ}
		];
		// Movement
		let quat = q4.eulerToQuat(padr.spd.x*dt, padr.spd.y*dt, padr.spd.z*dt);
		partsArr.mat = m4.mult(partsArr.mat, q4.quatToRotMat(quat));
		partsArr.quat = q4.mult(partsArr.quat, quat);
		for (let {ind, func} of loopArr) {padr[ind] = func(partsArr.quat);}
		// Check OB
		let prevRot = {
			xRev: false, yRev: false, zRev: false,
			xx: q4.quatToEulerX(q4.mult(partsArr.quat, q4.eulerToQuat(-padr.spd.x*dt, 0, 0))),
			xy: q4.quatToEulerX(q4.mult(partsArr.quat, q4.eulerToQuat(0, -padr.spd.y*dt, 0))),
			xz: q4.quatToEulerX(q4.mult(partsArr.quat, q4.eulerToQuat(0, 0, -padr.spd.z*dt))),
			yx: q4.quatToEulerY(q4.mult(partsArr.quat, q4.eulerToQuat(-padr.spd.x*dt, 0, 0))),
			yy: q4.quatToEulerY(q4.mult(partsArr.quat, q4.eulerToQuat(0, -padr.spd.y*dt, 0))),
			yz: q4.quatToEulerY(q4.mult(partsArr.quat, q4.eulerToQuat(0, 0, -padr.spd.z*dt))),
			zx: q4.quatToEulerZ(q4.mult(partsArr.quat, q4.eulerToQuat(-padr.spd.x*dt, 0, 0))),
			zy: q4.quatToEulerZ(q4.mult(partsArr.quat, q4.eulerToQuat(0, -padr.spd.y*dt, 0))),
			zz: q4.quatToEulerZ(q4.mult(partsArr.quat, q4.eulerToQuat(0, 0, -padr.spd.z*dt)))
		};
		if (padr.y > padr.max.y) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.y > prevRot['y' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
		if (padr.y < padr.min.y) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.y < prevRot['y' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
		if (padr.x > padr.max.x) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.x > prevRot['x' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
		if (padr.x < padr.min.x) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.x < prevRot['x' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
		if (padr.z > padr.max.z) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.z > prevRot['z' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
		if (padr.z < padr.min.z) {for (let {ind} of loopArr) {if (!prevRot[ind + 'Rev'] && padr.z < prevRot['z' + ind]) {
			padr.spd[ind] *= -1;
			prevRot[ind + 'Rev'] = true;
		}}}
	}
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {updateBoxes(box, dt);}}
}
