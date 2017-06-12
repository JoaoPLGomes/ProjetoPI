var equipas = [];
var competicoes = [];
var paises = ["Portugal","Brasil","Espanha","Alemanha"];
var posicoes = ["GR","DF","MC","AV"]
paises.sort();
var contadorJogadores = 3;
var contadorEquipas = 3


function Jogador(nome,pais,posicao,altura,dataNascimento,id){

this.nome = nome;
this.pais = pais;
this.posicao = posicao;
this.altura = altura;
this.dataNascimento = dataNascimento;
this.id = id || contadorJogadores;

}

function Equipa(nome,acronimo,url,pais,descricao,id){
    this.jogadores = [];
    this.nome = nome;
    this.pais = pais || "";
    this.acronimo =acronimo;
    this.url = url;
    this.descricao = descricao || "";
    this.id = id || contadorEquipas;
}

function Competicao(nome,equipasCompeticao){
    this.nome = nome;
    this.equipasCompeticao = equipasCompeticao;
}

mostrarHomePage();
equipas.push(new Equipa("Sem Equipa","","","",-1,""));
equipas.push(new Equipa("Real Madrid","RM","www.realmadrid.com","Espanha","",1));
equipas.push(new Equipa("Barcelona","BCL","www.barcelona.com","Espanha","",2));
equipas[1].jogadores.push(new Jogador("Ronaldo","Portugal","AV",1.85,"05/02/1985",1));
equipas[2].jogadores.push(new Jogador("Ronaldo","Portugal","AV",1.85,"05/02/1985",1));
equipas[0].jogadores.push(new Jogador("Marcelo","Brasil","DF",1.78,"12/05/1988",2));

