const recognition = new webkitSpeechRecognition();
const names = ["Soporte", "Almacen"];
const causas = ["falta de mantenimiento", "mantenimiento preventivo", "falla de equipo"];
let currentQuestion = 0;
let accumulatedResult = '';

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('about').value = '';
    currentQuestion = 0;
    accumulatedResult = '';
}

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;
recognition.onresult = handleSpeechRecognition;

function handleSpeechRecognition(event) {
    const result = event.results[event.results.length - 1][0].transcript;

    console.log('Texto reconocido:', result);

    if (result.toLowerCase().includes('detener')) {
        recognition.stop();
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        return;
    }

    if (currentQuestion === 0) {
        const isNameValid = names.some(name => result.toLowerCase().includes(name.toLowerCase()));

        if (isNameValid) {
            document.getElementById('name').value = result;
            currentQuestion++;
            document.getElementById('reason').focus();
        } else {
            console.log('Nombre no válido');
        }
    } else if (currentQuestion === 1) {
        const isCausaValid = causas.some(causa => result.toLowerCase().includes(causa.toLowerCase()));

        if (isCausaValid) {
            document.getElementById('reason').value = result;
            currentQuestion++;
            document.getElementById('about').focus();
        } else {
            console.log('Causa no válida');
        }
    } else if (currentQuestion === 2) {
        accumulatedResult += result + ' ';
        document.getElementById('about').value = accumulatedResult;
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    console.log('Iniciando reconocimiento de voz');
    resetForm();
    recognition.start();
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
});

document.getElementById('stopButton').addEventListener('click', () => {
    console.log('Deteniendo reconocimiento de voz');
    recognition.stop();
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true; 
});

// Obtén una referencia a los elementos input y textarea
const nameInput = document.getElementById('name');
const reasonInput = document.getElementById('re]son');
const aboutTextarea = document.getElementById('about');


// Mensajes de advertencia al dar clic en formulario
// nameInput.addEventListener('click', () => {
//     alert('No se acepta texto por teclado');
// });

// reasonInput.addEventListener('click', () => {
//     alert('No se acepta texto por teclado');
// });

// aboutTextarea.addEventListener('click', () => {
//     alert('No se acepta texto por teclado');
// });