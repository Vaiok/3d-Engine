let v3 = {
	copy: function(vec) {return [vec[0], vec[1], vec[2]];},
	subtract: function(a, b) {return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];},
	cross: function(a, b) {
		return [
			a[1]*b[2] - a[2]*b[1],
			a[2]*b[0] - a[0]*b[2],
			a[0]*b[1] - a[1]*b[0]
		];
	},
	findAngle: function(a, b) {
		return Math.acos((a.x*b.x + a.y*b.y + a.z*b.z) /
										(Math.sqrt(a.x**2 + a.y**2 + a.z**2) * Math.sqrt(b.x**2 + b.y**2 + b.z**2)));
	},
	findSepAngles: function(a, b) {
		let angX = Math.acos((a.y*b.y + a.z*b.z) / (Math.sqrt(a.y**2 + a.z**2) * Math.sqrt(b.y**2 + b.z**2)));
		let angY = Math.acos((a.x*b.x + a.z*b.z) / (Math.sqrt(a.x**2 + a.z**2) * Math.sqrt(b.x**2 + b.z**2)));
		let angZ = Math.acos((a.x*b.x + a.y*b.y) / (Math.sqrt(a.x**2 + a.y**2) * Math.sqrt(b.x**2 + b.y**2)));
		return {angX: angX, angY: angY, angZ: angZ};
	},
	normalize: function(v) {
		let length = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
		if (length === 0) {return [0, 0, 0];}
		else {return [v[0]/length, v[1]/length, v[2]/length];}
	}
};
let v4 = {
	copy: function(vec) {return [vec[0], vec[1], vec[2], vec[3]];},
	clipToVec3: function(vector) {
		return [vector[0], vector[1], vector[2]];
	}
};
let m3 = {
	identity: function() {
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];
	},
	copy: function(mat) {
		return [
			mat[0], mat[1], mat[2],
			mat[3], mat[4], mat[5],
			mat[6], mat[7], mat[8]
		];
	},
	multVec: function (a, b) {
		return [
			b[0]*a[0] + b[1]*a[3] + b[2]*a[6],
			b[0]*a[1] + b[1]*a[4] + b[2]*a[7],
			b[0]*a[2] + b[1]*a[5] + b[2]*a[8],
		];
	},
	mult: function(a, b) {
		return [
			b[0]*a[0] + b[1]*a[3] + b[2]*a[6],
			b[0]*a[1] + b[1]*a[4] + b[2]*a[7],
			b[0]*a[2] + b[1]*a[5] + b[2]*a[8],
			b[3]*a[0] + b[4]*a[3] + b[5]*a[6],
			b[3]*a[1] + b[4]*a[4] + b[5]*a[7],
			b[3]*a[2] + b[3]*a[5] + b[5]*a[8],
			b[6]*a[0] + b[7]*a[3] + b[8]*a[6],
			b[6]*a[1] + b[7]*a[4] + b[8]*a[7],
			b[6]*a[2] + b[7]*a[5] + b[8]*a[8]
		];
	},
	translate: function(tx, ty) {
		return [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1
		];
	},
	rotate: function(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);
		return [
			c,-s, 0,
			s, c, 0,
			0, 0, 1
		];
	},
	scale: function(sx, sy) {
		return [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1
		];
	},
	projection: function(width, height) {
		return [
			2/width, 0, 0,
			0, -2/height, 0,
			-1, 1, 1
		];
	}
};
let m4 = {
	identity: function() {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	},
	copy: function(mat) {
		return [
			mat[0], mat[1], mat[2], mat[3],
			mat[4], mat[5], mat[6], mat[7],
			mat[8], mat[9], mat[10], mat[11],
			mat[12], mat[13], mat[14], mat[15]
		];
	},
	multVec: function (a, b) {
		return [
			b[0]*a[0] + b[1]*a[4] + b[2]*a[8] + b[3]*a[12],
			b[0]*a[1] + b[1]*a[5] + b[2]*a[9] + b[3]*a[13],
			b[0]*a[2] + b[1]*a[6] + b[2]*a[10] + b[3]*a[14],
			b[0]*a[3] + b[1]*a[7] + b[2]*a[11] + b[3]*a[15]
		];
	},
	mult: function(a, b) {
		return [
			b[0]*a[0] + b[1]*a[4] + b[2]*a[8] + b[3]*a[12],
			b[0]*a[1] + b[1]*a[5] + b[2]*a[9] + b[3]*a[13],
			b[0]*a[2] + b[1]*a[6] + b[2]*a[10] + b[3]*a[14],
			b[0]*a[3] + b[1]*a[7] + b[2]*a[11] + b[3]*a[15],
			b[4]*a[0] + b[5]*a[4] + b[6]*a[8] + b[7]*a[12],
			b[4]*a[1] + b[5]*a[5] + b[6]*a[9] + b[7]*a[13],
			b[4]*a[2] + b[5]*a[6] + b[6]*a[10] + b[7]*a[14],
			b[4]*a[3] + b[5]*a[7] + b[6]*a[11] + b[7]*a[15],
			b[8]*a[0] + b[9]*a[4] + b[10]*a[8] + b[11]*a[12],
			b[8]*a[1] + b[9]*a[5] + b[10]*a[9] + b[11]*a[13],
			b[8]*a[2] + b[9]*a[6] + b[10]*a[10] + b[11]*a[14],
			b[8]*a[3] + b[9]*a[7] + b[10]*a[11] + b[11]*a[15],
			b[12]*a[0] + b[13]*a[4] + b[14]*a[8] + b[15]*a[12],
			b[12]*a[1] + b[13]*a[5] + b[14]*a[9] + b[15]*a[13],
			b[12]*a[2] + b[13]*a[6] + b[14]*a[10] + b[15]*a[14],
			b[12]*a[3] + b[13]*a[7] + b[14]*a[11] + b[15]*a[15]
		];
	},
	translate: function(tx, ty, tz) {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			tx, ty, tz, 1
		];
	},
	rotateX: function(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);
		return [
			1, 0, 0, 0,
			0, c, -s, 0,
			0, s, c, 0,
			0, 0, 0, 1
		];
	},
	rotateY: function(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);
		return [
			c, 0, s, 0,
			0, 1, 0, 0,
			-s, 0, c, 0,
			0, 0, 0, 1
		];
	},
	rotateZ: function(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);
		return [
			c,-s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	},
	scale: function(sx, sy, sz) {
		return [
			sx, 0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0, 1
		];
	},
	invert: function(matrix) {
		let result = [];
		let n11 = matrix[0], n12 = matrix[4], n13 = matrix[8], n14 = matrix[12];
		let n21 = matrix[1], n22 = matrix[5], n23 = matrix[9], n24 = matrix[13];
		let n31 = matrix[2], n32 = matrix[6], n33 = matrix[10], n34 = matrix[14];
		let n41 = matrix[3], n42 = matrix[7], n43 = matrix[11], n44 = matrix[15];
		result[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
		result[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
		result[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
		result[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
		result[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
		result[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
		result[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
		result[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
		result[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
		result[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
		result[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
		result[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
		result[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
		result[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
		result[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
		result[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;
		let determinant = n11*result[0] + n21*result[4] + n31*result[8] + n41*result[12];
		if (determinant === 0) {
			if (Math.sign(determinant) === -0) {determinant = -0.00001;}
			else {determinant = 0.00001;}
		}
		for (let i = 0; i < result.length; i++) {result[i] /= determinant;}
		return result;
	},
	transpose: function(matrix) {
		return [
			matrix[0], matrix[4], matrix[8], matrix[12],
			matrix[1], matrix[5], matrix[9], matrix[13],
			matrix[2], matrix[6], matrix[10], matrix[14],
			matrix[3], matrix[7], matrix[11], matrix[15]
		];
	},
	clipToMat3: function(matrix) {
		return [
			matrix[0], matrix[1], matrix[2],
			matrix[4], matrix[5], matrix[6],
			matrix[8], matrix[9], matrix[10]
		];
	},
	orthographic: function(left, right, bottom, top, near, far) {
		return [
			2/(right-left), 0, 0, 0,
			0, 2/(top-bottom), 0, 0,
			0, 0, 2/(near-far), 0,
			(left+right)/(left-right), (bottom+top)/(bottom-top), (near+far)/(near-far), 1
		];
	},
	perspective: function(fov, aspect) {
		let f = 1.0 / Math.tan(fov / 2);
		return [
			f/aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, -1, -1,
			0, 0, -1, 0
		];
	},
	lookAt: function(cam, targ) {
		let z = v3.normalize(v3.subtract(cam, targ));
		let x = v3.normalize(v3.cross([0, 1, 0], z));
		let y = v3.normalize(v3.cross(z, x));
		return [
			x[0], x[1], x[2], 0,
			y[0], y[1], y[2], 0,
			z[0], z[1], z[2], 0,
			cam[0], cam[1], cam[2], 1
		];
	}
};
let q4 = {
	identity: function() {return [1, 0, 0, 0];},
	copy: function(quat) {return [quat[0], quat[1], quat[2], quat[3]];},
	invert: function(quat) {return [quat[0], -quat[1], -quat[2], -quat[3]];},
	mult: function(a, b) {
		return [
			a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3],
			a[0]*b[1] + a[1]*b[0] - a[2]*b[3] + a[3]*b[2],
			a[0]*b[2] + a[1]*b[3] + a[2]*b[0] - a[3]*b[1],
			a[0]*b[3] - a[1]*b[2] + a[2]*b[1] + a[3]*b[0]
		];
	},
	rotatePoint: function(quat, point) {
		let p = [0, point[0], point[1], point[2]];
		p = q4.mult(q4.mult(q4.invert(quat), p), quat);
		return [p[1], p[2], p[3]];
	},
	rotateCoord: function(quat, point) {
		let p = [0, point[0], point[1], point[2]];
		p = q4.mult(q4.mult(quat, p), q4.invert(quat));
		return [p[1], p[2], p[3]];
	},
	eulerToQuat: function(x, y, z) {
		let c = Math.cos, s = Math.sin;
		return [
			c(x/2)*c(y/2)*c(z/2) + s(x/2)*s(y/2)*s(z/2),
			s(x/2)*c(y/2)*c(z/2) - c(x/2)*s(y/2)*s(z/2),
			c(x/2)*s(y/2)*c(z/2) + s(x/2)*c(y/2)*s(z/2),
			c(x/2)*c(y/2)*s(z/2) - s(x/2)*s(y/2)*c(z/2)
		];
	},
	quatToEulerX: function(quat) {
		if (Math.abs(2*(quat[0]*quat[2] - quat[1]*quat[3])) < 0.9999999) {
			return Math.atan2(2*(quat[0]*quat[1] + quat[2]*quat[3]), 1 - 2*quat[1]**2 - 2*quat[2]**2);
		} else {return 0;}
	},
	quatToEulerY: function(quat) {
		return Math.asin(2*(quat[0]*quat[2] - quat[1]*quat[3]));
	},
	quatToEulerZ: function(quat) {
		if (Math.abs(2*(quat[0]*quat[2] - quat[1]*quat[3])) < 0.9999999) {
			return Math.atan2(2*(quat[0]*quat[3] + quat[1]*quat[2]), 1 - 2*quat[2]**2 - 2*quat[3]**2);
		} else {
			return Math.atan2(2*(-quat[1]*quat[2] - quat[0]*quat[3]), 1 - 2*quat[1]**2 - 2*quat[3]**2);
		}
	},

	// New
	quatToEuler2X: function(quat) {
		return Math.asin(quat[1])*2;
	},
	quatToEuler2Y: function(quat) {
		return Math.asin(quat[2])*2;
	},
	quatToEuler2Z: function(quat) {
		return Math.asin(quat[3])*2;
	},
	// // New

	quatToRotMat: function(quat) {
		return [
			1 - 2*quat[2]**2 - 2*quat[3]**2,
			2*quat[1]*quat[2] - 2*quat[0]*quat[3],
			2*quat[1]*quat[3] + 2*quat[0]*quat[2],
			0,
			2*(quat[1]*quat[2]) + 2*(quat[0]*quat[3]),
			1 - 2*quat[1]**2 - 2*quat[3]**2,
			2*(quat[2]*quat[3]) - 2*(quat[0]*quat[1]),
			0,
			2*(quat[1]*quat[3]) - 2*(quat[0]*quat[2]),
			2*(quat[2]*quat[3]) + 2*(quat[0]*quat[1]),
			1 - 2*quat[1]**2 - 2*quat[2]**2,
			0,
			0, 0, 0, 1
		];
	},
	rotMatToQuat: function(mat) {
		let q0 = Math.sqrt((1 + mat[0] + mat[5] + mat[10]) / 4), q1 = Math.sqrt((1 + mat[0] - mat[5] - mat[10]) / 4);
		let q2 = Math.sqrt((1 - mat[0] + mat[5] - mat[10]) / 4), q3 = Math.sqrt((1 - mat[0] - mat[5] + mat[10]) / 4);
		let largest = q0 >= q1 ? (q0 >= q2 ? (q0 >= q3 ? q0 : q3) : (q2 >= q3 ? q2 : q3)) :
														(q1 >= q2 ? (q1 >= q3 ? q1 : q3) : (q2 >= q3 ? q2 : q3));
		switch (largest) {
			case q0:
				q1 = (mat[9] - mat[6]) / (4*q0), q2 = (mat[2] - mat[8]) / (4*q0), q3 = (mat[4] - mat[1]) / (4*q0); break;
			case q1:
				q0 = (mat[9] - mat[6]) / (4*q1), q2 = (mat[1] + mat[4]) / (4*q1), q3 = (mat[2] + mat[8]) / (4*q1); break;
			case q2:
				q0 = (mat[2] - mat[8]) / (4*q2), q1 = (mat[1] + mat[4]) / (4*q2), q3 = (mat[6] + mat[9]) / (4*q2); break;
			case q3:
				q0 = (mat[4] - mat[1]) / (4*q3), q1 = (mat[2] + mat[8]) / (4*q3), q2 = (mat[6] + mat[9]) / (4*q3); break;
		}
		return [q0, q1, q2, q3];
	}
};
