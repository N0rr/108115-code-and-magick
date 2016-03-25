
function getMessage(a, b) {   
    var sum = 0;  
    var sum2 = [];
    var length = 0;    
    if(a === true){        
        return 'Я попал в ' + b;
    }
    else if(a === false){
        return 'Я никуда не попал';
    }
    
    else if(typeof a === 'number'){
        return 'Я прыгнул на ' + a * 100 + ' сантиметров'; 
    }
    
    else if((Array.isArray(a)) && (!Array.isArray(b))){           
        for(i=0; i < a.length; i++) {
            sum += a[i];             
        }
        return 'Я прошёл ' + sum + ' шагов';                
    } 
    
    else if((Array.isArray(a)) && (Array.isArray(b))) {
        for(i=0; i < a.length; i++) {
        }
        for(i=0; i < b.length; i++) {
            length += a[i] * b[i];
        }
        return 'Я прошёл ' + length + ' метров';
    }
}

