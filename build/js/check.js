
function getMessage(a, b) {   
    var sum = 0;
    var length = 0;   

    if(a === true){        
        return 'Я попал в ' + b;
    }
    else if(a === false){
        return 'Я никуда не попал';
    }
    
    else if(a  instanceof Number) {
        return 'Я прыгнул на ' + a * 100 + ' сантиметров'; 
    }
    
    else if((a instanceof Array) && (b instanceof Array === false)) {           
        for(i=0; i < a.length; i++) {
            sum += a[i];             
        }
        return 'Я прошел ' + sum + ' шагов';                
    } 
    
    else if((a instanceof Array) && (b instanceof Array)) {
        for(i=0; i < a.length; i++) {
            sum += a[i];             
        }
        for(i=0; i < b.length; i++) {
            length += b[i] + sum;             
        }
        return 'Я прошёл ' + length + ' метров';
    }
}