function mostrarJogadores (){
    var idJogadoresTabela = [];
    
    var br = document.createElement("BR");

    var errosDiv = document.createElement("DIV");
    errosDiv.id = "errosDiv";

    var table = document.createElement("TABLE");
    table.id = "table";

    var tableHead = document.createElement("THEAD");
    var tableBody = document.createElement("TBODY");
    tableBody.id = "tableBody";
    var trHead = document.createElement("TR");
    
    var tdCheck = document.createElement("TD");
    

    var tdNome = document.createElement("TD");
    var nomeText = document.createTextNode('Nome');
    tdNome.appendChild(nomeText);
    var tdPais = document.createElement("TD");
    var paisText = document.createTextNode('País');
    tdPais.appendChild(paisText);
    var tdPosicao = document.createElement("TD");
    var posicaoText = document.createTextNode('Posiçao');
    tdPosicao.appendChild(posicaoText);
    var tdAltura  = document.createElement("TD");
    var alturaText = document.createTextNode('Altura');
    tdAltura.appendChild(alturaText);
    var tdIdade  = document.createElement("TD");
    var idadeText = document.createTextNode('Idade');
    tdIdade.appendChild(idadeText);

    trHead.appendChild(tdCheck);
    trHead.appendChild(tdNome);
    trHead.appendChild(tdPais);
    trHead.appendChild(tdPosicao);
    trHead.appendChild(tdAltura);
    trHead.appendChild(tdIdade);
    
    tableHead.appendChild(trHead);

    for(var i = 0 ; i< equipas.length;i ++){
        
        for(var k = 0 ; k< equipas[i].jogadores.length;k++){
            
               if(!idJogadoresTabela.includes(equipas[i].jogadores[k].id)){

               
                
                var trJogador = document.createElement("TR");
                var tdJogadorCheck = document.createElement("td");
                var tdJogadorCheckBox = document.createElement("input");
                tdJogadorCheckBox.type = "checkbox";
                tdJogadorCheck.appendChild(tdJogadorCheckBox);
                var tdJogadorNome = document.createElement("td");
                var jogadorLink = document.createElement("a");
                
                //jogadorLink.addEventListener("click",alert("LOL"));
                var jogadorNomeText = document.createTextNode(equipas[i].jogadores[k].nome);
                jogadorLink.appendChild(jogadorNomeText);
                tdJogadorNome.appendChild(jogadorLink);
                var tdJogadorPais = document.createElement("td");
                var jogadorPaisText = document.createTextNode(equipas[i].jogadores[k].pais);
                tdJogadorPais.appendChild(jogadorPaisText);
                var tdJogadorPosicao = document.createElement("td");
                var jogadorPosicaoText = document.createTextNode(equipas[i].jogadores[k].posicao);
                tdJogadorPosicao.appendChild(jogadorPosicaoText);
                var tdJogadorAltura = document.createElement("td");
                var jogadorAlturaText = document.createTextNode(equipas[i].jogadores[k].altura.toString());
                tdJogadorAltura.appendChild(jogadorAlturaText);
                var tdJogadorIdade = document.createElement("td");
                var jogadorIdadeText = document.createTextNode(getAge(equipas[i].jogadores[k].dataNascimento));
                tdJogadorIdade.appendChild(jogadorIdadeText);
                var tdJogadorId = document.createElement("td");
                var jogadorIdText = document.createTextNode(equipas[i].jogadores[k].id);
                tdJogadorId.appendChild(jogadorIdText);
                tdJogadorId.style.display = "none";
                
                $(jogadorLink).click(function(){ 
                    
                    personalPage("jogador",this.parentElement.parentElement.cells[6].firstChild.textContent);
                    
                   
                    
                     return false; });
                trJogador.appendChild(tdJogadorCheck);
                trJogador.appendChild(tdJogadorNome);
                trJogador.appendChild(tdJogadorPais);
                trJogador.appendChild(tdJogadorPosicao);
                trJogador.appendChild(tdJogadorAltura);
                trJogador.appendChild(tdJogadorIdade);
                trJogador.appendChild(tdJogadorId);

                tableBody.appendChild(trJogador);
                idJogadoresTabela.push(parseInt(jogadorIdText.textContent));
                
               }
        }
    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    var btnAdd = document.createElement("BUTTON");
    btnAdd.appendChild(document.createTextNode("Adicionar"));
    btnAdd.addEventListener("click", adicionarJogadorPage);

    var btnEdit = document.createElement("BUTTON");
    btnEdit.appendChild(document.createTextNode("Edit"));
    btnEdit.addEventListener("click", function(){
        var contador = 0;
        var tableBody = document.getElementById("tableBody");
        for (var i = 0, row; row = tableBody.rows[i]; i++) {
            
            if (row.cells[0].firstChild.checked){
                contador ++;
            }
        }

        if(contador === 0){
            document.getElementById("errosDiv").textContent = "Selecione um jogador para editar!";
        }else if (contador === 1 ){
             for (var i = 0, row; row = tableBody.rows[i]; i++) {
            
            if (row.cells[0].firstChild.checked){
                var jogadorId = eval(row.cells[6].firstChild.textContent);
                var jogadorNome = "", jogadorPais = "",jogadorPosicao = "", jogadorAltura = "", jogadorDataNascimento  ="";
            loop1 :
            for(var l = 0 ; l < equipas.length;l++){
              for(var k = 0; k < equipas[l].jogadores.length;k++){
                  if (equipas[l].jogadores[k].id === jogadorId){
                      jogadorNome = equipas[l].jogadores[k].nome;
                      jogadorPais = equipas[l].jogadores[k].pais;
                      jogadorPosicao = equipas[l].jogadores[k].posicao;
                      jogadorAltura = equipas[l].jogadores[k].altura;
                      jogadorDataNascimento = equipas[l].jogadores[k].dataNascimento;
                      break loop1 ;
                    }
                }       
            }

            adicionarJogadorPage(jogadorNome,jogadorPais,jogadorPosicao,jogadorAltura,jogadorDataNascimento,jogadorId);

}}}else {
    document.getElementById("errosDiv").textContent = "Selecione apenas um jogador para editar!";
}

    });

    var btnRemove = document.createElement("BUTTON");
    btnRemove.appendChild(document.createTextNode("Remover"));
    btnRemove.addEventListener("click", function(){

        var tableBody = document.getElementById("tableBody");
        for (var i = 0, row; row = tableBody.rows[i]; i++) {
            
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
    
       if (row.cells[0].firstChild.checked){
           var jogadorId = eval(row.cells[6].firstChild.textContent);
         
              for(var k = 0; k <equipas[0].jogadores.length;k++){
                  if (equipas[0].jogadores[k].id === jogadorId){
                      equipas[0].jogadores.splice(k,1);
                      document.getElementById("table").deleteRow(i + 1);
                      i--;
                  }
              }

       }
}

    });
    
    deleteInfo();
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(table);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(errosDiv);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(btnAdd);
    document.getElementById("informacao").appendChild(btnEdit);
    document.getElementById("informacao").appendChild(btnRemove);

}

function deleteInfo(){
    var div = document.getElementById('informacao');

    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

}

function adicionarJogadorPage(nome,pais,posicao,altura,dataNascimento,id){
   

    var form = document.createElement("FORM");
    var errosDiv = document.createElement("DIV");
    errosDiv.id = "errosDiv";

    var inputNome = document.createElement("INPUT");
    inputNome.setAttribute("type", "text");
    inputNome.id = "inputNome";
    inputNome.placeholder = "Introduza o nome"
    if(typeof(nome) === 'string'){
        inputNome.value = nome || "";
    }
   
    var labelNome = document.createElement("Label");
    labelNome.htmlFor ="inputNome";
    labelNome.innerHTML ="Nome:";    

    var inputDataNascimento = document.createElement("INPUT");
    inputDataNascimento.setAttribute("type", "text");
    inputDataNascimento.id = "inputDataNascimento";
    inputDataNascimento.placeholder = "dd/mm/aaaa";
    inputDataNascimento.value = dataNascimento || "";
    var labelDataNascimento = document.createElement("Label");
    labelDataNascimento.htmlFor ="inputDataNascimento";
    labelDataNascimento.innerHTML ="Data de Nascimento:";

    var selectPais = document.createElement("SELECT");
    selectPais.setAttribute("id", "selectPais");

    var labelPais = document.createElement("Label");
    labelPais.htmlFor ="selectPais";
    labelPais.innerHTML ="País:";

    for ( var i =  0; i < paises.length;i++){
    var option = document.createElement("option");
    option.setAttribute("value", "option");
    option.appendChild(document.createTextNode(paises[i]));
    selectPais.appendChild(option);
}

    for ( var i =  0; i < selectPais.options.length;i++){
     if ( selectPais.options[i].text === pais ) {
      
        selectPais.options[i].selected = true;
        break;
        }
    }

    var selectPosicao = document.createElement("SELECT");
    selectPosicao.setAttribute("id", "selectPosicao");

    var labelPosicao = document.createElement("Label");
    labelPosicao.htmlFor ="selectPosicao";
    labelPosicao.innerHTML ="Posição:";

    for ( var i =  0; i < posicoes.length;i++){
    var option = document.createElement("option");
    option.setAttribute("value", "option");
    option.appendChild(document.createTextNode(posicoes[i]));
    selectPosicao.appendChild(option);
}


    for ( var i =  0; i < selectPosicao.options.length;i++){
     if ( selectPosicao.options[i].text == posicao ) {
      
        selectPosicao.options[i].selected = true;
        break;
        }
    }

    var inputAltura = document.createElement("INPUT");
    inputAltura.setAttribute("type", "text");
    inputAltura.id = "inputAltura";
    inputAltura.placeholder = "0.00";
    inputAltura.value = altura || "";
    var labelAltura = document.createElement("Label");
    labelAltura.htmlFor ="inputNome";
    labelAltura.innerHTML ="Altura:";    


    deleteInfo();
    
    form.appendChild(labelNome);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputNome);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));
    
    form.appendChild(labelDataNascimento);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputDataNascimento);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));
    
    form.appendChild(labelPais);
    form.appendChild(document.createElement("BR"));
    form.appendChild(selectPais);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));
    
    form.appendChild(labelPosicao);
    form.appendChild(document.createElement("BR"));
    form.appendChild(selectPosicao);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));
    
    form.appendChild(labelAltura);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputAltura);
    
    

    document.getElementById("informacao").appendChild(form);
    document.getElementById("informacao").appendChild(errosDiv);
    var btnAdd = document.createElement("BUTTON");
    btnAdd.appendChild(document.createTextNode("Concluir"));
    btnAdd.addEventListener("click", function(){
        if(errosJogadores(document.getElementById("inputNome").value,getSelectedText("selectPais"),getSelectedText("selectPosicao"),document.getElementById("inputAltura").value,document.getElementById("inputDataNascimento").value)){
            if (id === void 0){
            equipas[0].jogadores.push(new Jogador(document.getElementById("inputNome").value,getSelectedText("selectPais"),getSelectedText("selectPosicao"),document.getElementById("inputAltura").value,document.getElementById("inputDataNascimento").value))
            contadorJogadores ++;
            }else {
                
                for(var l = 0 ; l < equipas.length;l++){
                    for(var k = 0; k < equipas[l].jogadores.length;k++){
                        if (equipas[l].jogadores[k].id === id){
                        
                       equipas[l].jogadores[k].nome = document.getElementById("inputNome").value;
                       equipas[l].jogadores[k].altura = document.getElementById("inputAltura").value;
                       equipas[l].jogadores[k].dataNascimento = document.getElementById("inputDataNascimento").value;
                       equipas[l].jogadores[k].posicao= getSelectedText("selectPosicao");
                       equipas[l].jogadores[k].pais = getSelectedText("selectPais");
                    }
                }       
            }

        }
        
            mostrarJogadores();
     }
    });
    document.getElementById("informacao").appendChild(document.createElement("BR"));
    document.getElementById("informacao").appendChild(btnAdd);
}

