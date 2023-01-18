var updatebtns=document.getElementsByClassName('update-cart')

for (var i=0;i<updatebtns.length;i++)
{
    updatebtns[i].addEventListener('click',function(){
        var productId=this.dataset.product
        var action=this.dataset.action
        console.log(user);
        if(user=='AnonymousUser'){
            addCookieItem(productId,action);
        }
        else
        {
            updateUserOrder(productId,action);
        }
    })
}

function addCookieItem(productId,action)
{
    if(action=='add')
    {
        console.log("Item is added");
        if(cart[productId]==undefined)
        {
            cart[productId]={'quantity':1}
        }
        else
        {
            cart[productId]['quantity']+=1;
        }

    }
    if(action =='remove'){
        cart[productId]['quantity']-=1;
        if(cart[productId]['quantity']<=0)
        {
            console.log('reomve item');
            delete cart[productId];
        }

    }
    console.log('cart:',cart);
    document.cookie='cart='+JSON.stringify(cart)+";domain=;path=/";
    location.reload();
}

function updateUserOrder(productId,action)
{
    console.log(productId);
    console.log(action);
    console.log("user is logged in ,sending data")
    var url='/update_item/'
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'applicatoin/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'productId':productId,'action':action})
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log('data:', data)
        location.reload()
    })
}