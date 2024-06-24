document.addEventListener('DOMContentLoaded', () => {
    const product = [
        { id: 0, image: 'images/imageAF.jpg', title: 'Air Force 1', price: 150.00 },
        { id: 1, image: 'images/imageAJ.jpg', title: 'Air Jordan', price: 240.00 },
        { id: 2, image: 'images/imageAM.jpg', title: 'Air Max', price: 370.00 },
        { id: 3, image: 'images/imageBL.jpg', title: 'Blaze', price: 230.00 },
        { id: 4, image: 'images/imageHD.jpg', title: 'High Dunk', price: 280.00 },
        { id: 5, image: 'images/imageLD.jpeg', title: 'Low Dunk', price: 190.00 },
    ];

    const categories = [...new Set(product.map((item) => { return item }))];
    let i = 0;

    document.getElementById('root').innerHTML = categories.map((item) => {
        let { image, title, price } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>` +
            `<button onclick='addToCart(${i++})'>Add To Cart</button>` +
            `</div>
            </div>`
        );
    }).join('');

    let cart = [];

    window.addToCart = function (a) {
        cart.push({ ...categories[a] });
        displayCart();
        updateCartCount();
    };


    function displayCart() {
        let j = 0;
        const cartItem = document.getElementById('cartItem');
        if (cart.length === 0) {
            cartItem.innerHTML = "Your cart is EMPTY";
        } else {
            cartItem.innerHTML = cart.map((items) => {
                let { image, title, price } = items;
                return (
                    `<div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src=${image}>
                        </div>
                        <p style='font-size:12px;'>${title}</p>
                        <h2 style='font-size:15px;'>$ ${price}.00</h2>` +
                    `<i class='fa-solid fa-trash' onclick='deleteItem(${j++})'></i></div>`
                );
            }).join('');
        }
        updateTotal();
    }

    window.deleteItem = function (index) {
        cart.splice(index, 1);
        displayCart();
        updateCartCount();
    };

    function updateCartCount() {
        document.querySelector("#count").innerHTML = cart.length;
    }

    function updateTotal() {
        let total = cart.reduce((acc, item) => acc + item.price, 0);
        document.getElementById('total').innerHTML = `$${total}.00`;
    }
});
