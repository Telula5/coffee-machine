"use strict";
//alert("Подключен");
let state = "waiting";// cooking/ готовится  + ready готово
let balance = document.querySelector(".balance");// нужен не только инпут но и значение =>
let cup = document.querySelector(".cup img");
//console.log([balance.value]);//видим значение из инпута баланса при нажатии на кнопку кофе

function cookCoffee (name, price, elem) { // elem как раз получает this 
    if(state != "waiting") {
        return;
    }
    if(balance.value >= price) {
        state = "cooking";
        balance.style.backgroundColor = ""; // вернули цвет как было
        balance.value -= price; // balance.value = balance.value - price
        changeDisplayText("Ваш " + name + " готовится");
        
        console.log(elem);
        let coffeeImg = elem.querySelector("img");
        console.log(coffeeImg);
        let coffeeSrc = coffeeImg.getAttribute("src");//получили относит путь к картинке кружке на кот нажали
       // console.log(coffeeSrc);//путь абсолютный
       // console.log(coffeeImg.getAttribute("src"));//путь относительный
        
        
        startCooking(name, coffeeSrc);
    } else {
        changeDisplayText("Недостаточно средств");
        balance.style.backgroundColor = "#ffa500";
    }
}
//планирование
//setTimeout(func, ms)- отрабатывает 1 раз
//setInterval(func, ms)-работает пока не отключим
//можеи записать их в переменные let timeout = setTimeout(func, ms);
// clearTimeout(timeout)--сбросит работу
//clearInterval(interval)--сбросит работу

function startCooking(name , coffeeSrc) {
    
  // let progressBar = document.querySelector(".progress-bar"); // вынесли в функцию
   let cup = document.querySelector(".cup img");
   cup.setAttribute("src", coffeeSrc);// 1- какой атрибут и 2- какое значение -наша переменная
   cup.style.display = "inline";//делаем видимой кружку
   let t = 0;
 //  let cookingInterval = setInterval(function() {
     let cookingInterval = setInterval( ()  => {
         t++;
         cup.style.opacity = t + "%";
        // console.log(t);
        // progressBar.style.width = t + "%";// вынесли в функцию
        changeProgressPercent(t);
            
    
        if (t == 100) { 
            state = "ready";
            clearInterval(cookingInterval);// обрываем по достижении 100%
            changeDisplayText("Ваш" + " " + name + " " + "готов!");
            cup.style.cursor = "pointer";
            cup.onclick = function () {
                takeCoffee();
            }
        }
   }, 50)
}
  
function changeProgressPercent(percent){
    let progressBar = document.querySelector(".progress-bar");  
    progressBar.style.width = percent + "%";
}

function takeCoffee() {
    if (state != "ready"){
        return;
    }
  state = "waiting";
  changeProgressPercent(0);// сброс прогресс-бара
  cup.style.opacity = 0;
  cup.style.display = "none";
  cup.style.cursor = ""; // то же что none
  changeDisplayText("Выберите кофе");
  cup.onclick = null;// убрали слушатель события для клика кружки
}

function changeDisplayText(text) {
    if(text.length >23){
        text = text.slise(0, 23) + "...";
    }
    
    
    let displayText = document.querySelector(".display span");
    displayText.innerHTML = text;
}











