// header
let lastScrollY = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY; 
});

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
});

// banner
window.addEventListener('scroll', () => {
    const banner = document.querySelector('#banner img');
    const scrollY = window.scrollY;
    banner.style.transform = `translateY(${scrollY * 0.5}px)`;
});

//main
document.getElementById("sort").addEventListener("change", function() {
    const sortOption = this.value;
    console.log("Sorting by: ", sortOption);
    sortPosts(); 
    showItemsPerPage(document.getElementById("items-per-page").value);
});

document.getElementById("items-per-page").addEventListener("change", function() {
    const itemsPerPage = this.value;
    console.log("Items per page: ", itemsPerPage);
    showItemsPerPage(itemsPerPage);
});

function sortPosts() {
    const postsList = document.getElementById('posts-list');
    const posts = Array.from(postsList.getElementsByClassName('post-card'));
    const sortBy = document.getElementById('sort').value;

    posts.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));

        if (sortBy === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    posts.forEach(post => {
        postsList.appendChild(post);
    });
}

function showItemsPerPage(itemsPerPage) {
    const postsList = document.getElementById('posts-list');
    const posts = Array.from(postsList.getElementsByClassName('post-card'));

    posts.forEach((post, index) => {
        if (index < itemsPerPage) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sortPosts();
    showItemsPerPage(document.getElementById("items-per-page").value);
});

//pagination
const posts = Array.from(document.querySelectorAll('.post-card'));
const pageNumbers = document.querySelectorAll('.page-number');
const itemsPerPage = 10;
let currentPage = 1;

function showPage(page) {
    posts.forEach((post, index) => {
        post.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'block' : 'none';
    });

    pageNumbers.forEach(button => {
        button.classList.toggle('active', Number(button.dataset.page) === page);
    });
}

document.querySelector('#prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

document.querySelector('#next-button').addEventListener('click', () => {
    if (currentPage < Math.ceil(posts.length / itemsPerPage)) {
        currentPage++;
        showPage(currentPage);
    }
});

pageNumbers.forEach(button => {
    button.addEventListener('click', () => {
        currentPage = Number(button.dataset.page);
        showPage(currentPage);
    });
});

showPage(currentPage);
