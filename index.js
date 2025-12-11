
// THEME BUTTON

let themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// DOG SELECTION

const dogSelect = document.getElementById("dog-names");
const headerImg = document.getElementById("header-img");

const dogImages = {
    rigatoni: "img/rigatoni.jpg",
    dave: "img/dave.jpg",
    pumpernickel: "img/pumpernickel.jpg",
    reeses: "img/reeses.jpg"
};

dogSelect.addEventListener("change", () => {
    const name = dogSelect.value;
    headerImg.src = dogImages[name];
});

// SIGNATURE FORM

let signButton = document.getElementById('signNowButton');

const addSignature = () => {
    let name = document.getElementById('name');
    let hometown = document.getElementById('hometown');

    let para = document.createElement('p');
    para.textContent = `🖊️ ${name.value} from ${hometown.value} supports this!`;

    document.getElementById("yourSignature").appendChild(para);
}

const validateForm = () => {
    const formElements = document.getElementById("sign-petition").elements;
    const email = document.getElementById("email");

    let hasErrors = false;

    // Validate empty fields
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].value.trim().length < 2) {
            formElements[i].classList.add("error");
            hasErrors = true;
        } else {
            formElements[i].classList.remove("error");
        }
    }

    // Email validation
    if (!email.value.includes("@") || (!email.value.endsWith(".com") && !email.value.endsWith(".edu"))) {
        email.classList.add("error");
        alert("Please enter a valid email.");
        hasErrors = true;
    }

    if (!hasErrors) {
        addSignature();
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].value = "";
        }
    }
};

signButton.addEventListener("click", validateForm);


// Select "Find Animal Shelters"
document.addEventListener("DOMContentLoaded", () => {
    const findSheltersLink = document.getElementById("find-shelters");

    findSheltersLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(
            "https://www.google.com/maps/search/animal+shelters+near+me",
            "_blank"
        );
    });
});

// Share Stories
window.onload = function () {
    const shareStoriesLink = document.getElementById("share-stories");

    if (shareStoriesLink) {
        shareStoriesLink.onclick = function (e) {
            e.preventDefault();
            window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=&su=My+Pet+Story&body=Write+your+story+here:",
                "_blank"
            );
        };
    }
};

// Back to Top
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// BOOKS (OpenLibrary Editions API)
const loadBook = (bookId, titleId, publisherId, isbnId, urlSlug) => {
    const apiURL = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=details`;

    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            const key = `OLID:${bookId}`;
            const details = data[key].details;

            // TITLE
            document.getElementById(titleId).innerHTML =
                `<a href="https://openlibrary.org/books/${bookId}/${urlSlug}" target="_blank">${details.title}</a>`;

            // PUBLISHER
            const publishers = details.publishers ? details.publishers.join(", ") : "N/A";
            document.getElementById(publisherId).textContent = publishers;

            // ISBN (from details)
            let isbn = "N/A";
            if (details.isbn_13) isbn = details.isbn_13[0];
            else if (details.isbn_10) isbn = details.isbn_10[0];

            document.getElementById(isbnId).textContent = isbn;
        })
        .catch(err => console.log("Error loading book:", err));
};

loadBook("OL27516583M", "title1", "publishers", "isbn", "Animal_Shelters");
loadBook("OL1896785M", "title2", "publishersTwo", "isbnTwo", "Overpopulation_of_cats_and_dogs");
loadBook("OL24912370M", "title3", "publishersThree", "isbnThree", "Redemption");
loadBook("OL12153467M", "title4", "publishersFour", "isbnFour", "52_simple_things_you_can_do");