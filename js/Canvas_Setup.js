function findCanvas(appSpot) {
	let canvas = document.querySelector('canvas');
	if (!canvas) {
		canvas = document.createElement('canvas');
		appSpot.appendChild(canvas);
	}
	return canvas;
}
document.body.style.overflow = 'hidden';
document.body.style.margin = 0;
const canvas = findCanvas(document.body);
const webGL = canvas.getContext('webgl');
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;