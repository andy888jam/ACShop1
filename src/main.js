import './scss/main.scss'
console.log('JS loaded!')

const steps = document.querySelectorAll('.step')
const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')
const mainButton = document.querySelector('.main__button')
const formParts = document.querySelectorAll('.part')
const itemList = document.querySelector('.main__cart__items')
const totalPrice = document.querySelector('.total-price')
let step = 0

//商品
const items = [
  {
    id: 1,
    img: 'image/Block@2x.png',
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    quantity: 1,
  },
  { 
    id: 2,
    img: 'image/Block2@2x.png',
    name: '刷色直筒牛仔褲',
    price: 1299,
    quantity: 1,
  },
]

//用迴圈渲染
items.forEach(item => {
  itemList.innerHTML += `
    <div class="main__cart__items__item" id = "${item.id}">
      <div class="item-picture">
        <img src="${item.img}" alt="">
      </div>
      <div class="item-detail">
        <p class="item-name">${item.name}</p>
        <div class="numbers">
          <button class="item-detail__numbers__minus">-</button>
          <p class="item-detail__numbers__number">${item.quantity}</p>
          <button class="item-detail__numbers__plus">+</button>
        </div>
        <div class="item-price">$${item.price}</div>
    </div>
  `
});

//上一步下一步函式
function handleStepClicked (e) {
  e.preventDefault()
  const nowStep = steps[step]
  if(e.target.matches('.next') && e.target.innerHTML !== '確認下單') {
    console.log('hi')
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.prev')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

//按鈕調整函式
function setBtnDisabled () {
  if(step === 0) {
    prevBtn.classList.add('d-none')
    nextBtn.classList.remove('next-shorter')
  } else {
    prevBtn.classList.remove('d-none')
    nextBtn.classList.add('next-shorter')
  } if(step === 2) {
    nextBtn.innerHTML="確認下單"
  } else {
    nextBtn.innerHTML="下一步<span>&rarr;</span>"
  }
}

//調整商品數量函式
function setItemNumber (e) {
  //增加數量鈕
  if (e.target.matches('.item-detail__numbers__plus')) {
    const id = e.target.closest('.main__cart__items__item').id
    itemList.innerHTML = ''
    items.forEach(item => {
      //點擊的該項商品+1並渲染
      if(item.id === Number(id)) {
      itemList.innerHTML += `
        <div class="main__cart__items__item" id = "${item.id}">
          <div class="item-picture">
            <img src="${item.img}" alt="">
          </div>
          <div class="item-detail">
            <p class="item-name">${item.name}</p>
            <div class="numbers">
              <button class="item-detail__numbers__minus">-</button>
              <p class="item-detail__numbers__number">${item.quantity + 1}</p>
              <button class="item-detail__numbers__plus">+</button>
            </div>
            <div class="item-price">$${item.price}</div>
        </div>
      `
      item.quantity++
      countTotal()
      //渲染其他沒被點擊的商品
      } else {
        itemList.innerHTML +=
        `<div class="main__cart__items__item" id = "${item.id}">
          <div class="item-picture">
            <img src="${item.img}" alt="">
          </div>
          <div class="item-detail">
            <p class="item-name">${item.name}</p>
            <div class="numbers">
              <button class="item-detail__numbers__minus">-</button>
              <p class="item-detail__numbers__number">${item.quantity}</p>
              <button class="item-detail__numbers__plus">+</button>
            </div>
            <div class="item-price">$${item.price}</div>
        </div>`
      }
    })
  //減少數量
  } else if (e.target.matches('.item-detail__numbers__minus')) {
      let id = e.target.closest('.main__cart__items__item').id
      itemList.innerHTML = ''
      //點擊的該項商品-1並渲染
      items.forEach(item => {
        if(item.id === Number(id) && item.quantity >= 2) {
          itemList.innerHTML += `
            <div class="main__cart__items__item" id = "${item.id}">
              <div class="item-picture">
                <img src="${item.img}" alt="">
              </div>
              <div class="item-detail">
                <p class="item-name">${item.name}</p>
                <div class="numbers">
                  <button class="item-detail__numbers__minus">-</button>
                  <p class="item-detail__numbers__number">${item.quantity - 1}</p>
                  <button class="item-detail__numbers__plus">+</button>
                </div>
                <div class="item-price">$${item.price}</div>
            </div>
          `
          item.quantity--
          countTotal()
          //渲染其他沒被點擊的商品
        } else {
            itemList.innerHTML +=
            `<div class="main__cart__items__item" id = "${item.id}">
              <div class="item-picture">
                <img src="${item.img}" alt="">
              </div>
              <div class="item-detail">
                <p class="item-name">${item.name}</p>
                <div class="numbers">
                  <button class="item-detail__numbers__minus">-</button>
                  <p class="item-detail__numbers__number">${item.quantity}</p>
                  <button class="item-detail__numbers__plus">+</button>
                </div>
                <div class="item-price">$${item.price}</div>
            </div>`
        }   
      })
  }
}

//總額計算函式
function countTotal () {
  let total = 0
  items.forEach(item => {
    total += item.price * item.quantity
  })
  totalPrice.innerHTML = `$${total}`
}



mainButton.addEventListener('click', handleStepClicked)
itemList.addEventListener('click', setItemNumber)
