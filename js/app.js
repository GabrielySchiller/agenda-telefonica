let preferencia = localStorage.getItem('tema');

function carregarTema() {
    if (preferencia === 'claro') {
        temaClaro();
    } else {
        temaEscuro();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    carregarContatos();
    carregarTema();  // Aplica o tema ao carregar a página
});


let claro = document.querySelector('.claro').addEventListener('click', temaClaro);

function temaClaro(){

    document.body.style.backgroundColor = 'rgb(182, 207, 245)';

    let contatosExib = document.querySelector('.content-lista');
    contatosExib.style.backgroundColor = 'rgb(255, 255, 255)';

    let inputs = document.querySelectorAll('input');
   
    inputs.forEach(input =>{
        input.style.backgroundColor = ' #4a8bf5';
    });
   

    let letras = document.querySelectorAll('p');
    letras.forEach(letra =>{
        letra.style.color = 'rgb(0,0,0)';
    });
   
    localStorage.setItem('tema', 'claro');
    

};


let escuro = document.querySelector('.escuro').addEventListener('click', temaEscuro);

function temaEscuro(){

    document.body.style.backgroundColor = 'rgb(36, 36, 36)';
   
    let contatosExib = document.querySelector('.content-lista');
    contatosExib.style.backgroundColor = 'rgb(10, 10, 10)';

    let inputs = document.querySelectorAll('input');
    inputs.forEach(input =>{
        input.style.backgroundColor = 'rgb(40, 40, 40) ';
    });

    let letras = document.querySelectorAll('p');
    letras.forEach(letra =>{
        letra.style.color = '#fff';
    })

    localStorage.setItem('tema', 'escuro');
};



let caixaContatos = [ ];


function carregarContatos() {
    let contatosSalvos = localStorage.getItem('contatos');

    let contentContatos = document.querySelector('.content-lista')
    contentContatos.innerHTML =  '';
    
   
    if (contatosSalvos) {
        caixaContatos = JSON.parse(contatosSalvos);
        
        caixaContatos.forEach((contato, index) => {
           
            let contentContatos = document.querySelector('.content-lista');
            let novoContato = document.createElement('div');
            
            novoContato.classList.add('contato');
            novoContato.setAttribute('data-index', index);  // Atribui o índice do contato

            let numeroFormatado = contato.numero.replace(/\D/g, '');
            let ddd = numeroFormatado.slice(0, 2);
            let numero = numeroFormatado.slice(2);

            novoContato.innerHTML = `
                <div class="nomes">
                    <img class="img-contato" src="./img/contato.png" alt="icone de contato">:
                    <p class="nome">${contato.nome}</p>
                </div>
                <div class="numeros">
                    <img class="img-telefone" src="./img/telefone.png" alt="icone de telefone">:
                    <p class="numero">(${ddd}) ${numero}</p>
                </div>
                <div class="gmails">
                    <img src="./img/gmail.png" alt="icone de gmail">:
                    <p class="gmail">${contato.gmail}</p>
                </div>
                <div class="btns">
                    <button class="salvar reaparecer">
                        <img src="./img/verificar.png" title="Salvar contato" alt="Salvar contato">
                    </button>
                    <button class="editar aparecer">
                        <img src="./img/editar.png" title="Editar contato" alt="Editar contato">
                    </button>
                    <button class="remover">
                        <img src="./img/lixeira.png" title="Remover Contato" alt="Excluir contato">
                    </button>
                </div>`;

            contentContatos.appendChild(novoContato);
           
            if (preferencia === 'claro') {
                temaClaro();
            } else {
                temaEscuro();
            }

            novoContato.querySelector('.salvar').classList.remove('reaparecer');

            novoContato.querySelector('.remover').addEventListener('click', removerContato);
            
            novoContato.querySelector('.editar').addEventListener('click', function () {
                editarContato(novoContato);
            });

            novoContato.querySelector('.salvar').addEventListener('click', function (){
                salvarContato(novoContato);
        });
            
        });
   };
}




let btnAdicionar = document.querySelector('.adicionar');
btnAdicionar.addEventListener('click', adicionarContato);


