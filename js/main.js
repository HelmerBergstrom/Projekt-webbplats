document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:3001/api/menu")
        .then(res => res.json())
        .then(data => {
            // Objekt för kategorierna. För att sedan kunna sortera i dessa.
            const categories = {
                "Förrätt": document.getElementById("starter"),
                "Varmrätt": document.getElementById("main"),
                "Efterrätt": document.getElementById("dessert"),
                "Dryck": document.getElementById("drink")
            };

            // Skriver ut alla menyobjekt.
            data.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("menu-item");
                div.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.description || ""}</p>
                    <p><strong>${item.price}kr</strong></p>
                `;
                // Skriver ut i kategori-ordning.
                if (categories[item.category]) {
                    categories[item.category].appendChild(div);
                }
            });
        })
        .catch(error => {
            console.error("Kunde inte hämta meny:", error);
        });
});