const select = document.querySelectorAll(".currency")
const btn = document.getElementById("btn")
const num = document.getElementById("num")
const ans = document.getElementById("ans")

/*---*/
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementGBP = document.querySelector('[data-value="GBP"]')
/*---*/

/*Объект с курсами 3-х валюи*/
const ratest = {}


getCurrencies()

/*Функция конвертации*/
async function getCurrencies (){
  const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=fc5da390aa70424e8b673eaee64a44f0&symbols') //Получаем данные, которые вернет fetch()
  const data = await response.json() //Распаковываем данные, которые возвращает response
  const result = await data //В result присваиваем распакованные данные из data

  ratest.USD = result.rates.USD * result.rates.RUB
  ratest.EUR = result.rates.EUR * result.rates.RUB
  ratest.GBP = result.rates.GBP * result.rates.RUB

  /*Втавляем в элементы текущюю валюту*/
  elementUSD.textContent = ratest.USD.toFixed(2)
  elementEUR.textContent = ratest.EUR.toFixed(2)
  elementGBP.textContent = ratest.GBP.toFixed(2)
}

fetch("https://openexchangerates.org/api/currencies.json")
  .then((data) => data.json())
  .then((data) => {
    display(data)
    colorInformer(data)
  })

function display(data) {
  const entries = Object.entries(data);
  for (var i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${entries[i][0]}">[${entries[i][0]}] ${entries[i][1]}</option>`
    select[1].innerHTML += `<option value="${entries[i][0]}">[${entries[i][0]}] ${entries[i][1]}</option>`
  }
}

btn.addEventListener("click", () => {
  let currency1 = select[0].value
  let currency2 = select[1].value
  let value = num.value

  if (currency1 != currency2) {
    convert(currency1, currency2, value)
  } else {
    alert("Choose Diffrent Currency")
  }
})

function convert(currency1, currency2, value) {
  fetch(
    `https://openexchangerates.org/api/latest.json?app_id=fc5da390aa70424e8b673eaee64a44f0&symbols=${currency1},${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
      console.log(Object.values(val.rates)[0])
      const [v1, v2] = Object.values(val.rates)
      ans.value = (v2 * value / v1).toFixed(2)
    })
}