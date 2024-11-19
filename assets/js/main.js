
/*=============== card localstorage   ===============*/
let carts =  [];
/*=============== SHOW MENU ===============*/

const navMenu=document.getElementById("nav-menu"),
        navToggle=document.getElementById("nav-toggle"),
        navClose=document.getElementById("nav-close")

/*===== MENU SHOW =====*/
/* Validate if constant exists */

if(navToggle){
    navToggle.addEventListener("click",()=>{
        navMenu.classList.add("show-menu")
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

if(navClose){
    navClose.addEventListener("click",()=>{
        navMenu.classList.remove("show-menu")
    })
}

/*=============== SHOW CART ===============*/
const cartShow=document.getElementById("cart"),
        cartShop=document.getElementById("cart-shop"),
        cartClose=document.getElementById("cart-close")

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener("click",()=>{
        cartShow.classList.add("show-cart")
    })
/*===== CART HIDDEN =====*/
/* Validate if constant exists */
    cartClose.addEventListener("click",()=>{
        cartShow.classList.remove("show-cart")
    })
}





/*=============== HOME SWIPER ===============*/
var homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: true,
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById("header");
    //  When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add("scroll-header"); else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);
/*=============== NEW SWIPER ===============*/
var newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 16,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
});


/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp() {
    const scrolUp=document.getElementById("scroll-up");
    if(this.scrollY >= 350){ scrolUp.classList.add("show-scroll");}
else{
    scrolUp.classList.remove("show-scroll")
}
}
window.addEventListener("scroll",scrollUp)


/*=============== LIGHT BOX ===============*/

/*=============== QUESTIONS ACCORDION ===============*/

const accordionItem = document.querySelectorAll(".questions__item");

accordionItem.forEach((item) => {
    const accordionHeader = item.querySelector(".questions__header");

    accordionHeader.addEventListener("click", () => {
        const openItem = document.querySelector(".accordion-open");

        toggleItem(item);

        if(openItem && openItem !== item) {
            toggleItem(openItem);
        }
    })
});

const toggleItem = (item) => {
    const accordionContent = item.querySelector(".questions__content");

    if(item.classList.contains("accordion-open")) {
        accordionContent.removeAttribute("style");
        item.classList.remove("accordion-open");
    }
    else {
        accordionContent.style.height = accordionContent.scrollHeight + "px";
        item.classList.add("accordion-open");
    }
}



/*=============== STYLE SWITCHER ===============*/
const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style__switcher").classList.toggle("open");
});

// HIDE STYLE SWITCHER ON SCROLL
window.addEventListener("scroll", () => {
    if (document.querySelector(".style__switcher").classList.contains("open")) 
    {
        document.querySelector(".style__switcher").classList.remove("open");
    }
});

// THEME COLORS
function themeColors() {
    const colorStyle = document.querySelector(".js-color-style"),
        themeColorsContainer = document.querySelector(".js-theme-colors");
    
    themeColorsContainer.addEventListener("click", ({target}) => {
        if (target.classList.contains("js-theme-color-item"))
        {
            localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
            setColors();
        }
    });
    function setColors() {
        let path = colorStyle.getAttribute("href").split("/");
        path = path.slice(0, path.length - 1);
        colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");

        if (document.querySelector(".js-theme-color-item.active")) 
        {
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
        }
        let classFromLocal=document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]")
        if(classFromLocal){

            classFromLocal.classList.add("active");
        }
    }
    if (localStorage.getItem("color") !== null) 
    {
        setColors();
    }
    else
    {
        const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
        let colorDefaultColor=document.querySelector("[data-js-theme-color" + defaultColor + "]")
        if(colorDefaultColor){

            colorDefaultColor.classList.add("active");
        }
    }

}
themeColors();



/*=============== login handle ===============*/
/*=============== SHOW LOGIN ===============*/
const   login=document.getElementById("login"),
        loginButton=document.getElementById("login-toggle"),
        loginClose=document.getElementById("login-close")


