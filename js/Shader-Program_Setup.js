// 0
function makeShaderProgram(gl, vsSource, fsSource) {
	const vertShader = makeShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragShader = makeShader(gl, gl.FRAGMENT_SHADER, fsSource);
	if (vertShader && fragShader) {
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertShader);
		gl.attachShader(shaderProgram, fragShader);
		gl.linkProgram(shaderProgram);
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
		{
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			gl.deleteProgram(shaderProgram);
			return null;
		}
		gl.detachShader(shaderProgram, vertShader);
		gl.detachShader(shaderProgram, fragShader);
		gl.deleteShader(vertShader);
		gl.deleteShader(fragShader);
		return shaderProgram;
	}
	else {return null;}
}
// 1
function makeShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}