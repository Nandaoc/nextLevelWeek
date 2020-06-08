function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json() })
    .then(states => {

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    
    //Aqui estamos resgatando o input hiden do html 
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value 

    // Aqui estamos selecionando o índice do valor da array
    const indexOfSelectedState = event.target.selectedIndex
    // Aqui vamos colocar os índices em uma lista e, depois que ele for escolhido, será impresso na url do browser
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // Isso limpa o conteúdo de cidades quando elas são trocadas
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document 
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta: pegar todos os li
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//Criando um array para armazenar dados dos itens coletados

//Atualizando o campo escondido
const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //Adicionar e remover uma classe com js

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados
    //se sim, pegar itens selecionados
    //Se estiver selecionado, tirar da seleção
    //Se não estiver adicionado, adicionar à seleção
    //Atualizar o campo escondido com os itens selecionados

    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId //Isso será true ou false, vai testar até encontra um true 
        return itemFound
    })

    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItens = selectedItens.filter(item=>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
    }else{
        //Add o elemento dentro do array
        selectedItens.push(itemId)
    }

    //O valor de itens coletados será sempre o valor dos itens selecionados ao final da execução
    //Isso vai aparecer na url
    collectedItens.value = selectedItens
}
