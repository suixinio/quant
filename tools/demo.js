var Interval = 100
var stockType = "LTC/CNY"

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

/**
 *  @brief cancel all orders stock in
 *
 */
function CancelPendingOrders(stockType) {
    while (true) {
        while(!(orders = E.GetOrders(stockType))){}

        if (orders.length == 0) {
            return;
        }

        for (var i = 0; i < orders.length; i++) {
            while(!E.CancelOrder(orders[i])){}
        }
    }
}

/**
 *  @brief pending action
 *  @param [int] count >0 ? try count : always pending 
 *
 */
function pendingAction(func, count) {
    var result;
    var i = 0;
    if(count >= 0){
        while (!(result = func())) {
            Sleep(Interval);
            if(i >= count){
                break;
            }else{
                i++;
            }
        }

    }else{
        while (!(result = func())) {
            Sleep(Interval);
        }
    }
    return result;
}

function main() {
    G.Log(pendingAction(E.GetAccount, 0));
    CancelPendingOrders(stockType);
}
