const bookingForm = document.getElementById("bookingForm");
const bookingResponse = document.getElementById("bookingResponse");

bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Förhindrar sidomladdning.

    // Prickar ut användarens input.
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = parseInt(document.getElementById("guests").value, 10);
    const message = document.getElementById("message").value.trim();

    // Nytt objekt med bokningsdatan.
    const bookingData = {
        fullName,
        phone,
        date,
        time,
        guests,
        message
    };

    try {
        const response = await fetch("http://127.0.0.1:3001/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        // Skriver ut felmeddelande eller bekräftelse beroende på responsen.
        // Skrivs ut i id:t bookingResponse.
        if(!response.ok) {
            // result.message = felmeddelande som är skapat i webbtjänsten.
            bookingResponse.textContent = result.message || "Något gick fel med bokningen!";
            bookingResponse.style.color = "red";
            bookingResponse.style.backgroundColor = "aliceblue";
            bookingResponse.scrollIntoView();
        } else {
            bookingResponse.textContent = "Bokning skapad: " + fullName + " - " + date + " - " + time;
            bookingResponse.style.color = "green";
            bookingResponse.style.backgroundColor = "aliceblue";
            bookingForm.reset();
        }
    } catch(err) {
        bookingResponse.textContent = "Fel vid skapande av bokning. Försök igen senare."
        bookingResponse.style.color = "red";
    }
})