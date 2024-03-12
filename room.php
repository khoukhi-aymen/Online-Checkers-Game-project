<?php
require('actions/roomAction.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    td,table,th{
      border_collapse: collapse; 
      border: 1px solid black;
      border-spacing: 0px;
      background-color: aliceblue;
    }

    </style>
</head>
<body>
<form id="form_submit" method="POST" action="actions/waiting.php">

<table>
<tr><th>id</th>
<th>joueur1</th>
<th>joueur2</th>
<th>nbr joueurs</th>
<th>action</th></tr>   
  <?php
  $indexes = array('id','user1','user2','complet');
  for ($i=0; $i <5 ; $i++) { 
    echo '<tr>';
    for ($j=0; $j <5 ; $j++) { 
     if ($j != 4 ) {
      echo '<td>'.$room_info[$i][$indexes[$j]].'</td>';
     }
     if ($j==4) {
       echo "<td><button class='butbut' name=".($i + 1)." type='button'>Rejoindre</button></td>";
     }

    }
    echo '</tr>';
  }
echo $_SESSION['pseudo'];
  ?>
  <tr><td><input id="result" name="ret" type="hidden" value=""></td></tr>

  </table>  
</form>

<script> 

var res = document.getElementsByClassName('butbut');
console.log(res[0]['name']);
res[0].addEventListener('click',()=>{
  document.getElementById("result")["value"] = res[0]['name'];
  var b = document.getElementById("form_submit");
  b.submit();
})

console.log(res[1]['name']);
res[1].addEventListener('click',()=>{
  document.getElementById("result")["value"] = res[1]['name'];
  var b = document.getElementById("form_submit");
  b.submit();
})

console.log(res[2]['name']);
res[2].addEventListener('click',()=>{
  document.getElementById("result")["value"] = res[2]['name'];
  var b = document.getElementById("form_submit");
  b.submit();
})

console.log(res[3]['name']);
res[3].addEventListener('click',()=>{
  document.getElementById("result")["value"] = res[3]['name'];
  var b = document.getElementById("form_submit");
  b.submit();
})

console.log(res[4]['name']);
res[4].addEventListener('click',()=>{
  document.getElementById("result")["value"] = res[4]['name'];
  var b = document.getElementById("form_submit");
  b.submit();
})
</script>
</body>
</html>