// Login logic
let isAuthanticated;
const loginFrom=document.getElementById('login-form')
if(loginFrom){

loginFrom.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        window.location.href = 'index.html'; // Redirect to home
        isAuthanticated=true
        login.classList.remove("show-login")
    } else {
        errorMessageDiv.textContent = 'Invalid email or password!';
    }
});
    
}

/*===== LOGIN SHOW =====*/
/* Validate if constant exists */
if(loginButton &&loginClose){
    loginButton.addEventListener("click",()=>{
        login.classList.add("show-login")
    })
/*===== LOGIN HIDDEN =====*/
/* Validate if constant exists */

    loginClose.addEventListener("click",()=>{
        login.classList.remove("show-login")
    })
}

/*=============== register handel ===============*/
const users = JSON.parse(localStorage.getItem('users')) || [];

// Function to generate a unique user ID
function generateUniqueId() {
    return 'user_' + Math.random().toString(36).substr(2, 9); // Generates a random ID
}

// Registration logic
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const regUsername = document.getElementById('reg-username').value;
    const regPassword = document.getElementById('reg-password').value;
    const regPhone = document.getElementById('reg-phone').value;
    const regAddress = document.getElementById('reg-address').value;
    const errorMessageDiv = document.getElementById('error-message');

    // Check if email is already in use
    const existingUser = users.find(u => u.username === regUsername);
    if (existingUser) {
        errorMessageDiv.textContent = 'Email is already in use. Please use a different email.';
        return;
    }

    // Validate password
    if (regPassword.length < 6) {
        errorMessageDiv.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Create a new user object with unique ID, phone, and address
    const newUser = {
        id: generateUniqueId(),
        username: regUsername,
        password: regPassword,
        phone: regPhone,
        address: regAddress
    };

    // Save the new user in the users array and localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // document.getElementById("login__redirect").addEventListener("click",()=>{
        
    //     window.location.href = 'index.html'; // Redirect to login
    //     setInterval(()=>{

    //         login.classList.add("show-login")
    //     },3000)
    // })
});




/*=============== dynamic products  ===============*/
let shopItems=document.getElementById("shop__items");
let cartPricesInSection=document.getElementById("cart__prices")
let emptyCard=document.getElementById("empty-card")
let basket=JSON.parse(localStorage.getItem('productSelected')) ||[]
let products=[];
let label = document.getElementById("cart__prices-total")
let cartContainer=document.getElementById("cart__container")
let totalCartItems=document.getElementById("cart__prices-item")


// ################################################################### create shop page producr
window.addEventListener('DOMContentLoaded', () => {
  
         // Add to cart function
    
    // Display cart items
    displayDetails()
    getProducts()
    displayDetails()
    displayCart()
    totalAmount()
    
 
})
window.addToCart = function (id) {
    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(data => {
        products.push(data)
            increament(id)
            displayCart();
            getProducts()
        });
};


// ###################################################################displayCart to create card section item

function getProducts(){
    fetch('assets/json/products.json')
            .then(response => response.json())
            .then(data => {
                return data.forEach(product => {
                    products.push(product)
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    productDiv.innerHTML =`<div class="shop__content" id="${product.id}">
                                                <a class="product-link" style="cursor:pointer" data-ib="${product.id}" data-href="details.html">
                                                    <div class="shop__tag" >${product.category}</div>
                                                    <img src="${product.images[0]}" alt="${product.name}" class="shop__img">
                                                    <h3 class="shop__title">${product.name}</h3>
                                                    <span class="shop__subtitle">Accessory </span>
                                                    <div class="shop__prices">
                                                        <span class="shop__price">$${product.price}</span>
                                                        <span class="shop__discounts">$${product.stock}</span>
                                                    </div>
                                                </a>
                                                <i class="bx bx-cart-alt shop__icon add-to-card button shop__button" onclick="addToCart(${product.id})"></i>
                                            </div>`;
                                            if(shopItems){
                                                shopItems.appendChild(productDiv);
                                            }
    // ############################################ save id for checked product in localStorage
                                            document.querySelectorAll('.product-link').forEach(link => {
                                                link.addEventListener('click', (event) => {
                                                    const productId = link.getAttribute('data-ib');
                                                    const href = link.getAttribute('data-href');
                                            
                                                    // Save product ID to local storage
                                                    localStorage.setItem('selectedProductId', productId);
                                                    // Redirect to the target page after saving
                                                    setTimeout(() => {
                                                        window.location.href = href;
                                                    }, 100); // Delay for local storage operation
                                                });
                                            });
                                           
                     return products
                });
            });
        }

