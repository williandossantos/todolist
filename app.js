const btnAdicionar = document.querySelector("#adicionar")

btnAdicionar.addEventListener("click", pegarTexto)
function pegarTexto(){
   const aviso = document.querySelector(".aviso")
   const sucesso = document.querySelector(".sucesso")
   const texto = document.querySelector("#search")
   if(texto.value == "") {
      aviso.style.display = "block"
      aviso.textContent = "Você precisa adicionar uma atividade."
      setTimeout(function() {
         aviso.style.display = "none"
      },2000);
      return
   }else if(texto.value.length <= 8){
      aviso.style.display = "block"
      aviso.textContent = "Minimo de letras para uma atividade são de 9 letras."
      setTimeout(function() {
         aviso.style.display = "none"
      },2000);
      return
   }
   
   sucesso.style.display = "block"
   sucesso.textContent = "Atividade cadastrada com sucesso"
   setTimeout(function() {
      sucesso.style.display = "none"
   },2000);
   let textoMinusculo = texto.value.toLowerCase()
   adicionarTextoNaTela(textoMinusculo)
   eventClick()
   texto.focus()
   texto.value = ""
}

function adicionarTextoNaTela(texto){
   const classFlex = document.querySelector(".flex")
   
   const codigoDiv = `
   <div class="wrap">
      <p class="atividade">${texto}</p>
      <button class="excluir">
         <img src="./trash.svg" alt="" />
      </button>
   </div>
   `
   classFlex.innerHTML += codigoDiv
   adicionarNoStorage(texto)
}

function mostrarTextoDoStorage(texto){
   const classFlex = document.querySelector(".flex")
   
   const codigoDiv = `
   <div class="wrap">
      <p class="atividade">${texto}</p>
      <button class="excluir">
         <img src="./trash.svg" alt="" />
      </button>
   </div>
   `
   classFlex.innerHTML += codigoDiv
}

function adicionarNoStorage(texto){
   let armazenamentoTemporario = new Array()
   let bancoDeDados = localStorage
   if(bancoDeDados.hasOwnProperty("atividades")){
      armazenamentoTemporario = JSON.parse(bancoDeDados.getItem("atividades"))
   }
   armazenamentoTemporario.push({atividade: texto})
   bancoDeDados.setItem("atividades", JSON.stringify(armazenamentoTemporario))
}
function mostrarDoStorage(){
   let bancoDeDados = localStorage
   let armazenamentoTemporario = JSON.parse(bancoDeDados.getItem("atividades"))
   armazenamentoTemporario.forEach(dado =>{
      mostrarTextoDoStorage(dado.atividade)
   })
}
mostrarDoStorage()

function excluirDadosDoStorage(texto){
   let deletar = document.querySelector(".deletar")
   let armazenamentoTemporario = new Array()
   let bancoDeDados = localStorage
   if(bancoDeDados.hasOwnProperty("atividades")){
      armazenamentoTemporario = JSON.parse(bancoDeDados.getItem("atividades"))
      armazenamentoTemporario.forEach(dado=>{
         if(dado.atividade == texto) {
            console.log(texto, dado.atividade)
            armazenamentoTemporario.splice(dado, 1)
            deletar.style.display = "block"
            deletar.textContent = "Atividade deletada com sucesso."
            setTimeout(function() {
               deletar.style.display = "none"
            },2000);
         }
      })
   }
   bancoDeDados.setItem("atividades", JSON.stringify(armazenamentoTemporario))
}

function eventClick(){
   let realizada = document.querySelector(".atividade-realizada")
   let texto = document.querySelector(".atividade")
   let wrap = document.querySelectorAll(".wrap")
   let excluir = document.querySelectorAll(".excluir")
   
   wrap.forEach(el =>{
      el.addEventListener("click",(e)=>{
         el.classList.toggle("config")
      })
      
      excluir.forEach(ex =>{
         ex.addEventListener("click",(e)=>{
            ex.parentNode.remove()
            excluirDadosDoStorage(texto.textContent)
            
            setTimeout(()=>{
               location.reload()
            }, 2000)
         })
      })
   })
}
eventClick()



















