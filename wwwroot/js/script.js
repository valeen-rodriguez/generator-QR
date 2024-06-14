document.addEventListener('DOMContentLoaded', function() {
    //clases
    const container = document.querySelector('.container');
    const qrInput = container.querySelector('.form input');
    const generateBtn = container.querySelector('.form button');
    const qrImg = container.querySelector('.qr-code img');
    const downloadBtn = document.getElementById('downloadBtn');
    let preValue;

    //mostrar-ocultar el botón de descarga
    function toggleDownloadButton(show) {
        if (show) {
            downloadBtn.style.display = 'block';
        } else {
            downloadBtn.style.display = 'none';
        }
    }

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
            generateBtn.innerText = "Código QR generado";
            //muestra el botón de descarga
            toggleDownloadButton(true);
        });
    });

    qrInput.addEventListener('keyup', () => {
        if (!qrInput.value.trim()) {
            container.classList.remove('active');
            preValue = "";
            //ocultar botón de descargar//
            toggleDownloadButton(false);
            //restaura el texto del boton generar//
            generateBtn.innerText = "Generar código QR";
        }
    });
    

    //descarga el código qr//
    downloadBtn.addEventListener('click', async function() {
        try {
            const qrCodeImageSrc = qrImg.src;
            const response = await fetch(qrCodeImageSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'codigoQR.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar codigo QR:', error);
        }
    });
});