document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const menuLinks = document.querySelectorAll("nav a");

    function loadSection(section) {
        fetch(`sections/${section}.html`)
            .then(response => {
                if (!response.ok) throw new Error("Błąd wczytywania sekcji");
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                contentDiv.classList.remove('animate-content');
                void contentDiv.offsetWidth;  
                contentDiv.classList.add('animate-content');
            })
            .catch(error => {
                contentDiv.innerHTML = `<p style="color:red;">Nie udało się wczytać treści.</p>`;
                console.error(error);
            });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            window.location.hash = section;
            loadSection(section);
        });
    });

    let initialSection = window.location.hash ? window.location.hash.substring(1) : "home";
    loadSection(initialSection);
});
