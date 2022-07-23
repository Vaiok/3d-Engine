const prog1 = {
	vertShader: `
		uniform mat4 uWorld;
		uniform mat4 uViewProj;
		uniform mat4 uWorldInvTrans;
		uniform vec3 uLightWorldPos;
		uniform vec3 uViewWorldPos;
		attribute vec4 aPosition;
		attribute vec3 aNormal;
		attribute vec3 aColor;
		varying vec4 vColor;
		varying vec3 vSurfToView;
		varying vec3 vSurfToLight;
		varying vec3 vNormal;
		void main() {
			gl_Position = uViewProj * aPosition;
			vNormal = mat3(uWorldInvTrans) * aNormal;
			vec3 surfWorldPos = (uWorld * aPosition).xyz;
			vSurfToLight = uLightWorldPos - surfWorldPos;
			vSurfToView = uViewWorldPos - surfWorldPos;
			vColor = vec4(aColor, 1);
		}
	`,
	fragShader: `
		precision mediump float;
		uniform vec3 uLightColor;
		uniform vec3 uLightDir;
		uniform float uLightRad;
		uniform float uShine;
		varying vec3 vSurfToView;
		varying vec3 vSurfToLight;
		varying vec3 vNormal;
		varying vec4 vColor;
		void main() {
			vec3 normal = normalize(vNormal);
			vec3 surfToLightDir = normalize(vSurfToLight);
			vec3 surfToViewDir = normalize(vSurfToView);
			vec3 halfVector = normalize(surfToLightDir + surfToViewDir);
			float dotFromDir = dot(surfToLightDir, -uLightDir);
			float inLight = step(uLightRad, dotFromDir);
			float light = inLight * dot(normal, surfToLightDir);
			float specular = inLight * pow(dot(normal, halfVector), uShine);
			gl_FragColor = vColor;
			gl_FragColor.rgb *= light * uLightColor;
			gl_FragColor.rgb += specular * uLightColor;
		}
	`,
	camMatrix: m4.lookAt([0, 50, 500], [0, 50, 0]), fieldOfView: Math.PI/180 * 72,
	lightPos: [0, 100, 0], lightDir: [0, -1, 0],
	vertCount: 0,
	unifStrings: [{categ: 'mtrx4', strngs: [{strng: 'uWorld', val: m4.identity()},
																					{strng: 'uViewProj', val: m4.identity()},
																					{strng: 'uWorldInvTrans', val: m4.identity()}]},
								{categ: 'vctr3', strngs: [{strng: 'uViewWorldPos', val: [0, 0, 0]},
																					{strng: 'uLightWorldPos', val: [0, 0, 0]},
																					{strng: 'uLightColor', val: [1, 1, 1]},
																					{strng: 'uLightDir', val: [0, 1, 0]}]},
								{categ: 'flt1', strngs: [{strng: 'uLightRad', val: Math.cos(Math.PI/2)},
																					{strng: 'uShine', val: 125.0}]}],
	attrStrings: [{strng: 'aPosition', data: []},
								{strng: 'aNormal', data: []},
								{strng: 'aColor', data: []}],
};
