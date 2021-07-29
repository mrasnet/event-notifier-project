/*

*/
//Apesar de definido via lógica e CSS, o seguinte código necessita ser executado para a janela conseguir abrir ao adicionar o primeiro alarme
document.getElementById("asideOptions").style.width='200px';
document.getElementById("asideOptions").style.width='0px';
/*
document.addEventListener('DOMContentLoaded', function(){
    if(!Notification){
        console.log('Desktop notifications not available in your browser. Try Chrome');
        return;
    }
    if(Notification.permission !== "granted")
        Notification.requestPermission();
});
*/
var alarmList = [];
var alarmedList = [];

function formataHora(d){
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let txt;

    if(h<10)
        txt = '0'+h+':';
    else
        txt = h+':';

    if(m<10)    
        txt += '0'+m+':';
    else
        txt += m+':';

    if(s<10)    
        txt += '0'+s;
    else
        txt += s;
    
    return txt;
}

function exibirHora(){
    let d = new Date();
    let horaAtual = formataHora(d);
      
    document.getElementById('clock').innerHTML = horaAtual;
    despertar(horaAtual);
}


function despertar(horaAtual){
    let horaMinuto = horaAtual.substr(0,5);
    
    for(let i in alarmList){
        //console.log("objeto do array: ",alarmList[i]);

        if( horaMinuto == alarmList[i].time){
            //console.log("Title: ", alarmList[i].title);
            //console.log("Time: ", alarmList[i].time);
            //clearInterval(timer);
           
            console.log("Acorda Vagabundo!!!");
            alarmedList.push(alarmList[i]);
            alarmList.splice(i,1); 

         
            //Aparentimente só funciona em servidores com HTTPS
            /*
            var notification = new Notification("Alarme settled", {
                    icon: 'clock.ico',
                    body: alarmedList[i].time+" - "+alarmedList[i].title
            });
            */

            if(document.getElementById('asideOptions').style.width == '0px'){
                menuOpener();//vai abrir o menu
               
                if(document.getElementById('alarmedListDisplay').style.height == '0px'){
                    
                    alarmedListDisplayOpener();
                    setTimeout(alarmedListDisplayOpener,4500);
                }
                if(document.getElementById('alarmListDisplay').style.height == '0px'){
                    alarmListDisplayOpener();
                    setTimeout(alarmListDisplayOpener,3500);
                }
                
                setTimeout(menuOpener,5000);//como o menu já tá aberto, aqui irá fecha-lo
    
            }else{
                if(document.getElementById('alarmedListDisplay').style.height == '0px'){
                    alarmedListDisplayOpener();
                    setTimeout(alarmedListDisplayOpener,4500);
                }
                if(document.getElementById('alarmListDisplay').style.height == '0px'){
                    alarmListDisplayOpener();
                    setTimeout(alarmListDisplayOpener,3500);
                    
                }
            }
            alarmListDisplay();
            alarmedListDisplay();

            document.getElementById('alarmedListDisplay').scrollTo({ 
                top: 100000,
                behavior: 'smooth'
            });
        }    
    }              
}

let timer; 

function startAlarm(){

    var AlarmObj = {
        time: "00:00",
        title: "title"
    }
    //console.log("titulo: ",alarmTitle.value);
    //console.log("hora: ",alarmInput.value);
    
    if(alarmInput.value.length!= 0 && alarmTitle.value.length!=0){
        AlarmObj.title = document.getElementById('alarmTitle').value;
        //console.log(AlarmObj.title);
        AlarmObj.time = document.getElementById('alarmInput').value;
        //console.log(AlarmObj.time);

        alarmList.push(AlarmObj);
        console.log(alarmList);

        timer = setInterval(exibirHora, 1000);
        document.getElementById('alarmTitle').value = '';
        document.getElementById('alarmInput').value = '';

        if(document.getElementById('asideOptions').style.width == '0px'){
            menuOpener();//vai abrir o menu
           
            if(document.getElementById('alarmListDisplay').style.height == '0px'){
                alarmListDisplayOpener();
                setTimeout(alarmListDisplayOpener,4500);
            }
            
            setTimeout(menuOpener,5000);//como o menu já tá aberto, aqui irá fecha-lo

        }else{
            if(document.getElementById('alarmListDisplay').style.height == '0px'){
                alarmListDisplayOpener();
                setTimeout(alarmListDisplayOpener,4500);
            }
        }
        alarmListDisplay();
        document.getElementById('alarmListDisplay').scrollTo({ /* Aqui utilizamos um objeto para passar as propriedades */
            top: 100000,
            /* left: 0,         - poderiamos passar também a posição do scrollbar horizontal caso esse existisse */
            behavior: 'smooth' //'smooth'   - irá deslizar suavemente a barra de rolagem    - Padrão: auto
        });

        //alarmAddedffect();

    }else
        alert("É necessário definir um horário de alarme mais seu título!");
}

