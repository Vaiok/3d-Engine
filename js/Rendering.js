// One Time Setups
// 0
function setupShaderProgram(cnvs, gl, program) {
	//
	program.program = makeShaderProgram(gl, program.vertShader, program.fragShader);
	//
	program.uniforms = {};
	for (let unCat of program.unifStrings) {
		program.uniforms[unCat.categ] = {};
		for (let unif of unCat.strngs) {
			program.uniforms[unCat.categ][unif.strng] = {};
			program.uniforms[unCat.categ][unif.strng].bind = gl.getUniformLocation(program.program, unif.strng);
			program.uniforms[unCat.categ][unif.strng].val = unif.val;
		}
	}
	program.attributes = {};
	for (let attr of program.attrStrings) {
		program.attributes[attr.strng] = {};
		program.attributes[attr.strng].bind = gl.getAttribLocation(program.program, attr.strng);
		program.attributes[attr.strng].data = attr.data;
	}
	//
	gl.viewport(0, 0, cnvs.width, cnvs.height);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(1, 1, 1, 1);
}
// Buffers, Transformations, and Rendering
// 0
function runShaderProgram(cnvs, gl, program, objsArr) {
	//
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(program.program);
	//
	program.uniforms.mtrx4.uWorld.val = m4.invert(program.camMatrix);
	let projMatrix = m4.perspective(program.fieldOfView, cnvs.width/cnvs.height);
	program.uniforms.mtrx4.uViewProj.val = m4.multiply(projMatrix, program.uniforms.mtrx4.uWorld.val);
	program.uniforms.mtrx4.uWorldInvTrans.val = m4.transpose(program.camMatrix);
	program.uniforms.vctr3.uLightWorldPos.val = v4.clipToVec3(m4.multiplyVector(program.uniforms.mtrx4.uWorld.val, program.lightPos.concat(1)));
	program.uniforms.vctr3.uLightDir.val = m3.multiplyVector(m4.clipToMat3(program.uniforms.mtrx4.uWorld.val), program.lightDir);
	//
	for (let unif in program.uniforms.mtrx4) {gl.uniformMatrix4fv(program.uniforms.mtrx4[unif].bind, false, program.uniforms.mtrx4[unif].val);}
	for (let unif in program.uniforms.vctr3) {gl.uniform3fv(program.uniforms.vctr3[unif].bind, program.uniforms.vctr3[unif].val);}
	for (let unif in program.uniforms.flt1) {gl.uniform1f(program.uniforms.flt1[unif].bind, program.uniforms.flt1[unif].val);}
	//
	for (let partsArr of objsArr) {
		//
		program.vertCount = 0;
		buildBuffers(program, partsArr, partsArr.mat, partsArr.rotMat);
		for (let attr in program.attributes) {
			program.attributes[attr].buff = makeBuffer(gl, new Float32Array(program.attributes[attr].data));
			setVertexAttribPointer(gl, program.attributes[attr].bind, program.attributes[attr].buff, 3, gl.FLOAT, false, 0, 0);
			program.attributes[attr].data = [];
		}
		//
		let primType = gl.TRIANGLES, dOffset = 0;
		gl.drawArrays(primType, dOffset, program.vertCount);
	}
}
function buildBuffers(program, partsArr, objMat, normMat) {
	program.attributes.aPosition.data = program.attributes.aPosition.data.concat(sh3d.setBoxPoints(partsArr.data, objMat));
	program.attributes.aNormal.data = program.attributes.aNormal.data.concat(sh3d.setBoxNormals(normMat));
	program.attributes.aColor.data = program.attributes.aColor.data.concat(sh3d.setBoxColors(partsArr.data.clr));
	
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {buildBuffers(program, box, m4.multiply(objMat, box.mat), m4.multiply(normMat, box.rotMat));}}
	program.vertCount += 36;
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