function getMessage(a:*, b:*=):string{
    var a = true;
    var b = 'abc';
    if(typeof(a) === Boolean){
        if(a === true){        
            return alert('Я попал в [b]');
        }
        else(a === false){
            return alert('Я никуда не попал');
        }  
    }
    else(typeof(a) === Number){
        return alert('Я прыгнул на [a] * 100 сантиметров');
    }
    else if(typeof(a) === Array){
        return alert('Я прошел [sum] шагов');
    }
    else if((typeof(a) === Array) && (typeof(b) === Array)){
        return alert('Я прошел [length] метров');
    }
}