function errosJogadores(nome,pais,posicao,altura,dataNascimento){

if(nome === void 0 || !isNaN(nome) || nome === ""){
    
    document.getElementById("errosDiv").textContent = "Insira um nome válido";
    return false;
}else if (altura === void 0 || isNaN(altura) || altura === ""){
    document.getElementById("errosDiv").textContent = "Insira uma altura válida";
    return false;
}else if (dataNascimento === void 0 || !isNaN(dataNascimento) || dataNascimento === "" || !moment(dataNascimento, "DD/MM/YYYY", true).isValid()){
     document.getElementById("errosDiv").textContent = "Insira uma data de nascimento válida (DD/MM/AAAA)";
     return false;
}


 return true;
}

//Get the text from a element with the given ID
function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}


function getAge(dateString) {
    return moment().diff(moment(dateString, "DD/MM/YYYY", true), 'years')
}

function mostrarHomePage(){
    deleteInfo();

}

function mostrarEquipas(){
    var br = document.createElement("BR");

    var errosDiv = document.createElement("DIV");
    errosDiv.id = "errosDiv";

    var table = document.createElement("TABLE");
    table.id = "table";

    var tableHead = document.createElement("THEAD");
    var tableBody = document.createElement("TBODY");
    tableBody.id = "tableBody";
    var trHead = document.createElement("TR");
    
    var tdCheck = document.createElement("TD");
    

    var tdNome = document.createElement("TD");
    var nomeText = document.createTextNode('Nome');
    tdNome.appendChild(nomeText);

    var tdAcronimo = document.createElement("TD");
    var AcronimoText = document.createTextNode('Acrónimo');
    tdAcronimo.appendChild(AcronimoText);

    var tdURL= document.createElement("TD");
    var URLText = document.createTextNode('URL');
    tdURL.appendChild(URLText);

    var tdPais = document.createElement("TD");
    var paisText = document.createTextNode('País');
    tdPais.appendChild(paisText);

    var tdValido = document.createElement("TD");
    var validoText = document.createTextNode('Válido');
    tdValido.appendChild(validoText);

    trHead.appendChild(tdCheck);
    trHead.appendChild(tdNome);
    trHead.appendChild(tdAcronimo);
    trHead.appendChild(tdURL);
    trHead.appendChild(tdPais);
    trHead.appendChild(tdValido);

    tableHead.appendChild(trHead);


     for(var i = 1 ; i< equipas.length;i ++){

        var trEquipa = document.createElement("TR");
        var tdEquipaCheck = document.createElement("td");
        var tdEquipaCheckBox = document.createElement("input");
        tdEquipaCheckBox.type = "checkbox";
        tdEquipaCheck.appendChild(tdEquipaCheckBox);
        var tdEquipaNome = document.createElement("td");
        var equipaNomeText = document.createTextNode(equipas[i].nome);
        tdEquipaNome.appendChild(equipaNomeText);

        var tdEquipaAcronimo = document.createElement("td");
        var equipaAcronimoText = document.createTextNode(equipas[i].acronimo);
        tdEquipaAcronimo.appendChild(equipaAcronimoText);

        var tdEquipaURL = document.createElement("td");
        var equipaURLText = document.createTextNode(equipas[i].url);
        tdEquipaURL.appendChild(equipaURLText);

        var tdEquipaPais = document.createElement("td");
        var equipaPaisText = document.createTextNode(equipas[i].pais);
        tdEquipaPais.appendChild(equipaPaisText);

        var tdEquipaValido = document.createElement("td");
        var equipaValidoText = document.createTextNode(isTeamValid(equipas[i].jogadores));
        tdEquipaValido.appendChild(equipaValidoText);

        var tdEquipaId = document.createElement("td");
        var equipaIdText = document.createTextNode(equipas[i].id);
        tdEquipaId.appendChild(equipaIdText);
        tdEquipaId.style.display = "none";
        
        trEquipa.appendChild(tdEquipaCheck);
        trEquipa.appendChild(tdEquipaNome);
        trEquipa.appendChild(tdEquipaAcronimo);
        trEquipa.appendChild(tdEquipaURL);
        trEquipa.appendChild(tdEquipaPais);
        trEquipa.appendChild(tdEquipaValido);
        trEquipa.appendChild(tdEquipaId);

        tableBody.appendChild(trEquipa);

     }

    table.appendChild(tableHead);
    table.appendChild(tableBody);


        var btnAdd = document.createElement("BUTTON");
    btnAdd.appendChild(document.createTextNode("Adicionar"));
    btnAdd.addEventListener("click", adicionarEquipaPage);

    var btnEdit = document.createElement("BUTTON");
    btnEdit.appendChild(document.createTextNode("Edit"));
    btnEdit.addEventListener("click", function(){
        var contador = 0;
        var tableBody = document.getElementById("tableBody");
        for (var i = 0, row; row = tableBody.rows[i]; i++) {
            
            if (row.cells[0].firstChild.checked){
                contador ++;
            }
        }

        if(contador === 0){
            document.getElementById("errosDiv").textContent = "Selecione uma equipa para editar!";
            }else if (contador === 1 ){
                for (var i = 0, row; row = tableBody.rows[i]; i++) {
            
                    if (row.cells[0].firstChild.checked){
                        var equipaId = eval(row.cells[6].firstChild.textContent);
                        var equipaNome = "", equipaAcronimo = "", equipaPais ="", equipaWebsite = "", equipaDescricao = "";
                        for(var l = 0 ; l < equipas.length;l++){
                            if(equipas[l].id === equipaId){
                                equipaNome = equipas[l].nome;
                                equipaAcronimo = equipas[l].acronimo;
                                equipaPais = equipas[l].pais;
                                equipaWebsite = equipas[l].url;
                                equipaDescricao = equipas[l].descricao;
                                break;
                            }

                        }
                        adicionarEquipaPage(equipaNome,equipaAcronimo,equipaPais,equipaWebsite,equipaDescricao,equipaId);
                }
                }

            }else{
                document.getElementById("errosDiv").textContent = "Selecione apenas uma equipa para editar!";
            }
    });

    var btnRemove = document.createElement("BUTTON");
    btnRemove.appendChild(document.createTextNode("Remover"));
    btnRemove.addEventListener("click", function(){

        var tableBody = document.getElementById("tableBody");
        for (var i = 0, row; row = tableBody.rows[i]; i++) {
        var isCompeting = false;    
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
    
       if (row.cells[0].firstChild.checked){
           var equipaId = eval(row.cells[6].firstChild.textContent);
         
              for(var k = 0; k <competicoes.length;k++){
                  if (competicoes[k].id === equipaId){
                    isCompeting = true;
                  }
              }
        if(isCompeting){
           document.getElementById("errosDiv").textContent = "Nao pode eleminar uma equipa que está numa competiçao";
           break;
        }else {
            for(var k = 1; k <equipas.length;k++){
                var equipaId = eval(row.cells[6].firstChild.textContent);
                var isInTeam = false;
                if (equipaId === equipas[k].id){
                    equipas[k].jogadores.forEach(function(jogador) {
                        for (var l = 1; l <equipas.length;l++){

                            if (! (equipaId === equipas[l].id)){
                                
                                for (var m = 0; m <equipas[l].jogadores.length;m++){
                                    if(jogador.id === equipas[l].jogadores[m].id){
                                        isInTeam = true;
                                    }
                                }
                            }
                        }
                        if(!isInTeam){
                            equipas[0].jogadores.push(jogador);
                        }
                        
                    }, this);
                    equipas.splice(k,1);
                    document.getElementById("table").deleteRow(i + 1);
                    i--;
                
            }
        }
       }

    }

}

    });

    deleteInfo();
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(table);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(errosDiv);
    document.getElementById("informacao").appendChild(br);
    document.getElementById("informacao").appendChild(btnAdd);
    document.getElementById("informacao").appendChild(btnEdit);
    document.getElementById("informacao").appendChild(btnRemove);

}

