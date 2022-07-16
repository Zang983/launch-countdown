/*Définition des différentes variables*/
let days_block = $("#days")
let hours_block = $("#hours")
let minutes_block = $("#minutes")
let seconds_block = $("#seconds")
let target = localStorage.getItem("date")
let inputDate = $("#date_target")
let resetBtn = $("#reset")
let time="";
let days = 0; hours = 0; minutes = 0; seconds = 0;
let days_value = "", hours_value = "", minutes_value = "", seconds_value = ""

if (target != null) {
  target = new Date(target).getTime()
}
/* Event sur le changement de date. */
inputDate.bind("change", () => {
  if (new Date(inputDate.val()).getTime() <= new Date().getTime()) {
    alert("Problème de sélection de date")
  }
  else {
    if (confirm("Voulez vous changer la date visée ?")) {
      localStorage.setItem("date", inputDate.val())
      target = new Date(inputDate.val()).getTime();
    }
  }
  initAfficheTimer(target)
})
/*Calcul du temps de différence*/
function timeDif(target) {
  if (target === "" || target < new Date().getTime() || target === null || target === undefined) {
    days = 0; hours = 0; minutes = 0; seconds = 0;
  }
  else {
    days=0;hours=0;minutes=0;seconds=0
    let dateActuelle = new Date().getTime()
    let difference = Math.round((target - dateActuelle) / 1000)
    days = Math.floor(difference / 86400)
    difference -= days * 86400
    hours = Math.floor(difference / 3600)
    difference -= hours * 3600
    minutes = Math.floor(difference / 60)
    seconds = difference % 60
  }
}
/* Modifie le dom */
function affiche(value, block) {
  if (value < 10) {
    value = "0" + value
  }
  block.text(value)
}
/* Initialise l'affichage lors de la visite de la page || à la demande lors d'un changement de date*/
function initAfficheTimer(target) {
  timeDif(target)
  affiche(days, days_block)
  affiche(hours, hours_block)
  affiche(minutes, minutes_block)
  affiche(seconds, seconds_block)
  clearInterval(time)
  timer(target)
}
/* Appelle la fonction timer */
function timer(target) {
  time = setInterval(() => {
    timeDif(target)
    affiche(seconds, seconds_block)
    if (seconds === 59) {
      affiche(minutes, minutes_block)
    }
    if (minutes === 59) {
      affiche(hours, hours_block)
    }
    if (hours === 23 && minutes === 59 && seconds === 59) {
      affiche(days, days_block)
    }
    if (Math.round((target - new Date().getTime()) / 1000) <= 0)//Si la date prévue est dépassée on arrête le timer
    {
      localStorage.clear()
      clearInterval(time)
    }
  }, 1000)
}
initAfficheTimer(target)