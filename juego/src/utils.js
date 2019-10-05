// function textTure(ts,fw,fs,ff,c,t,x,y){

// 	var canvas = document.createElement('canvas');
// 	canvas.width = ts; canvas.height = ts;
// 	var context = canvas.getContext('2d');
// 	context.font = fw+" "+fs+" "+ff;
// 	context.fillStyle = "rgba("+c+")";
// 	context.fillText(t,x,y);

// 	// CANVAS CONTIENE UN TIPO QUE PODRIA SER USADO PARA LA TEXTURA

// 	var texture = new THREE.Texture(canvas);
// 	texture.needUpdate = true;

// 	return texture;
// }

function module(v) {
    return Math.sqrt ((v.x*v.x)+(v.y*v.y)+(v.z*v.z));
}

function unitario(v){
    var m = module(v);
    return new THREE.Vector3((v.x/m),(v.y/m),(v.z/m));
    // return new THREE.Vector3((Math.acos(v.x / m)).toFixed(3), (Math.acos(v.y / m)).toFixed(3) , (Math.acos(v.z / m)).toFixed(3)); 
}

