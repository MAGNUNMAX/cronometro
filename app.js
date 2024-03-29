//obteniendo referencia de los botones

const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

//definimos tres variables una hora , min , seg
//se puedes definir varias variables y asignarles sus 
//valores si estan en un arreglo
let [horas, minutos, segundos] = [0, 0, 0];

//definir variable para ver el estado del tiempo,
// si el cronometro esta trabajando o pausado

let intervaloDeTiempo;

//variable para el estado del cronometro , pausado o andando
let estadoCronometro = 'pausado';

//definimos funcion ,va a calcular el manejo del tiempo del cronometro
function actualizarCronometro(){
  // se incrementa por que ya paso un segundo al llamar la funcio
  segundos ++; 
  
  if(segundos / 60 === 1){
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1){
      minutos = 0;
      horas++;

    }
  }

  //agregar un cero si el numero es un digito y quitar cero si es de dos digitos
  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  //actualizar contenido de cronometro
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}
// ? -significa 'entonces'
// : -significa 'y si no'
function asignarFormato(unidadDeTiempo){
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;

}

//asignar la funcion de los botones como eventlisteners

botonInicioPausa.addEventListener('click', function(){
  if(estadoCronometro === 'pausado'){
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
  }else {
    window.clearInterval(intervaloDeTiempo);
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});

//boton reiniciar
botonReiniciar.addEventListener('click',function(){
  window.clearInterval(intervaloDeTiempo);

  horas = 0;
  minutos = 0;
  segundos= 0;

  cronometro.innerText = '00:00:00';
//actualizar botones
  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');
//estado del cronometro
  estadoCronometro = 'pausado';
});