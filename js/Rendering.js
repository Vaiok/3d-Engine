// One Time Setups
// 0
function setupShaderProgram(cnvs, gl, pr) {
	pr.program = makeShaderProgram(gl, pr.vertShader, pr.fragShader);
	pr.uniforms = {};
	for (let unCat of pr.unifStrings) {
		pr.uniforms[unCat.categ] = {};
		for (let unif of unCat.strngs) {
			pr.uniforms[unCat.categ][unif.strng] = {};
			pr.uniforms[unCat.categ][unif.strng].bind = gl.getUniformLocation(pr.program, unif.strng);
			pr.uniforms[unCat.categ][unif.strng].val = unif.val;
		}
	}
	pr.attributes = {};
	for (let attr of pr.attrStrings) {
		pr.attributes[attr.strng] = {};
		pr.attributes[attr.strng].bind = gl.getAttribLocation(pr.program, attr.strng);
		pr.attributes[attr.strng].data = attr.data;
	}
	gl.viewport(0, 0, cnvs.width, cnvs.height);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(1, 1, 1, 1);
}
// Buffers, Transformations, and Rendering
// 0
function runShaderProgram(cnvs, gl, pr, objsArr) {
	let prun = pr.uniforms, prat = pr.attributes;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(pr.program);
	prun.mtrx4.uWorld.val = m4.invert(pr.camMatrix);
	let projMatrix = m4.perspective(pr.fieldOfView, cnvs.width/cnvs.height);
	prun.mtrx4.uViewProj.val = m4.mult(projMatrix, prun.mtrx4.uWorld.val);
	prun.mtrx4.uWorldInvTrans.val = m4.transpose(pr.camMatrix);
	prun.vctr3.uLightWorldPos.val = v4.clipToVec3(m4.multVec(prun.mtrx4.uWorld.val, pr.lightPos.concat(1)));
	prun.vctr3.uLightDir.val = m3.multVec(m4.clipToMat3(prun.mtrx4.uWorld.val), pr.lightDir);
	for (let unif in prun.mtrx4) {gl.uniformMatrix4fv(prun.mtrx4[unif].bind, false, prun.mtrx4[unif].val);}
	for (let unif in prun.vctr3) {gl.uniform3fv(prun.vctr3[unif].bind, prun.vctr3[unif].val);}
	for (let unif in prun.flt1) {gl.uniform1f(prun.flt1[unif].bind, prun.flt1[unif].val);}
	for (let partsArr of objsArr) {
		pr.vertCount = 0;
		buildBuffers(pr, partsArr, partsArr.mat, q4.quatToRotMat(partsArr.quat));
		for (let attr in prat) {
			prat[attr].buff = makeBuffer(gl, new Float32Array(prat[attr].data));
			setVertexAttribPointer(gl, prat[attr].bind, prat[attr].buff, 3, gl.FLOAT, false, 0, 0);
			prat[attr].data = [];
		}
		let primType = gl.TRIANGLES, dOffset = 0;
		gl.drawArrays(primType, dOffset, pr.vertCount);
	}
}
function buildBuffers(pr, partsArr, objMat, normMat) {
	let prat = pr.attributes;
	prat.aPosition.data = prat.aPosition.data.concat(sh3d.setBoxPoints(partsArr.data, objMat));
	prat.aNormal.data = prat.aNormal.data.concat(sh3d.setBoxNormals(normMat));
	prat.aColor.data = prat.aColor.data.concat(sh3d.setBoxColors(partsArr.data.clr));
	if (partsArr.sat.length > 0) {
		for (let box of partsArr.sat) {
			buildBuffers(pr, box, m4.mult(objMat, box.mat), m4.mult(normMat, q4.quatToRotMat(box.quat)));
		}
	}
	pr.vertCount += 36;
}
// 1
function makeBuffer(gl, data) {
	let buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	return buffer;
}
// 1
function setVertexAttribPointer(gl, attrib, buffer, size, type, normal, stride, offset) {
	gl.enableVertexAttribArray(attrib);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(attrib, size, type, normal, stride, offset);
}
