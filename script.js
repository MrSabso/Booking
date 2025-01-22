const container = document.querySelector(".container")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const rowsAndColumns = document.querySelector(".columns-and-rows")

let ticketPrice = +movieSelect.value;

const updateSelectedTicketList = () => {
    const allSeats = document.querySelectorAll(".row .seat");
    const seatList = document.getElementById("selected-seats");
    seatList.innerHTML = "";

    allSeats.forEach((el, index) => {
        if (el.classList.contains("selected")) {
            const listItem = document.createElement("li");
            const row = Math.floor(index / 8) + 1;
            const column = (index % 8) + 1;
            listItem.innerText = `Row ${row}, Seat ${column}`;
            seatList.appendChild(listItem);
        }
    });
};


const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    let discountPrice = selectedSeats.length * ticketPrice;
    count.innerText = +selectedSeats.length

    if(selectedSeats.length >= 4) {
        discountPrice = ((selectedSeats.length * ticketPrice) - (selectedSeats.length * ticketPrice / 5));
    }
    if (selectedSeats.length >= 4 ){
        total.innerHTML = `<del> ${selectedSeats.length * ticketPrice}$ </del> <span> ${discountPrice}`;
    } else {
         total.innerText = `${selectedSeats.length * ticketPrice}$`;
    }
    updateSelectedTicketList();
}


// Toggle seat selection on click
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        const selectedSeats = document.querySelectorAll(".row .seat.selected");

        // Prevent selecting more than 6 seats
        if (selectedSeats.length >= 6 && !e.target.classList.contains("selected")) {
            alert("You can select a maximum of 6 seats.");
            return;
        }

        // Toggle the selected class on the clicked seat
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value
    updateSelectedCount();
})

