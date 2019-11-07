no_repeat = function () {

    var number = db.phones.find({},{"display": 1, "_id": 0}).toArray();
    var unique = [];
    var used = [];
    var bool = true;
    for (var i = 0 ; i < number.length ; i++){
        var n = number[i].display;
        // Apenas considerar não indictivos
        n = n.split("-")[1];
        for(var k = 0 ; k < n.length ; k++){
            if (used.includes(n[k])){
                bool = false;
                break;
            }
            used.push(number[j]);
        }
        if (bool){
            unique.push(number[i])
        }
    }
    return unique;
}