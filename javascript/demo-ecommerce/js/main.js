class Product {
    constructor(title, image, category, price) {
        this.id = new Date().getTime(),
            this.title = title,
            this.image = image,
            this.category = category,
            this.price = price || 0
    }
}

const gridDiv = document.querySelector(".grid-template");
const form = document.querySelector("#form");
const toggleBtn = document.getElementById("toggle-btn");

var products = [];

const FormElements = {
    titleInput: document.getElementById("title"),
    imageInput: document.getElementById("img"),
    categoryInput: document.getElementById("category"),
    priceInput: document.getElementById("price"),
    button: document.getElementById("form-btn")
}

form.addEventListener("submit", function createProduct(e) {
    e.preventDefault();

    if (
        FormElements.titleInput.value &&
        FormElements.imageInput.value &&
        FormElements.categoryInput.value &&
        FormElements.priceInput.value
    ) {
        const product = new Product(
            FormElements.titleInput.value,
            FormElements.imageInput.value,
            FormElements.categoryInput.value,
            parseInt(FormElements.priceInput.value)
        )

        products.push(product);

        appendElements(products);

        toggleForm();

    } else {
        alert("please fill all fields.")
    }
})

getProducts();

async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products/category/electronics');
    const data = await response.json();

    data.forEach(item => products.push(item));

    appendElements(products);
}

function appendElements(productsArray) {
    var toAppend = "";

    productsArray.forEach(product => {
        const { id, title, image, price, category } = product;

        toAppend += `<article id="card">
                        <img src="${image}"
                             alt="gadget">
                        <div class="card-title">
                            <h3>${title.slice(0, 20)}</h3>
                        </div>
                        <div class="card-body">
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, assumenda illum. 
                                Dolore quam, nisi cumque tempora exercitationem, sapiente quaerat sit adipisci alias vero corporis beatae.
                            </p>
                            <div id="category">
                                <p>
                                    <strong>category:</strong> ${category}
                                </p>
                            </div>
                            <div id="card-footer">
                                <i id=${id} class="fa-solid fa-trash-can" onclick="removeProduct(this)"></i>
                                <p>
                                    <strong>${price.toFixed(2)}$</strong>
                                </p>
                            </div>
                        </div>
                    </article>`
    })

    gridDiv.innerHTML = toAppend;
}

function removeProduct(e) {
    const id = parseInt(e.getAttribute("id"));

    products = products.filter(product => product.id !== id);

    appendElements(products);
}

function toggleForm() {
    if (form.style.display === "none") {
        form.style.display = "flex"
        toggleBtn.innerText = "Hide Form"
    }
    else {
        form.style.display = "none"
        toggleBtn.innerText = "Show Form"
    }
}
