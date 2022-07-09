let sh2d = {
	makeRect: function(x, y, width, height) {
		let x1 = x, x2 = x + width, y1 = y, y2 = y + height;
		return [
			x1, y1, x1, y2, x2, y1,
			x2, y1, x1, y2, x2, y2
		];
	}
};
let sh3d = {
	setBoxPoints: function(data, mat) {
		let x1 = -data.size.x/2, x2 = data.size.x/2;
		let y1 = -data.size.y/2, y2 = data.size.y/2;
		let z1 = -data.size.z/2, z2 = data.size.z/2;
		let p = [{x: x1, y: y1, z: z1}, {x: x1, y: y2, z: z1}, {x: x2, y: y1, z: z1}, {x: x2, y: y2, z: z1},
						{x: x1, y: y1, z: z2}, {x: x1, y: y2, z: z2}, {x: x2, y: y1, z: z2}, {x: x2, y: y2, z: z2}];
		for (let pnt of p) {
			let tempPnt = m4.multiplyVector(mat, [pnt.x, pnt.y, pnt.z, 1]);
			pnt.x = tempPnt[0], pnt.y = tempPnt[1], pnt.z = tempPnt[2];
		}
		return [
			p[0].x, p[0].y, p[0].z, p[1].x, p[1].y, p[1].z, p[2].x, p[2].y, p[2].z,
			p[2].x, p[2].y, p[2].z, p[1].x, p[1].y, p[1].z, p[3].x, p[3].y, p[3].z, // Front
			p[4].x, p[4].y, p[4].z, p[6].x, p[6].y, p[6].z, p[5].x, p[5].y, p[5].z,
			p[5].x, p[5].y, p[5].z, p[6].x, p[6].y, p[6].z, p[7].x, p[7].y, p[7].z, // Back
			p[0].x, p[0].y, p[0].z, p[2].x, p[2].y, p[2].z, p[4].x, p[4].y, p[4].z,
			p[4].x, p[4].y, p[4].z, p[2].x, p[2].y, p[2].z, p[6].x, p[6].y, p[6].z, // Bottom
			p[1].x, p[1].y, p[1].z, p[5].x, p[5].y, p[5].z, p[3].x, p[3].y, p[3].z,
			p[3].x, p[3].y, p[3].z, p[5].x, p[5].y, p[5].z, p[7].x, p[7].y, p[7].z, // Top
			p[0].x, p[0].y, p[0].z, p[4].x, p[4].y, p[4].z, p[1].x, p[1].y, p[1].z,
			p[1].x, p[1].y, p[1].z, p[4].x, p[4].y, p[4].z, p[5].x, p[5].y, p[5].z, // Left
			p[2].x, p[2].y, p[2].z, p[3].x, p[3].y, p[3].z, p[6].x, p[6].y, p[6].z,
			p[6].x, p[6].y, p[6].z, p[3].x, p[3].y, p[3].z, p[7].x, p[7].y, p[7].z  // Right
		];
	},
	setBoxNormals: function(mat) {
		let s = [{x: 0, y: 0, z: -1}, {x: 0, y: 0, z: 1}, {x: 0, y: -1, z: 0},
				{x: 0, y: 1, z: 0}, {x: -1, y: 0, z: 0}, {x: 1, y: 0, z: 0}];
		let normals = [];
		for (let side of s) {
			let tempSide = m4.multiplyVector(mat, [side.x, side.y, side.z, 1]);
			side.x = tempSide[0], side.y = tempSide[1], side.z = tempSide[2];
			for (let i = 0; i < 6; i++) {normals = normals.concat([side.x, side.y, side.z]);}
		}
		return normals;
	},
	setBoxColors: function(clr) {
		let boxColor = [];
		for (let i = 0; i < 36; i++) {boxColor = boxColor.concat([clr.r, clr.g, clr.b]);}
		return boxColor;
	},
	setBoxTextures: function() {
		return [
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
			0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1
		];
	}
};
