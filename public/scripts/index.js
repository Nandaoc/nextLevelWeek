const buttonsearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal") //Selecionando o formulário
const close = document.querySelector("#modal .header a")

//Quando o botão for clicado vai remover a classe hide, fazendo aparecer o fomrulário

buttonsearch.addEventListener("click", (event) => {
    event.preventDefault() //O navegador estava executando as duas funções ao mesmo tempo como default
    modal.classList.remove("hide")
})

//Quando o botão fechar for clicado, vai adicionar a classe hide, fazendo sumir o formulário

close.addEventListener("click", () => {
    modal.classList.add("hide")
})