function isTeamValid(jogadores){
    var contadorGR, contadorDF, contadorMC, contadorAV = 0;

    jogadores.forEach(function(jogador) {
        if(jogador.posicao === "GR"){
            contadorGR += 1;
        }else if (jogador.posicao === "DF"){
            contadorDF += 1;
        }else if (jogador.posicao === "MC"){
            contadorMC += 1;
        }else if (jogador.posicao === "AV"){
            contadorAV += 1;
        }
    }, this);


    if( contadorGR >= 1 && contadorDF >= 4 && contadorMC >= 4 && contadorAV >= 2){
        return "Sim";
    }else 
    return "Nao";
}


function adicionarEquipaPage(nome,acronimo,pais,website,descricao,id){
    var form = document.createElement("FORM");
    var errosDiv = document.createElement("DIV");
    errosDiv.id = "errosDiv";

    var inputNome = document.createElement("INPUT");
    inputNome.setAttribute("type", "text");
    inputNome.id = "inputNome";
    inputNome.placeholder = "Introduza o nome"
    if(typeof(nome) === 'string'){
        inputNome.value = nome || "";
    }

    var labelNome = document.createElement("Label");
    labelNome.htmlFor ="inputNome";
    labelNome.innerHTML ="Nome :";    

    var inputAcronimo = document.createElement("INPUT");
    inputAcronimo.setAttribute("type", "text");
    inputAcronimo.id = "inputAcronimo";
    inputAcronimo.placeholder = "Introduza o acrónimo";
    inputAcronimo.value = acronimo || "";
    var labelAcronimo = document.createElement("Label");
    labelAcronimo.htmlFor ="inputAcronimo";
    labelAcronimo.innerHTML ="Acrónimo :";


    var selectPais = document.createElement("SELECT");
    selectPais.setAttribute("id", "selectPais");

    var labelPais = document.createElement("Label");
    labelPais.htmlFor ="selectPais";
    labelPais.innerHTML ="País :";

    for ( var i =  0; i < paises.length;i++){
    var option = document.createElement("option");
    option.setAttribute("value", "option");
    option.appendChild(document.createTextNode(paises[i]));
    selectPais.appendChild(option);
}

    for ( var i =  0; i < selectPais.options.length;i++){
     if ( selectPais.options[i].text === pais ) {
      
        selectPais.options[i].selected = true;
        break;
        }
    }



    var inputWebsite = document.createElement("INPUT");
    inputWebsite.setAttribute("type", "text");
    inputWebsite.id = "inputWebsite";
    inputWebsite.placeholder = "http://...";
    inputWebsite.value = website || "";
    var labelWebsite = document.createElement("Label");
    labelWebsite.htmlFor ="inputWebsite";
    labelWebsite.innerHTML ="Website :";

    var textAreaDescricao = document.createElement("TEXTAREA");
    textAreaDescricao.setAttribute("type", "text");
    textAreaDescricao.id = "textAreaDescricao";
    textAreaDescricao.value = descricao || "";
    textAreaDescricao.rows = 5;
    var labelDescricao = document.createElement("Label");
    labelDescricao.htmlFor ="textAreaDescricao";
    labelDescricao.innerHTML ="Descricao :";



    deleteInfo();
    
    form.appendChild(labelNome);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputNome);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));

    form.appendChild(labelAcronimo);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputAcronimo);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));

    form.appendChild(labelPais);
    form.appendChild(document.createElement("BR"));
    form.appendChild(selectPais);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));

    form.appendChild(labelWebsite);
    form.appendChild(document.createElement("BR"));
    form.appendChild(inputWebsite);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));

    form.appendChild(labelDescricao);
    form.appendChild(document.createElement("BR"));
    form.appendChild(textAreaDescricao);
    form.appendChild(document.createElement("BR"));
    form.appendChild(document.createElement("BR"));

    document.getElementById("informacao").appendChild(form);
    document.getElementById("informacao").appendChild(errosDiv);

    var btnAdd = document.createElement("BUTTON");
    btnAdd.appendChild(document.createTextNode("Concluir"));
    btnAdd.addEventListener("click", function(){
        if(errosEquipas(document.getElementById("inputNome").value,document.getElementById("inputAcronimo").value,document.getElementById("inputWebsite").value)){
            if (id === void 0){
                equipas.push(new Equipa(document.getElementById("inputNome").value,document.getElementById("inputAcronimo").value,document.getElementById("inputWebsite").value,getSelectedText("selectPais"),document.getElementById("textAreaDescricao").value));
            }else{
                for(var l = 0 ; l < equipas.length;l++){
                    if (equipas[l].id === id){
                        equipas[l].nome = document.getElementById("inputNome").value;
                        equipas[l].acronimo = document.getElementById("inputAcronimo").value;
                        equipas[l].pais = getSelectedText("selectPais");
                        equipas[l].website = document.getElementById("inputWebsite").value;
                        equipas[l].descricao = document.getElementById("textAreaDescricao").value;
                    }
                }
            }
            mostrarEquipas();
     }
    });

    var btnCancelar = document.createElement("BUTTON");
    btnCancelar.appendChild(document.createTextNode("Cancelar"));
    btnCancelar.addEventListener("click", function(){
        
            mostrarEquipas();
     
    });
    document.getElementById("informacao").appendChild(document.createElement("BR"));
    document.getElementById("informacao").appendChild(btnAdd);
    document.getElementById("informacao").appendChild(btnCancelar);
}


