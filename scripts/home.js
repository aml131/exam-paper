const playBtn = document.getElementById('playBtn')
playBtn.addEventListener("click",()=>{
  this.window.location.href='../no.html'
})
//the modal
const openBtn = document.getElementById('How2')
const closeBtn = document.getElementById('close')
const modal = document.getElementById('modal')

openBtn.addEventListener('click',()=>{
  modal.classList.add('open')
})
closeBtn.addEventListener('click',()=>{
  modal.classList.remove('open')
})