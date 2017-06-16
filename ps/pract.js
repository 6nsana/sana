// function singularAutoPlural(singular, plural, rallyingCry ) {
// plural = singular + 's';
// rallyingCry = plural + ' ATTACK!!!'


// console.log("sing",singular)
// console.log("plu",plural)
// console.log("rall",rallyingCry)

//   return [singular, plural, rallyingCry]; 
// }

// //["Gecko","Geckos", "Geckos ATTACK!!!"]
// //singularAutoPlural('Gecko');


// //["Fox","Foxes", "Foxes ATTACK!!!"]
//  //singularAutoPlural('Fox', 'Foxes');

// // //["Deer", "Deer", "Deer ... change."]
//  singularAutoPlural('Deer', 'Deer', 'Deer peaceably and respectfully petition the government for positive change.')


var studata = ["TCINDEL0001", "TCINDEL002a","TCINDEL02aa"]
var stumapdata = studata.map(function(mapdata) {
    v = mapdata.slice(-4)
    yourNumber = parseInt(v, 16);
    console.log(yourNumber)
    return yourNumber
})


//
//var stumapdata=[TCINDEL0001,TCINDEL0002]

console.log("stu", stumapdata)
var maxraid = Math.max.apply(null, stumapdata)
console.log(maxraid)

var i = maxraid + 1;
n = i.toString(16)
x = n.length;
console.log(x)
digit = 4 - x;
if (digit == 3)
    id = '000' + n
if (digit == 2)
    id = '00' + n
if (digit == 1)
    id = '0' + n
if (digit == 0)
    id = n
console.log(id)
