// Your Code Here

async function main() {
    let response = await fetch("http://localhost:3001/listBooks")
    let books = await response.json()
    console.log(books)

    books.forEach(renderBookTitle)
}

async function updateBookQuantity(id, quantity) {
    await fetch("http://localhost:3001/updateBook", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": Number(id),
            "quantity": Number(quantity)
        })
    })
}

function addButtonEventListeners() {
    let bookContainers = document.querySelectorAll(".book")

    bookContainers.forEach(bookContainer => {
        bookContainer.addEventListener("click", event => {
            console.log(event)
            if(event.target.toString().includes("Button")) {
                let bookId = event.path[1].id
                let bookQuantity = document.querySelector(`#${bookId} input`).value

                updateBookQuantity(bookId.replace("book", ""), bookQuantity)
            }
        })
    })
}

function renderBookTitle(book) {
    let bookContainer = document.getElementById("root")
    bookContainer.innerHTML += 
        `
        <div class="book" id="book${book.id}">
            <label>${book.title}</label>
            <input type="text" value=${book.quantity}>
            <button class="btn">Save</button>
        </div>
        <br>
        `
    addButtonEventListeners()
}

main()

// async function updateLegends() {
//     let response = await fetch("http://localhost:3001/updateBook", {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "id": 3,
//             "title": "The Legends of Arathrae"
//         })
//     })
//     let book = await response.json()
//     console.log(book)
// }

// updateLegends()