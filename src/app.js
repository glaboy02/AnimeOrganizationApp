document.addEventListener("DOMContentLoaded", () => {
    function navigate(viewId) {
      // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document
    .getElementById("home")
    .addEventListener("click", () => navigate("homeView"));
document
    .getElementById("bookmark")
    .addEventListener("click", () => navigate("bookmarkView"));

document
    .getElementById("account")
    .addEventListener("click", () => {
        const info = document.querySelector('.info');

        if(getComputedStyle(info).textDecorationLine !== 'line-through'){
            navigate("accountView")
        }
    });

document
    .getElementById("plus")
    .addEventListener("click", () => {
        const info = document.querySelector('.info');
        return info.removeAttribute('style');
    });

document
    .getElementById("minus")
    .addEventListener("click", () => {
        const info = document.querySelector('.info');
        return info.setAttribute(
            'style',
            'text-decoration: line-through'
        );
    });

    
document
    .getElementById("signInGo")
    .addEventListener("click", () => {
        console.log('Go Button clicked')
        navigate("accountView")
    });

document
    .getElementById("signUpGo")
    .addEventListener("click", () => navigate("accountView"));

// document
//     .getElementsByClassName("bi-file-plus")
//     .addEventListener("click", () => navigate("accountView"));

// document
//     .getElementById("animeCardLink")
//     .addEventListener("click", () => navigate("bookmarkView"));

document.getElementById("animeCardLink").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    navigate("bookmarkView");
});
document.getElementById("bookmarkCardIcon").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    navigate("accountView");
});

// Initialize with the home view
navigate("homeView");

// Assuming your images are within a container with the class
'image-container'
document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", function () {
    const parent = this.parentNode;
    parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
    });
});

});

