var nama = "syahwan";
var umur = 16;
console.log("CEOOOOO MUDA"+nama);
console.log("UMUR="+umur);


namavar ="izy";
umurvar = 27;
console.log(namavar);
console.log(umurvar);


console.log("---------------------------------");
//vaiabel mengunakan let

let namavar1 = "dadang";
let umurvar2 =20;

console.log(namavar1);
console.log(umurvar2);

nama1 ="ujang";
umur1 =40;


console.log(nama1);
console.log(umur1);


console.log("-------------------------------------");

//percabangan
var usiakakang =17;
if(usiakakang >30){
    console.log("anda sudah dewasa"+usiakakang+"tahun")
} else {
    console.log("anda belum dewasa"+usiakakang+"tahun")
}


console.log("--------------------------------------");



//percabangan variabel let
if (1>2){
    let numerik =true;
    console.log("numerik");
}else {
    let numerik = false;
    console.log(numerik)
};


//percabangan mengunakan variabel connst (block scope)
if (1>2){
    let numerik1 =true;
    console.log("numerik");
}else{
    let numerik1 =false;
    console.log(numerik1);
}


console.log("------------------------------------------");



//tipe data
var angka = 10;
var huruf = "syahwan";
var boolean = true;
var array = [1,2,3];
var object = {
        a:1,
        b:2,
        c:3
};
var arrayobject =[
    {
        fielda:1,
        fielda:2,
        fielda:3
       
    },
    {
        fielda:1,
        fielda:2,
        fielda:3
        
        
    }
]

var nulivar = null;
var undefinedvar;



console.log(angka);
console.log(huruf);
console.log(boolean);
console.log(array);
console.log(object);
console.log(arrayobject);
console.log(nulivar);
console.log(undefinedvar);

console.log("----------------------------------");
//operator logika
// && == AND OR !=||
var angka1 = 10;
var angka2 = 20;
if(angka1 > 5 && angka2 > 15){
    console.log("benar");
}else{
    console.log("salah");
}

var angka1 = 20;
var angka2 = 20;
if(angka1 > 5 || angka2 > 15){
    console.log("benar");
}else{
    console.log("salah");
}
console.log("------------------------------------");

//funtion

function peopletname(fullname){
    return fullname
}
console.log(nickname);


//if in function

function getdatasiswa(namasiswa,nilasiswa){
    if (nilaisiswa >90){
        console.log("nama siswa"+namasiswa+"memilika nilai di atas kkm" )
    }else if (nilaisiswa>90){
        console.log("nama siswa"+namasiswa+"memiliki nilai kkm")
    }else {
        console.log("nama siswa"+namasiswa+"memiliki nilai di bawah kkm")
    }
}
getdatasiswa("cici",90);
getdatasiswa("lala",80);
getdatasiswa("lulu",60);