function errosEquipas(nome,acronimo,website){

if(nome === void 0 || !isNaN(nome) || nome === ""){
    
    document.getElementById("errosDiv").textContent = "Insira um nome válido";
    return false;
}else if (acronimo === void 0 || !isNaN(acronimo) || acronimo === ""){
    document.getElementById("errosDiv").textContent = "Insira um acronimo válido";
    return false;
}else if (website === void 0 || !isNaN(website) || website === ""){
     document.getElementById("errosDiv").textContent = "Insira um website válido";
     return false;
}

 return true;


}

function personalPage(tipo,id){
    var image = document.createElement("IMG");
    image.id = "personalImage";
    var divAll = document.createElement("DIV");
    divAll.id = "divAll";
    deleteInfo();

    if(tipo.toString() == "jogador"){

        var divInfo = document.createElement("DIV");
        divInfo.id = "divInfo";
        image.src = "..\\images\\defaultPic.jpg";
        
        
        loop1 :
        for(var i = 0 ; i<equipas.length;i++){
            
            for(var k = 0; k<equipas[i].jogadores.length;k++){

                if(equipas[i].jogadores[k].id  === parseInt(id)){
                    
                    var nome = document.createElement("P");
                    var textNome = document.createTextNode("Nome : " + equipas[i].jogadores[k].nome);
                    nome.appendChild(textNome);
                    var pais = document.createElement("P");
                    var textPais = document.createTextNode("País : " + equipas[i].jogadores[k].pais);
                    pais.appendChild(textPais);
                    var altura = document.createElement("P");
                    var textAltura = document.createTextNode("Altura : " + equipas[i].jogadores[k].altura);
                    altura.appendChild(textAltura);
                    var dataNascimento =  document.createElement("P");
                    var textDataNascimento = document.createTextNode("Altura : " + equipas[i].jogadores[k].dataNascimento);
                    dataNascimento.appendChild(textDataNascimento);

                    var equipasParagraph = document.createElement("P");
                    var equipasText = document.createTextNode("Equipas : ");
                    var textoParaEquipas = "";

                     for(var m = 0 ; m<equipas.length;m++){
                        for(var n = 0; n<equipas[m].jogadores.length;n++){
                            if(equipas[m].jogadores[n].id === parseInt(id)){

                                textoParaEquipas +=  equipas[m].nome + ", ";


                            }
                        }
        }

                   
                    equipasText.textContent += textoParaEquipas.slice(0,textoParaEquipas.length-2);
                    divInfo.appendChild(nome);
                    divInfo.appendChild(pais);
                    divInfo.appendChild(altura);
                    equipasParagraph.appendChild(equipasText);
                    divInfo.appendChild(dataNascimento);
                    divInfo.appendChild(equipasParagraph);
                    break loop1;
                }
            }
        }

       
        divAll.appendChild(image);
        divAll.appendChild(divInfo);
        document.getElementById("informacao").appendChild(divAll);
       
    }

}