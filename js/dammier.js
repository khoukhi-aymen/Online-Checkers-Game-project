

/**
 * Globals
 *
 * @type {number}
 */
 var max_col = 10;
 var max_l = 10;
 var player_name1 = "";
 var player_name2 = "";
 var score_black = 0;
 var score_white = 0;
 var pNoire = "pion-noire";
 var pBlanc = "pion-blanc";
 var cNoire = "case-noire";
 var cBlanc = "case-blanc";


 function envoi(){
    var elements = document.querySelectorAll('.'+pBlanc+', .'+pNoire);
    var mat = {
   'blanc':[],
   'noir':[]
   };    
   for (var i = 0; i < elements.length; i++) {
       if(elements[i].className==pBlanc){
           mat['blanc'].push(elements[i].parentNode.getAttribute("posx")+"-"+ elements[i].parentNode.getAttribute("posy"));
       }
       else{
           mat['noir'].push(elements[i].parentNode.getAttribute("posx")+"-"+  elements[i].parentNode.getAttribute("posy"));  
       }
   }
   var text = JSON.stringify(mat);  
   console.log(text);
   var frm = document.getElementById("infodamme");
   var hid = document.getElementById("hidden");
   hid.setAttribute("value",text);
   this.preventDefault;
   frm.submit();
   }  
 
 function initialisation_eventListener(el){
     el.addEventListener('dragenter', function() {
     });
 
     el.addEventListener('dragleave', function() {
     });
 
 
     el.addEventListener('drop', function(e) {
 
         var target = e.target,
             draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
             clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément
 
         target.className = 'dropper'; // Application du style par défaut
 
         clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
         dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()
 
         draggedElement.removeChild(draggedElement); // Suppression de l'élément d'origine
 
 
 
         e.preventDefault(); // Cette méthode est toujours nécessaire pour éviter une éventuelle redirection inattendue
         if (this.length){
             console.log('Il y a qqchose ici !');
             // Rien faire si la case contient un pion(todo: vérifier règle échec
         }else{
             console.log('it is empty Indeed !');
             // Vérifier que le déplacement est correcte depuis origin !
         }
         alert('Vous avez bien déposé votre élément !');
     });
     el.addEventListener('dragover', function(e) {
         e.preventDefault(); // Annule l'interdiction de drop
     });
 }
 
 
 /**
  * Vérification si il y a la cell possède un pion retourn un bool !
  * @param id
  * @returns {boolean}
  */
 function cellHaspawn(id){
     var cell = document.getElementById(id);
 
     if (cell.hasChildNodes()){
         return true;
     }else{
         return false;
     }
 
 }
 /**
  * Pareil que pawnColor mais avec le pion en paramètre
  * @param pawn
  * @returns {string|string|string|string}
  */
 function pawnColorByEl(pawn){
     return pawn.className;
 
 }
 /**
  * Check what color the pawn is given the cell it is contained into
  * @param idCell
  * @returns {string|string|string|string}
  */
 function pawnColor(idCell){
     var cell = document.getElementById(idCell);
     if (cell.hasChildNodes()){
        return cell.childNodes[0].className;
     }else{
         console.log('error returning color of pawn');
     }
 }
 /**
  *  Eat the pawn with the element Cell given
  * @param idCell
  */
 function eatPawn(idCell){
     var cell = document.getElementById(idCell);
     if (cell.hasChildNodes()){
         if(pawnColorByEl(cell.childNodes[0]) == "pion-noire"){
             score_white++;
         }else{
             score_black++;
         }
         cell.removeChild(cell.childNodes[0]);
     }else{
         console.log('error removing pawn');
     }
 }
 
 function deplacement_dame(target, pion_dame, origin_x, origin_y, target_x, target_y){
 
     // On descend
     if (target_x < origin_x){
         if(target_y < origin_y){ // On va à gauche
             while (target_y == origin_y && target_x == origin_x){
                 target_x++;
                 target_y--;
                 if (cellHaspawn(target_x +'-'+ target_y)){
                     deplacement_dame(target, pion_dame, origin_x, origin_y, target_x, target_y);
                 }
 
             }
         }else if (target_y > origin_y){ // On va à droite
 
         }
 
     }else if (target_x > origin_x){ // On monte
         if(target_y < origin_y){ // On va à gauche
 
         }else if (target_y > origin_y){ // On va à droite
 
         }
     }
 }
 
 /**
  * Handle les déplacements, vérifications couleurs noire / blanc,
  * @param target
  * @param draggedElement
  * @param clonedElement
  */
 function gestion_deplacement(target, draggedElement, clonedElement){
 
     origin_x = parseInt(draggedElement.parentNode.getAttribute('posx'));
     origin_y = parseInt(draggedElement.parentNode.getAttribute('posy'));
     target_x = parseInt(target.getAttribute('posx'));
     target_y = parseInt(target.getAttribute('posy'));
     var deplacement_valid = false;
     var queen = false;
     var colorEnnemi= "";
 
 
     /** Flag d'un pion arrive à la dernière ligne pour pouvoir se transformer en Dame **/
     if (draggedElement.className == pNoire){
         if (target_x == 1){
             queen = true;
         }
         colorEnnemi = pBlanc;
     }else if (draggedElement.className == pBlanc){
         if (target_x == max_l){
             queen = true;
         }
         colorEnnemi = pNoire;
     }
 
     if ( ( (target_y == (origin_y+1)) || (target_y == (origin_y-1)) ) && (target_x == (origin_x-1) ) && draggedElement.className == pNoire) {
         deplacement_valid =  true;
 
     }else if (((target_y == (origin_y+1)) || (target_y == origin_y-1)) && (target_x == (origin_x+1)  && draggedElement.className == pBlanc )) {
         deplacement_valid =  true;
     }
     else if ((target_x == (origin_x-2) ) ) {
         if (target_y == (origin_y+2)){
             if (cellHaspawn((origin_x-1)+'-'+(origin_y+1)) && pawnColor((origin_x-1)+'-'+(origin_y+1)) == colorEnnemi){
                 eatPawn((origin_x-1)+'-'+(origin_y+1));
                 deplacement_valid =  true;
             }
         }else if (target_y == (origin_y-2)){
             if (cellHaspawn((origin_x-1)+'-'+(origin_y-1)) && pawnColor((origin_x-1)+'-'+(origin_y-1)) == colorEnnemi){
                 eatPawn((origin_x-1)+'-'+(origin_y-1));
                 deplacement_valid =  true;
             }
         }
     }else if ( target_x == (origin_x+2) ) {
         if (target_y == (origin_y+2)){
             if (cellHaspawn((origin_x+1)+'-'+(origin_y+1)) && pawnColor((origin_x+1)+'-'+(origin_y+1)) == colorEnnemi){
                 eatPawn((origin_x+1)+'-'+(origin_y+1));
                 deplacement_valid =  true;
             }
         }else if (target_y == (origin_y-2)){
             if (cellHaspawn((origin_x+1)+'-'+(origin_y-1)) && pawnColor((origin_x+1)+'-'+(origin_y-1)) == colorEnnemi){
                 eatPawn((origin_x+1)+'-'+(origin_y-1));
                 deplacement_valid =  true;
             }
         }
     }else if(draggedElement.className == "dame-noire" || draggedElement.className == "dame.blanche"){
         return deplacement_dame(target,draggedElement, origin_x, origin_y, target_x, target_y);
     }
 
     if (deplacement_valid && queen){
         transformPawn(clonedElement);
     }
     return deplacement_valid;
 
 }
 
 function transformPawn(el){
     el.className =  (el.className == pNoire ? 'dame-noire' : 'dame-blanc');
 
 }
 /**
  * Initialisation du dammier, des cases, et des pions !
  * Permettre le changement de couleurs de case, et de couleur de pions ! Juste jouer avec les styles et classes css !
  */
 function initialisation_dammier() {
     var dammier = document.createElement("table");
 
     for (var i = 1; i <= max_l; i++) {
         var tr = document.createElement('tr');
         for (var j = 1; j <= max_col; j++) {
             var td = document.createElement('td');
             if (i % 2 == j % 2) {
                 td.classList.add(cBlanc);
                 td.setAttribute('posx', i);
                 td.setAttribute('posy', j);
                 td.setAttribute('id', i + '-' + j);
             } else {
 
 
                 td.classList.add(cNoire);
                 td.setAttribute('posx', i);
                 td.setAttribute('posy', j);
                 td.setAttribute('id', i + '-' + j);
                 //initialisation_eventListener(td);
 
                 if (i < 5){
                     var pion_blanc = document.createElement('div');
                     pion_blanc.setAttribute('draggable', true);
                     pion_blanc.classList.add(pBlanc);
                     td.appendChild(pion_blanc);
                 }else if (i > 6) {
                     var pion_noire = document.createElement('div');
                     pion_noire.classList.add(pNoire);
                     pion_noire.setAttribute('draggable', true);
                     td.appendChild(pion_noire);
                 }
             }
             tr.appendChild(td);
         }
         dammier.appendChild(tr);
     }
 
 
     document.body.appendChild(dammier);
 }
 
 var dndHandler = {
 
     draggedElement: null,
 
     applyDragEvents: function(element) {
 
         element.draggable = true;
 
         var dndHandler = this;
 
         element.addEventListener('dragstart', function(e) {
             this.parentNode.className = 'opaque';
             dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
             e.dataTransfer.setData('text/plain', '');
         });
 
     },
 
     applyDropEvents: function(dropper) {
 
         dropper.addEventListener('dragover', function(e) {
             e.preventDefault();
             this.className = cNoire +' opaque'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
         });
 
         dropper.addEventListener('dragleave', function() {
             this.className = cNoire; // On revient au style de base lorsque l'élément quitte la zone de drop
         });
 
         var dndHandler = this;
 
         dropper.addEventListener('drop', function(e) {
 
             var target = e.target,
                 draggedElement = dndHandler.draggedElement,
                 clonedElement = draggedElement.cloneNode(true);
 
             while (target.className.indexOf(cNoire) == -1) {
 
                 target = target.parentNode;
             }
 
             target.className = cNoire;
 
             if (!target.hasChildNodes()) {
                 if (gestion_deplacement(target, draggedElement, clonedElement)){
                     clonedElement = target.appendChild(clonedElement);
                     dndHandler.applyDragEvents(clonedElement);
                     draggedElement.parentNode.removeChild(draggedElement);
                     envoi();
                 }else{
                     console.log('Vous ne pouvez pas vous déplacer dans cette case');
                 }
 
             }
         });
 
     }
 
 };
 
 
 initialisation_dammier();
 var elements = document.querySelectorAll('.'+pBlanc+', .'+pNoire),
     elementsLen = elements.length;
 
 for (var i = 0; i < elementsLen; i++) {
     dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux éléments déplaçables
 }
 
 var droppers = document.querySelectorAll('.'+cNoire),
     droppersLen = droppers.length;
 
 for (var i = 0; i < droppersLen; i++) {
     dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
 }

