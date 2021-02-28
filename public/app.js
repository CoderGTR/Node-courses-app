const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU' , {
        currency: 'usd',
        style: 'currency'
    }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(+node.textContent)
})

$(document).ready(function(){
    $('.materialboxed').materialbox();
});

const $cart = document.querySelector('#cart');
$cart.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')){
        const id = event.target.dataset.id;

        fetch('/cart/remove/' + id , {
            method : 'delete'
        }).then(res => res.json())
            .then(cart => {
                if(cart.courses.length) {
                    const html = cart.courses.map(c => {
                        return `
                        <tr>
                            <td><p>${c.title}</p></td>
                            <td><img src="${c.img}" class="materialboxed cart-img" alt="image of course"></td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${c.id}">Delete</button>
                            </td>
                         </tr>
                        `
                    }).join('')

                    $cart.querySelector('tbody').innerHTML = html
                    $cart.querySelector('.price').textContent = toCurrency(cart.price)
                }else {
                    $cart.innerHTML = `<p class="amber-text accent-4">Your cart is empty</p>`
                }
            })
    }
})