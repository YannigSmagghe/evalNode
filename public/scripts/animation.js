const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 1000;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 16;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let ratio = canvas.height / canvas.width;
function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
}
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('dblclick', (e) => {
    hue = 0;
    isDrawing = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

//Prints canvas to pdf

const buttonPrint = document.querySelector('#print');

buttonPrint.addEventListener('click',   printPDF);

function printPDF() {
    html2canvas($("#draw"), {

        onrendered: function(canvas){
            var imgData = canvas.toDataURL('image/png');
            var doc = new jsPDF('p', 'px');
            var width = doc.internal.pageSize.width;
            var height = doc.internal.pageSize.height;
            height = ratio * width;
            doc.addImage(imgData, 'PNG', 0, 32, width, height);
            doc.save('your-art.pdf');
        }
    });
}