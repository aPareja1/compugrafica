var vectors =[];
var selectedId=-1;
function addVector(){
    var vector = new Object();
    vector.x= parseFloat(document.getElementById("vx").value);
    vector.y= parseFloat(document.getElementById("vy").value);
    vector.z= parseFloat(document.getElementById("vz").value);
    if(vector.x!=NaN && vector.y!=NaN && vector.z!=NaN){
        vectors.push(vector);
        showVectors();
        cleanAddVector();
    }else{
        alert("Ingresa todas las componentes primero");
    }
    
    
};

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
function showVectors(){
    var text = "";
    var letter = 'A';
    vectors.forEach(v=>{
        text+="<input type='checkbox' name='vectorGroup'>"+ letter + " =  {"+v.x + " , " + v.y + " , "+ v.z+ " } <br>"
        letter = nextChar(letter);
    })
    document.getElementById("vectors").innerHTML=text;
    loadSelect();
    if(vectors.length>0){
        document.getElementById("editButton").hidden=false;
        if(vectors.length>=2){
            document.getElementById("sumVectorsButton").hidden=false;
        }else{
            document.getElementById("sumVectorsButton").hidden=true;
        }
    }else{
        document.getElementById("editButton").hidden=true;
        document.getElementById("sumVectorsButton").hidden=true;
    }
}
function showEdit(){
   
    document.getElementById("editVectors").hidden=!(document.getElementById("editVectors").hidden);
    
}
function selectVector(id){
    document.getElementById("editVector").hidden=false;
    var selectedVector= vectors[id];
    document.getElementById("ex").value=selectedVector.x;
    document.getElementById("ey").value=selectedVector.y;
    document.getElementById("ez").value=selectedVector.z;
    selectedId=id;
}
function editVector(){
    if(selectedId>-1){
        var vector = new Object();
        vector.x= parseFloat(document.getElementById("ex").value);
        vector.y= parseFloat(document.getElementById("ey").value);
        vector.z= parseFloat(document.getElementById("ez").value);
        vectors.splice(selectedId,1,vector);
        showVectors();
        cleanEdit();
        alert("Vector modificado" );
    }
    
}

function removeVector(){
    if(selectedId>-1){
        vectors.splice(selectedId,1);
        showVectors();
        cleanEdit();
        if(vectors.length==0){
            showEdit();
        }
    }
    
}
function loadSelect(){
    var select = document.getElementById("vectorSelect");
    select.length=1;
    var letter = 'A';
    for (let index = 0; index < vectors.length; index++) {   
        select.options[select.options.length]=new Option(letter,index);
        letter = nextChar(letter);
    }
}
function cleanAddVector(){
    document.getElementById("vx").value=null;
    document.getElementById("vy").value=null;
    document.getElementById("vz").value=null;
}
function cleanEdit(){
    document.getElementById("ex").value=null;
    document.getElementById("ey").value=null;
    document.getElementById("ez").value=null;
    selectedId=-1;
}
function sumVectors(){
    let group = document.formVectors.vectorGroup;
    let selected = [];
    let vectorSum = new Object();
    let text="<p>(";
    let textX="";
    let textY="";
    let textZ="";
    vectorSum.x=0;
    vectorSum.y=0;
    vectorSum.z=0;
    for (let index = 0; index < group.length; index++) {
        if(group[index].checked)selected.push(index);        
    }
    if(selected.length>1){
        selected.forEach(s=>{
            let vector = vectors[s];
            vectorSum.x+=vector.x;
            vectorSum.y+=vector.y;
            vectorSum.z+=vector.z;
            textX+=vector.x + '+';
            textY+=vector.y + '+';
            textZ+=vector.z + '+';
        })
        text +=textX.substring(0,textX.length-1) + ' , ' + textY.substring(0,textY.length-1)+ ' , '+ 
        textZ.substring(0,textZ.length-1) + ' ) = (' + vectorSum.x + ' , ' + vectorSum.y  + ' , ' + vectorSum.z + ' ) </p>';
        document.getElementById("resultadoSuma").innerHTML=text;
    }else{
        alert("Para sumar debes seleccionar al menos dos vectores")
    }
    
  
}
