const div = document.querySelector("div");

async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products/category/electronics');
    const data = await response.json();

    const products = [...data];

    var toAppend = "";

    products.forEach(product => {
        const { price, image, title, category } = product;

        toAppend += `<article id="card">
                        <img src="${image}"
                             alt="house">
                        <div class="card-title">
                            <h3>${title.slice(0, 10)}</h3>
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
                            <div id="price">
                                <p>
                                    <strong>${price.toFixed(2)}$</strong>
                                </p>
                            </div>
                        </div>
                    </article>`
    })

    div.innerHTML = toAppend;
}
