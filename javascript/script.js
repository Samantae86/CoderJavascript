document.addEventListener("DOMContentLoaded", function () {


    // Constantes
    const MAX_BICICLETAS = 2;  // Cantidad de bicicletas disponibles por turno
    const HORARIOS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];  // Horarios disponibles
    let turnosDisponibles = [];  // Array para los turnos ocupados por cada hora
    let nombreCliente; // Variable para almacenar el nombre del cliente


    // Inicializamos los turnos disponibles para cada hora (vacíos)
    for (let i = 0; i < HORARIOS.length; i++) {
        turnosDisponibles[i] = [];
    }


    // Función para mostrar los horarios disponibles con plazas libres
    function mostrarHorariosDisponibles() {
        let mensajeHorarios = "¡Hola! Estos son los horarios disponibles:\n";
        for (let i = 0; i < HORARIOS.length; i++) {
            let plazasLibres = MAX_BICICLETAS - turnosDisponibles[i].length;
            if (plazasLibres > 0) {
                mensajeHorarios += `${i + 1}. ${HORARIOS[i]} (Plazas disponibles: ${plazasLibres})\n`;
            }
        }
        return mensajeHorarios; // Devuelve el mensaje con los horarios
    }


    // Función para reservar un turno
    function reservarTurno() {
        // Pedir el nombre del cliente
        nombreCliente = prompt("Ingrese su nombre para reservar un turno:");
        console.log(`Cliente: ${nombreCliente}`);

        // Mostrar los horarios disponibles
        let mensajeHorarios = mostrarHorariosDisponibles();

        // Si no hay turnos disponibles, dar opción de salir
        if (!mensajeHorarios.includes("Plazas disponibles")) {
            alert("Lo siento, no hay turnos disponibles.");
            console.log("No hay turnos disponibles.");
            return false;  // Cancelar la reserva
        }

        // Preguntar si desea continuar después de ver los horarios disponibles
        let continuar = confirm(mensajeHorarios + "\n¿Desea reservar un turno? Si no le interesa, puede cancelar.");
        if (!continuar) {
            alert("Reserva cancelada.");
            console.log("Reserva cancelada.");
            return false;  // Cancelar la reserva
        }

        // Pedir al usuario que seleccione el turno
        let opcion = Number(prompt(mensajeHorarios));

        // Verificar si la opción es válida
        if (isNaN(opcion) || opcion < 1 || opcion > HORARIOS.length) {
            alert("Opción no válida. Intente de nuevo.");
            console.log("Opción no válida");
            return false;  // Cancelar la reserva
        }

        // Verificar si hay bicicletas disponibles en el horario seleccionado
        let indiceHorario = opcion - 1;
        if (turnosDisponibles[indiceHorario].length < MAX_BICICLETAS) {
            turnosDisponibles[indiceHorario].push(nombreCliente);
            alert(`¡Turno reservado con éxito para ${nombreCliente} a las ${HORARIOS[indiceHorario]}!`);
            console.log(`Reserva exitosa: ${nombreCliente} - ${HORARIOS[indiceHorario]}`);
            return true;  // Confirmar reserva exitosa
        } else {
            alert(`Lo siento, no hay más bicicletas disponibles para el turno de las ${HORARIOS[indiceHorario]}.`);
            console.log(`Turno lleno: ${HORARIOS[indiceHorario]}`);
            return false;  // Cancelar la reserva
        }
    }


    // Función para mostrar el resumen de turnos
    function mostrarTurnos() {
        console.log("Resumen de Turnos Reservados:");
        for (let i = 0; i < HORARIOS.length; i++) {
            console.log(`${HORARIOS[i]}: ${turnosDisponibles[i].length} turnos ocupados`);
        }
    }

    // Función principal para ejecutar el simulador
    function simuladorTurnos() {
        let continuar = true;

        while (continuar) {
            // Reservar turno
            continuar = reservarTurno();

            if (continuar) {
                // Preguntar si quiere seguir reservando turnos
                continuar = confirm("¿Desea reservar otro turno?");
                console.log(`¿Desea reservar otro turno? Respuesta: ${continuar}`);
            }
        }

        // Mostrar el resumen final de los turnos en la consola
        mostrarTurnos();
    }

// Ejecutar el simulador
    simuladorTurnos();
});