function displayCart() {
    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(data => {
            if (basket.length !== 0) {
        emptyCard.innerHTML=`<a href="cart.html"><button class="button">Go To Cart</button></a>
             `;
         (cartContainer.innerHTML = basket.map((item) => {
            let productSelectedToCard;
            
            productSelectedToCard = data.find((x) => x.id === item.id)||[]
            if(productSelectedToCard){
            // for empty card section
           
                return `
                 
                          <article class="cart__card">
                        <div class="cart__box">
                            <img src="${productSelectedToCard.images[0]}" alt="${productSelectedToCard.name}" class="cart__img">
                        </div>
                        <div class="cart__details">
                                <h3 class="cart__title">
                                ${productSelectedToCard.name}
                                </h3>
                                <span class="cart__price">$${productSelectedToCard.price * item.item}</span>
                            <div class="cart__amount">
                                <div class="cart__amount-content">
                                    <span class="cart__amount-box">
                                        <i class="bx bx-minus" onclick="decrement(${productSelectedToCard.id})"></i>
                                    </span>
                                    <span class="cart__amount-number" data-id=${productSelectedToCard.id}>${productSelectedToCard ? item.item : "1"}
                                    </span>
                                    <span class="cart__amount-box">
                                        <i class="bx bx-plus"  onclick="increament(${productSelectedToCard.id})"></i>
                                    </span>
                                </div>
                                <i class="bx bx-trash-alt cart__amount-trash" onclick="removeItem(${productSelectedToCard.id})"></i>
                            </div>
                        </div>
                    </article>`;
                }
            }).join(" "))
        }
            else{
                //################################# for empty card section
                    emptyCard.innerHTML =`
                    <h2 class='cart-empty'>
                    Cart is empty </h2>
                    `;
                    
                    return cartContainer.innerHTML=``
                }
        })
           
    }


    
// ###################################################################increament number

let increament = (id) => {
    let selectedItem = id

    
    let productIsSelectedAgain = basket.find((cart) => cart.id == selectedItem)
    if (!productIsSelectedAgain ) {
        basket.push(
            {
                id: selectedItem,
                item: 1,
            }
        )
        
    } else {
        productIsSelectedAgain.item+=1; 
    }
    update(selectedItem);
    localStorage.setItem("productSelected", JSON.stringify(basket))
    displayCart()
    displayDetails()
}

// ###################################################################decrement number
   let decrement = (id) => {
    let selectedItem = id
    productIsSelectedAgain = basket.find((cart) => cart.id == selectedItem)
    if (productIsSelectedAgain == undefined) return;
    else if (productIsSelectedAgain == 0) { return }
    else {
        productIsSelectedAgain.item -= 1
    }
    update(selectedItem);
    basket = basket.filter((cart) => cart.item !== 0)
    localStorage.setItem("productSelected", JSON.stringify(basket))
    displayCart()
    displayDetails()
}
// ###################################################################EVERY update

function update (id)  {

                            let selectditems = basket.find((cart) => cart.id == id)
                            if (selectditems.item < 0) {
                                return
                            }
                            else {
                        if(document.querySelector(`[data-id="${id}"]`)){
                            
                            document.querySelector(`[data-id="${id}"]`).innerHTML=selectditems.item
                            if(selectditems.item<=0){
                                
                            }
                        }
                            }
                            totalAmount()
                            totalSumProduct()
                        }
// ###################################################################totalSumProduct

let totalSumProduct = () => 
    {
        let basketSum = document.querySelector(".cart-counter")
        if(basketSum){

            return basketSum.innerHTML = basket.reduce((x, y) => x + y.item, 0)
        }
    }
