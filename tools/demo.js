var Interval = 100
var stockType = "LTC/CNY"

/**
 * @brief dynamic param support funcion
 * @param [func] fn callback function
 * @param [...] args params
 */
function dynCallback(fn, args){
    var result
    G.Log(args);
    try{
        result = fn.apply(this, args);
    }catch(e){
        throw new Error(e.message + "->" + "dynCallback");
    }
    return result
}

/**
 * @brief ajust number by floor
 * @param [float] v float number
 *
 */
function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

/**
 *  @brief cancel all orders stock in
 *
 */
function CancelPendingOrders(stockType) {
    try{
        while (true) {
            orders = pendingAction(E.GetOrders, -1, [stockType]);
            
            if (orders.length == 0) {
                return;
            }

            for (var i = 0; i < orders.length; i++) {
                pendingAction(E.CancelOrder, -1, [orders[i]]);
            }
        }

    }catch(e){
        throw new Error(e.message + "->" + "CancelPendingOrders");
    }
}

/**
 *  @brief pending action
 *  @param [int] count >=0 ? try count : always pending 
 *  @param [...] args params
 *
 */
function pendingAction(func, count, args) {
    var result;
    var i = 0;

    try{
            while (!(result = dynCallback(func, args))) {
                G.Sleep(Interval);
            
                //always try if count < 0
                if(count < 0){
                    continue;
                }

                if(i >= count){
                    break;
                }else{
                    i++;
                }
            }

    }catch(e){
        throw new Error(e.message + "->" + "CancelPendingOrders");
    }
    return result;
}

function main() {

    try{ 
        G.Log(pendingAction(E.GetAccount, 0));
        CancelPendingOrders(stockType);
    }catch(e){
        throw new Error(e.message);
    }
}
