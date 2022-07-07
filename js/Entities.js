// Globals
const BU = canvas.height/200;
let entityCount = 1;
let objsArray = [];
// Functions
function rndv() {return Math.PI * Math.random()*0.3;}
// 0
function buildEntity(posX, posY, posZ, posSpdX, posSpdY, posSpdZ, rotX, rotY, rotZ) {
	let partsArr = makeBlockData('anchor', {x: BU*7, y: BU*10, z: BU*3}, {x: posX, y: posY, z: posZ, spd: {x: posSpdX, y: posSpdY, z: posSpdZ}}, {x: rotX, y: rotY, z: rotZ}, {r: 1, g: 0, b: 0});// Body
	partsArr.sat[0] = makeBlockData('block', {x: BU*2, y: BU*3, z: BU*2}, {x: 0, y: BU*6.5, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Neck Block
	partsArr.sat[0].sat[0] = makeBlockData('joint', {x: 0, y: 0, z: 0}, {x: 0, y: BU*1, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: rndv(), z: 0}, min: {x: 0, y: -Math.PI/3, z: 0}, max: {x: 0, y: Math.PI/3, z: 0}},
									{r: 1, g: 0.6, b: 0.6});// Neck Joint1
	partsArr.sat[0].sat[0].sat[0] = makeBlockData('joint', {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: rndv(), y: 0, z: 0}, min: {x: -Math.PI*2/13, y: 0, z: 0}, max: {x: Math.PI*2/13, y: 0, z: 0}},
									{r: 1, g: 0.6, b: 0.6});// Neck Joint2
	partsArr.sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*3, z: BU*3}, {x: 0, y: BU*1, z: -BU/3}, {x: 0, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Head
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU/2, y: BU/2, z: BU/2}, {x: -BU*3/4, y: BU/2, z: -BU*11/8}, {x: 0, y: 0, z: 0}, {r: 0, g: 1, b: 1});// Left Eye
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[1] = makeBlockData('block', {x: BU/2, y: BU/2, z: BU/2}, {x: BU*3/4, y: BU/2, z: -BU*11/8}, {x: 0, y: 0, z: 0}, {r: 0, g: 1, b: 1});// Right Eye
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[2] = makeBlockData('block', {x: BU/2, y: BU, z: BU/2}, {x: 0, y: 0, z: -BU*6/4}, {x: Math.PI/9, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Nose
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[3] = makeBlockData('block', {x: BU*3/2, y: BU/4, z: BU/2}, {x: 0, y: -BU*7/8, z: -BU*11/8}, {x: 0, y: 0, z: 0}, {r: 1, g: 0, b: 0});// Mouth
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[4] = makeBlockData('block', {x: BU*7/2, y: BU, z: BU*3/4}, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Ears
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[5] = makeBlockData('block', {x: BU*4, y: BU, z: BU*4}, {x: 0, y: BU*3/2, z: 0}, {x: 0, y: 0, z: 0}, {r: 0.3, g: 0.1, b: 0.1});// Hair Top
	partsArr.sat[0].sat[0].sat[0].sat[0].sat[6] = makeBlockData('block', {x: BU*4, y: BU*4, z: BU}, {x: 0, y: 0, z: BU*3/2}, {x: 0, y: 0, z: 0}, {r: 0.3, g: 0.1, b: 0.1});// Hair Back
	partsArr.sat[1] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: -BU*3.5, y: BU*4, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: -Math.PI/4, z: 0}, max: {x: 0, y: Math.PI/2, z: 0}},
									{r: 1, g: 0, b: 0});// Left Shoulder1
	partsArr.sat[1].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: -BU*1, y: 0, z: 0},
									{x: 0, y: 0, z: -Math.PI/2, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: -Math.PI/2}, max: {x: 0, y: 0, z: Math.PI/2}},
									{r: 1, g: 0, b: 0});// Left Shoulder2
	partsArr.sat[1].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: -BU*1, y: 0, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
									{r: 1, g: 0, b: 0});// Left Shoulder3
	partsArr.sat[1].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*4, y: BU*2, z: BU*2}, {x: -BU*2.5, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0, b: 0});// Left Arm1
	partsArr.sat[1].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*2, y: BU*2, z: BU*2}, {x: -BU*2, y: 0, z: 0},
												{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: 0, y: Math.PI*3/4, z: 0}},
												{r: 1, g: 0, b: 0});// Left Elbow
	partsArr.sat[1].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*4, y: BU*2, z: BU*2}, {x: -BU*3, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0, b: 0});// Left Arm2
	partsArr.sat[1].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: -BU*1.5, y: 0, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: -Math.PI/4}, max: {x: 0, y: 0, z: Math.PI/4}},
																{r: 1, g: 0, b: 0});// Left Wrist1
	partsArr.sat[1].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: -BU*1, y: 0, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/2, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
																{r: 1, g: 0, b: 0});// Left Wrist2
	partsArr.sat[1].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*2, y: BU*2, z: BU*2}, {x: -BU*1.5, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Left Hand
	partsArr.sat[2] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: BU*3.5, y: BU*4, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: -Math.PI/2, z: 0}, max: {x: 0, y: Math.PI/4, z: 0}},
									{r: 1, g: 0, b: 0});// Right Shoulder1
	partsArr.sat[2].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: BU*1, y: 0, z: 0},
									{x: 0, y: 0, z: Math.PI/2, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: -Math.PI/2}, max: {x: 0, y: 0, z: Math.PI/2}},
									{r: 1, g: 0, b: 0});// Right Shoulder2
	partsArr.sat[2].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: BU*1, y: 0, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
									{r: 1, g: 0, b: 0});// Right Shoulder3
	partsArr.sat[2].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*4, y: BU*2, z: BU*2}, {x: BU*2.5, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0, b: 0});// Right Arm1
	partsArr.sat[2].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*2, y: BU*2, z: BU*2}, {x: BU*2, y: 0, z: 0},
												{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: -Math.PI*3/4, z: 0}, max: {x: 0, y: 0, z: 0}},
												{r: 1, g: 0, b: 0});// Right Elbow
	partsArr.sat[2].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*4, y: BU*2, z: BU*2}, {x: BU*3, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0, b: 0});// Right Arm2
	partsArr.sat[2].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: BU*1.5, y: 0, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: -Math.PI/4}, max: {x: 0, y: 0, z: Math.PI/4}},
																{r: 1, g: 0, b: 0});// Right Wrist1
	partsArr.sat[2].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*1, y: BU*2, z: BU*2}, {x: BU*1, y: 0, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/2, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
																{r: 1, g: 0, b: 0});// Right Wrist2
	partsArr.sat[2].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*2, y: BU*2, z: BU*2}, {x: BU*1.5, y: 0, z: 0}, {x: 0, y: 0, z: 0}, {r: 1, g: 0.6, b: 0.6});// Right Hand
	partsArr.sat[3] = makeBlockData('block', {x: BU*7, y: BU*3, z: BU*4}, {x: 0, y: -BU*6.5, z: BU/2}, {x: 0, y: 0, z: 0}, {r: 0, g: 0, b: 1});//Hips
	partsArr.sat[3].sat[0] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: -BU*2, y: 0, z: -BU/2},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
									{r: 0, g: 0, b: 1});// Left Hip Joint1
	partsArr.sat[3].sat[0].sat[0] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: 0, y: -BU, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: 0, y: 0, z: Math.PI/3}},
									{r: 0, g: 0, b: 1});// Left Hip Joint2
	partsArr.sat[3].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: 0, y: -BU, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: -Math.PI/2, z: 0}, max: {x: 0, y: 0, z: 0}},
									{r: 0, g: 0, b: 1});// Left Hip Joint3
	partsArr.sat[3].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*5, z: BU*3}, {x: 0, y: -BU*3, z: 0}, {x: 0, y: 0, z: 0}, {r: 0, g: 0, b: 1});// Left Leg1
	partsArr.sat[3].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*3, y: BU*1, z: BU*3}, {x: 0, y: -BU*2, z: 0},
												{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/2, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}},
												{r: 0, g: 0, b: 1});// Left Knee
	partsArr.sat[3].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*5, z: BU*3}, {x: 0, y: -BU*3, z: 0}, {x: 0, y: 0, z: 0}, {r: 0, g: 0, b: 1});// Left Leg2
	partsArr.sat[3].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*2, y: BU*2, z: BU*2}, {x: 0, y: -BU*2.5, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/3, y: 0, z: 0}, max: {x: Math.PI/4, y: 0, z: 0}},
																{r: 1, g: 1, b: 1});// Left Ankle
	partsArr.sat[3].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*2, z: BU*5}, {x: 0, y: -BU*2, z: -BU}, {x: 0, y: 0, z: 0}, {r: 0.5, g: 0.5, b: 0.5});// Left Foot
	partsArr.sat[3].sat[1] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: BU*2, y: 0, z: -BU/2},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: Math.PI/2, y: 0, z: 0}},
									{r: 0, g: 0, b: 1});// Right Hip Joint1
	partsArr.sat[3].sat[1].sat[0] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: 0, y: -BU, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: -Math.PI/3}, max: {x: 0, y: 0, z: 0}},
									{r: 0, g: 0, b: 1});// Right Hip Joint2
	partsArr.sat[3].sat[1].sat[0].sat[0] = makeBlockData('joint', {x: BU*3, y: BU, z: BU*3}, {x: 0, y: -BU, z: 0},
									{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: 0, y: 0, z: 0}, max: {x: 0, y: Math.PI/2, z: 0}},
									{r: 0, g: 0, b: 1});// Right Hip Joint3
	partsArr.sat[3].sat[1].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*5, z: BU*3}, {x: 0, y: -BU*3, z: 0}, {x: 0, y: 0, z: 0}, {r: 0, g: 0, b: 1});// Right Leg1
	partsArr.sat[3].sat[1].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*3, y: BU*1, z: BU*3}, {x: 0, y: -BU*2, z: 0},
												{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/2, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}},
												{r: 0, g: 0, b: 1});// Right Knee
	partsArr.sat[3].sat[1].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*5, z: BU*3}, {x: 0, y: -BU*3, z: 0}, {x: 0, y: 0, z: 0}, {r: 0, g: 0, b: 1});// Right Leg2
	partsArr.sat[3].sat[1].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('joint', {x: BU*2, y: BU*2, z: BU*2}, {x: 0, y: -BU*2.5, z: 0},
																{x: 0, y: 0, z: 0, spd: {x: 0, y: 0, z: 0}, min: {x: -Math.PI/3, y: 0, z: 0}, max: {x: Math.PI/4, y: 0, z: 0}},
																{r: 1, g: 1, b: 1});// Right Ankle
	partsArr.sat[3].sat[1].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0].sat[0] = makeBlockData('block', {x: BU*3, y: BU*2, z: BU*5}, {x: 0, y: -BU*2, z: -BU}, {x: 0, y: 0, z: 0}, {r: 0.3, g: 0.3, b: 0.3});// Right Foot
	createObjectMatrices(partsArr);
	return partsArr;
}
// 0
function buildGround(posX, posY, posZ, posSpdX, posSpdY, posSpdZ, rotX, rotY, rotZ) {
	let partsArr = makeBlockData('anchor', {x: BU*1000, y: BU*10, z: BU*1000}, {x: posX, y: posY, z: posZ, spd: {x: posSpdX, y: posSpdY, z: posSpdZ}}, {x: rotX, y: rotY, z: rotZ}, {r: 0, g: 1, b: 0});
	createObjectMatrices(partsArr);
	return partsArr;
}
// 1
function makeBlockData(ctg, s, p, r, c) {return {categ: ctg, sat: [], data: {size: s, pos: p, rot: r, clr: c}};}
// 1
function createObjectMatrices(partsArr) {
	//
	partsArr.mat = m4.translate(partsArr.data.pos.x, partsArr.data.pos.y, partsArr.data.pos.z);
	partsArr.mat = m4.multiply(partsArr.mat, m4.rotateX(partsArr.data.rot.x));
	partsArr.mat = m4.multiply(partsArr.mat, m4.rotateY(partsArr.data.rot.y));
	partsArr.mat = m4.multiply(partsArr.mat, m4.rotateZ(partsArr.data.rot.z));
	//
	partsArr.rotMat = m4.identity();
	partsArr.rotMat = m4.multiply(partsArr.rotMat, m4.rotateX(partsArr.data.rot.x));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, m4.rotateY(partsArr.data.rot.y));
	partsArr.rotMat = m4.multiply(partsArr.rotMat, m4.rotateZ(partsArr.data.rot.z));
	//
	if (partsArr.sat.length > 0) {for (let box of partsArr.sat) {createObjectMatrices(box);}}
}