function adicionarContato(){
   
    let contentContatos = document.querySelector('.content-lista');

    let novoContato = document.createElement('div');
     novoContato.classList.add('contato');

     novoContato.innerHTML += `<div class="nomes">
                <img class="img-contato" src="./img/contato.png" alt="icone de contato" >:
                <p class="nome"> <input class="input-nome claro escuro" type="text" placeholder="Nome do Contato"> </p>
             </div>
           
           <div class="numeros">
               <img class="img-telefone" src="./img/telefone.png" alt="icone de telefone">:
               <p class="numero"> <input class="input-num claro escuro " type="text" placeholder=" ( DDD ) + Número  "> </p>
           </div> 
            
            <div class="gmails">
                <img src="./img/gmail.png" alt="icone de gmail">:
                <p class="gmail"> <input class="input-gmail claro escuro" type="email" placeholder="Gmail"> </p>
             </div>
           
            <div class="btns">
                  <button class="salvar reaparecer">
                    <img src="./img/verificar.png" title="Salvar contato" alt="Salvar contato" >
                </button>

                 <button class="editar ">
                    <img src="./img/editar.png" title="Adicionar Contato" alt="Editar contato">
                </button>

                <button class="remover">
                    <img src="./img/lixeira.png" title="Remover Contato" alt="Excluir contato">
                </button>
            </div>`;

        contentContatos.appendChild(novoContato);
    
            
        novoContato.querySelector('.salvar').addEventListener('click', function (){
                salvarContato(novoContato);
        });
          
        novoContato.querySelector('.remover').addEventListener('click', removerContato);

        novoContato.querySelector('.editar').addEventListener('click', function (){
                editarContato(novoContato);
        });

        // Verificar e reaplicar o tema após adicionar um novo contato
      let preferencia = localStorage.getItem('tema');
      
      if (preferencia === 'claro') {
        temaClaro();  // Reaplica o tema claro
      
    } else {
        temaEscuro();  // Reaplica o tema escuro
     }

        
};







function salvarContato(contato){
    let inputNome = contato.querySelector('.input-nome').value;
    let inputNumero =  contato.querySelector('.input-num').value;
    let inputGmail = contato.querySelector('.input-gmail').value;

    if (inputNome === '' || inputNumero === '') {
        alert('Preencha os campos!');
        return;
    }

    const informacoes = {
        nome: inputNome,
        numero: inputNumero,
        gmail: inputGmail || '--------------------'
    };

   // Verifica se o contato tem um 'data-index' para identificar se é uma edição
   let index = contato.getAttribute('data-index');
   if (index !== null) {
       // Atualiza o contato existente no array
       caixaContatos[index] = informacoes;
   } else {
       // Caso contrário, adiciona como novo contato
       caixaContatos.push(informacoes);
       index = caixaContatos.length - 1; // Define o índice do novo contato
       contato.setAttribute('data-index', index); // Define o data-index no novo contato
   }

    localStorage.setItem('contatos', JSON.stringify(caixaContatos));

    let numeroFormatado = informacoes.numero.replace(/\D/g, ''); // Remove tudo que não for número
    let ddd = numeroFormatado.slice(0, 2);
    let numero = numeroFormatado.slice(2);

    contato.querySelector('.nome').innerHTML = informacoes.nome;
    contato.querySelector('.numero').innerHTML = `(${ddd}) ${numero}`;
    contato.querySelector('.gmail').innerHTML = informacoes.gmail;

    contato.querySelector('.salvar').classList.remove('reaparecer');
    contato.querySelector('.editar').classList.add('aparecer');
}

 




function removerContato(evento){
    const contatoRemover = evento.target.closest('.contato');
    
    if(contatoRemover){
        let index = Array.from(document.querySelectorAll('.contato')).indexOf(contatoRemover);
        
        caixaContatos.splice(index, 1);  // Remove do array
        
        localStorage.setItem('contatos', JSON.stringify(caixaContatos));  // Atualiza no localStorage
        
        contatoRemover.remove();
     }
};



function editarContato(contato){
    

    let nomeAtual = contato.querySelector('.nome').textContent;
    let numeroAtual = contato.querySelector('.numero').textContent;
    let gmailAtual = contato.querySelector('.gmail').textContent;


    if(gmailAtual === '--------------------' ){
        contato.querySelector('.gmail').innerHTML = `<input class="input-gmail" type="email" value="${gmailAtual = '' }">`;
    }


    contato.querySelector('.nome').innerHTML = `<input class="input-nome" type="text" value="${nomeAtual}">`;
    contato.querySelector('.numero').innerHTML = `<input class="input-num" type="text" value="${numeroAtual}">`;
    contato.querySelector('.gmail').innerHTML = `<input class="input-gmail" type="email" value="${gmailAtual}">`;

    contato.querySelector('.salvar').classList.add('reaparecer');
    contato.querySelector('.editar').classList.remove('aparecer');

    let temaAtual = localStorage.getItem('tema');
    let inputs = contato.querySelectorAll('input');

    if (temaAtual === 'claro') {
        inputs.forEach(input => {
            input.style.backgroundColor = '#4a8bf5'; 
            input.style.color = 'white'; 
        });
    } else {
        inputs.forEach(input => {
            input.style.backgroundColor = 'rgb(40, 40, 40)';  
            input.style.color = 'white';  
        });
    }

   
   
};



window.addEventListener('DOMContentLoaded' , carregarContatos);


