document.addEventListener('DOMContentLoaded', function() {
    //clases
    const container = document.querySelector('.container');
    const qrInput = container.querySelector('.form input');
    const generateBtn = container.querySelector('.form button');
    const qrImg = container.querySelector('.qr-code img');
    let preValue;

    //generar codigo
    generateBtn.addEventListener('click', () => {
        let qrValue = qrInput.value.trim();
        if (!qrValue || preValue === qrValue) return;
        preValue = qrValue;
        generateBtn.innerText = "Generando código QR...";
        //api generador//
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        qrImg.addEventListener('load', () => {
            container.classList.add('active');
            generateBtn.innerText = "Código QR generado.";
        });
    });

    qrInput.addEventListener('keyup', () => {
        if (!qrInput.value.trim()) {
            container.classList.remove('active');
            preValue = "";
        }
    });
});