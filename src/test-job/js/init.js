var random = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var term1 = random(6, 9);
var term2 = random(11, 14) - term1;
var sum = term1 + term2;
var body = document.body;

var formula = document.createElement('div');
formula.classList.add('formula');
formula.innerHTML = "<span class='term1'>" + term1 + "</span> + <span class='term2'>" + term2 + "</span> = <span class='total'>?</span>";

var formulaTerm1 = formula.querySelector('.term1');
var formulaTerm2 = formula.querySelector('.term2');
var total = formula.querySelector('.total');

body.insertAdjacentElement('afterBegin', formula);

var renderer = body.querySelector('.renderer');
var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');

var px = 41.2;

var controlX1 = (px * term1) / 2;
var controlY1 = -70;
var endX1 = px * term1;
var endY = 85;

var controlX2 = ((px * term1) + ((px * term1) + (px * term2))) / 2;
var controlY2 = -70 / 2;
var endX2 = (px * term2) + (px * term1);


var createFirstArc = function() {
	ctx.beginPath();
	ctx.moveTo(0, endY);
	ctx.quadraticCurveTo(controlX1, controlY1, endX1, endY);
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'red';
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(endX1, endY);
	ctx.lineTo(endX1 - 15, 80);
	ctx.moveTo(endX1, endY);
	ctx.lineTo(endX1 - 2, 72);
	ctx.stroke();
};

createFirstArc();

var createSecondArc = function() {
	ctx.beginPath();
	ctx.moveTo(endX1, endY);
	ctx.quadraticCurveTo(controlX2, controlY2, endX2, endY);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(endX2, endY);
	ctx.lineTo(endX2 - 15, 80);
	ctx.moveTo(endX2, endY);
	ctx.lineTo(endX2 - 2, 72);
	ctx.stroke();
};

var term1Input = document.createElement('input');
term1Input.setAttribute("type", "text");
term1Input.classList.add('termInput');
renderer.append(term1Input);
term1Input.style.left = controlX1 - term1Input.clientWidth/2 + 'px';
term1Input.style.top = controlY1 + 'px';

var term2Input = document.createElement('input');

var equalInput = document.createElement('input');
equalInput.setAttribute("type", "text");
equalInput.classList.add('equalInput');

var checkInputValue = function() {
	var inputs = document.querySelectorAll('input');
	for (var input of inputs) {
		if (!input.disabled) {
			return;
		} else if (input.disabled) {
			term2Input.setAttribute("type", "text");
			term2Input.classList.add('termInput');
			renderer.append(term2Input);
			term2Input.style.left = ((controlX2 - term2Input.clientWidth) + 'px');
			term2Input.style.top = (controlY1 / 1.5 + 'px');
			createSecondArc();
		}
	};
};

var checkTotal = function(inputValue, spanValue, span) {
	if (inputValue.value != spanValue) {
		inputValue.classList.add('inputError');
		span.classList.add('spanError');
	} else {
		inputValue.disabled = true;
		inputValue.classList.remove('inputError');
		span.classList.remove('spanError');
		checkInputValue();
	};
	if (term1Input.disabled === true && term2Input.disabled === true) {
		total.after(equalInput);
		total.remove();
	};
};

var checkSum = function() {
	if (equalInput.value === String(sum)) {
		equalInput.disabled = true;
		equalInput.classList.remove('inputError');
	} else {
		equalInput.classList.add('inputError');
	}
};

term1Input.oninput = function(){
	checkTotal(term1Input, term1, formulaTerm1);
};
term2Input.oninput = function(){
	checkTotal(term2Input, term2, formulaTerm2);
};
equalInput.oninput = function(){
	checkSum();
};