/*
function alarmAddedffect(){
    document.getElementById('objArea').style.backgroundColor = '#1fbb70';
    document.getElementById('objArea').style.color = '#ffcd42';
    document.getElementById('green').style.color = '#eee';
    alarmListDisplay();
    alarmedListDisplay();
    setTimeout(resetProperties,3000);
    alarmListDisplay();
    alarmedListDisplay();
}
function resetProperties(){
    document.getElementById('objArea').style.backgroundColor = '#555';
    document.getElementById('objArea').style.color = '#eee';
    document.getElementById('green').style.color = '#1fbb70';
}
*/

function cancelAlarm(){
    clearInterval(timer);
}

function menuOpener(){
    let asideOptions = document.getElementById("asideOptions");

    if(asideOptions.style.width=='400px'){
        asideOptions.style.width='0px';
    }  
    else{
        asideOptions.style.width='400px';
    }       
}
function alarmListDisplayOpener(){
    let alarmListDisplay = document.getElementById('alarmListDisplay');

    if(alarmList.length > 0){
        if(alarmListDisplay.style.height == '0px'){
            alarmListDisplay.style.height = 'fit-content';
        }else{
            alarmListDisplay.style.height = '0px';
        }
    }
}
function alarmedListDisplayOpener(){
    let alarmedListDisplay = document.getElementById('alarmedListDisplay');

    if(alarmedList.length > 0){
        if(alarmedListDisplay.style.height == '0px'){
            alarmedListDisplay.style.height = 'fit-content';
        }else{
            alarmedListDisplay.style.height = '0px';
        }
    }
}

function alarmListDisplay(){
    let alarmListDisplay = document.getElementById('alarmListDisplay');
    alarmListDisplay.innerHTML = "";
 
    for(let i=0;  i < alarmList.length ; i++){
        alarmListDisplay.innerHTML += 
            "<div class='alarmContent'>"
                +"<div class='objArea'>"
                    +"<div class='displayArea'>"
                        +"<div class='label'>Time Settled:</div>"
                        +"<div id='green' class='verde'>"+alarmList[i].time+"</div>"
                    +"</div>"
                    
                    +"<div class='displayArea'>"
                        +"<div class='label'>Title:</div>"
                        +"<div id='green' class='verde'>"+alarmList[i].title+"</div>"
                    +"</div>"
                +"</div>"

                +"<div onclick='alarmDelete("+i+")' class='deleteAlarmButton'> <div class='square'> X </div> </div>"
            +"</div>";
    }

    if(alarmList.length > 0){
        document.getElementById('alarmListLength').style.display = 'block';
        document.getElementById('alarmListLength').innerHTML =  alarmList.length;
    }else{
        document.getElementById('alarmListLength').innerHTML =  0;
    }
       
}
function alarmedListDisplay(){
    let alarmedListDisplay = document.getElementById('alarmedListDisplay');
    alarmedListDisplay.innerHTML = '';

    for(let i in alarmedList){
        alarmedListDisplay.innerHTML += 
            "<div class='alarmContent'>"
                +"<div class='objArea'>"
                    +"<div class='displayArea'>"
                        +"<div class='label'>Time Settled:</div>"
                        +"<div id='red' class='vermelho'>"+alarmedList[i].time+"</div>"
                    +"</div>"
                    
                    +"<div class='displayArea'>"
                        +"<div class='label'>Title:</div>"
                        +"<div id='red'class='vermelho'>"+alarmedList[i].title+"</div>"
                    +"</div>"
                +"</div>"

                +"<div onclick='alarmedDelete("+i+")' class='deleteAlarmButton'> <div class='square'> X </div> </div>"
            +"</div>";
    }

    if(alarmedList.length > 0){
        document.getElementById('alarmedListLength').style.display = 'block';
        document.getElementById('alarmedListLength').innerHTML = alarmedList.length; 
        
    }else{
        document.getElementById('alarmedListLength').innerHTML = 0;
    }
}

function alarmDelete(i){
    alarmList.splice(i,1);
    alarmListDisplay();
}
function alarmedDelete(i){
    alarmedList.splice(i,1);
    alarmedListDisplay();
}
function clearAlarmedList(){
    alarmedList = [];
    alarmedListDisplay();
}

function openFullDisplay(){
    document.getElementById('openFullDisplay').style.display = 'flex';
    menuOpener();
}
function closeFullDisplay(){
    document.getElementById('openFullDisplay').style.display = 'none';
}