envoi();

 var a = document.createElement('button');
a.setAttribute('id', 'send');
a.style.width ="100px";
a.style.height ="60px";
a.innerHTML ="QUITTER PARTIE";
a.addEventListener("click",function(){
location.href = "quitter.php";
})
document.body.appendChild(a);


function yourFunction(){

var mat = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    mat = xmlhttp.responseText;
      }
    };
    xmlhttp.open("GET","actualize.php",false);
    xmlhttp.send();    

var cases = document.getElementsByClassName(cNoire);
var matata = JSON.parse(mat); 
for (var i = 0; i < cases.length; i++){
if(matata["blanc"].includes(cases[i].getAttribute("id") )){
    if(cases[i].hasChildNodes()){
       if(cases[i].childNodes[0].getAttribute("class")==pNoire){
          cases[i].childNodes[0].setAttribute("class",pBlanc);

       }

       }
    else{
        
        var pp = document.createElement("div");
        pp.setAttribute("class",pBlanc);
        pp.setAttribute("draggable","true");
        cases[i].appendChild(pp);


    }

    }
    else{
    if(matata["noir"].includes(cases[i].getAttribute("id") )){
        if(cases[i].hasChildNodes()){
           if(cases[i].childNodes[0].getAttribute("class")==pBlanc){
              cases[i].childNodes[0].setAttribute("class",pNoire);
    
           }
    
           }
        else{
            
            var pp = document.createElement("div");
            pp.setAttribute("class",pNoire);
            pp.setAttribute("draggable","true");
            cases[i].appendChild(pp);
    
    
        }
    
        }
    else{
        cases[i].innerHTML="";

    }        
    }


}    

  

    setTimeout(yourFunction, 2000);
}

yourFunction();