totalSumProduct()

// ###################################################################totalAmount
let totalAmount = () => {
    if (basket.length !== 0) {
        fetch('assets/json/products.json')
        .then(response => response.json())
        .then(data => {
        let ammount = basket.map((x) => {
            let { id, item } = x;
            
            selectedProduct = data.find((y) => y.id == id) || [];
            return item * selectedProduct.price
        }).reduce((x, y) => x + y, 0);
     label.innerHTML = `
       $ ${Math.floor(ammount)}`
       totalCartItems.innerHTML=`${totalSumProduct()} item`
    })
    }else{
         label.innerHTML = `
        $ 0`
       totalCartItems.innerHTML=`0 item`
    }
}
totalAmount()
// ###################################################################removeAll

let removeAll = () => {
    basket = []
    createCartItem();
    totalSumProduct()
    localStorage.setItem("productSelected", JSON.stringify(carts))
}
// ###################################################################removeItem

let removeItem = (id) => {
    let itemselected = id
    basket = basket.filter((x) => x.id !== itemselected
    )
    displayCart();
    totalAmount();
    totalSumProduct()
    localStorage.setItem("productSelected", JSON.stringify(basket))

}
/*=============== dynamic details product  ===============*/

// On details.html



function displayDetails(){
    const productId = localStorage.getItem('selectedProductId');
    
    if (!productId) {
       
        return;
    }
    fetch('assets/json/products.json')
    .then(response => response.json())
    .then(products => {
        const product = products.find(x => x.id === parseInt(productId));
        if (product) {
            // if (basket.length !== 0) {
                
            // displayProductDetails(product);
            item=basket.find(baske=>baske.id=product.id)
            let productDetails=document.getElementById("product__details")
            if(productDetails){

           
            productDetails.innerHTML=` <div class="product__images grid">
                <div class="product__img">
                    <div class="details__img-tag">New</div>
                   
                    <img src="${product.images[0]?product.images[0]:"assets/img/details-2.png"}" class="${product.name}" alt="details-1">
                </div>
                <div class="product__img ${!product.images[1]?"not-found":""}">
                    <img src="${product.images[1]?product.images[1]:"assets/img/details-2.png"}" class="${product.name}" alt="details-2">
                </div>
                <div class="product__img ${!product.images[2]?"not-found":""}">
                    <img src="${product.images[2]?product.images[2]:"assets/img/details-2.png"}" class="${product.name}" alt="details-3">
                </div>
                <div class="product__img ${!product.images[3]?"not-found":""}">
                    <img src="${product.images[3]?product.images[3]:""}" class="${product.name}  " alt="details-4">
                </div>
            </div>
            <div class="product__info">
                <p class="details__subtitle">> ${product.category}</p>
                <h3 class="details__title product-title">${product.name}</h3>

                <div class="rating">
                    <div class="stars">
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bx-star"></i>
                    </div>
                    <span class="reviews__count">${product.rating} Rate</span>
                </div>

                <div class="details__prices">
                    <span class="details__price">$${product.price}</span>
                    <span class="details__discount">$${product.stock}</span>
                    <span class="discount__percentage">${Math.floor(product.price/product.stock*100)}% OFF</span>
                </div>

                <div class="details__description">
                    <h3 class="description__title">Product Details</h3>
                    <div class="description__details">
                        <p class=".product-description">${product.description}</p>
                    </div>
                </div>

                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box">
                            <i class="bx bx-minus" onclick="decrement(${product.id})" ></i>
                        </span>
                        <span class="cart__amount-number">${item ? item.item : "0"}</span>
                        <span class="cart__amount-box">
                            <i class="bx bx-plus" onclick="increament(${product.id})" ></i>
                        </span>
                    </div>
                    <i class="bx bx-heart cart__amount-heart"></i>
                </div>
                <a href="#" class="button">Add To Cart</a>
            </div>`
        }
    // }    
    } else {
            console.error('Product not found.');
        }
    });
}


