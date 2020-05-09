// Some base functions

function H1(text, _class = null) {
    var h = document.createElement("H1");
    var t = document.createTextNode(text);

    if (_class != null) {
        h.classList.add(_class)
    }

    h.appendChild(t);
    document.body.appendChild(h);
}


function P(text, _class = null) {
    var h = document.createElement("P");
    var t = document.createTextNode(text);

    if (_class != null) {
        h.classList.add(_class)
    }

    h.appendChild(t);
    document.body.appendChild(h);
}



// Constatns
const canvas = document.querySelector("#paint_board");
const ctx = canvas.getContext("2d");

function resize(ctx) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

window.addEventListener("load", () => {

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    let can_paint = false;

    let color_input = document.querySelector("#color");
    let hex_input = document.querySelector("#hex");

    let size_input = document.querySelector("#size");
    let minus = document.querySelector("#minus");
    let plus = document.querySelector("#plus");

    var color;
    var size = 0;

    minus.addEventListener("click", function() {
        if (size > 0) {
            size--;
            size_input.value = size;
        }
    });

    plus.addEventListener("click", function() {
        size++;
        size_input.value = size;

    });

    size_input.addEventListener("input", () => {
        size = size_input.value;
    });

    color_input.addEventListener("input", () => {
        color = color_input.value;
        hex_input.value = color;
    });



    function startPosition() {
        can_paint = true;
    }

    function finishedPosition(e) {
        can_paint = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!can_paint) {
            return
        };
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY)
        ctx.closePath();
    }
    // window.addEventListener("resize", resize(ctx));
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
})

// Stripped from
// https://stackoverflow.com/questions/11167281/webkit-css-to-control-the-box-around-the-color-in-an-inputtype-color
$(document).on('change', 'input[type=color]', function() {
    this.parentNode.style.backgroundColor = this.value;
});