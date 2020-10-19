const options ={
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false

}

const lat = document.querySelector('[data-lat]').dataset.lat
const lng = document.querySelector('[data-lng]').dataset.lng

//create map
const map = L.map('mapid', options).setView([lat,lng], 15);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',)
.addTo(map);


//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popAnchor: [170, 2]
})



//create and add marker

L
.marker([spanLat.dataset.lat, spanLng.dataset.lng], { icon })
.addTo(map)

function selectImage(event) {
    const button = event.currentTarget
    const buttons = document.querySelectorAll(".images button")
    buttons.forEach((button) => {
        button.classList.remove("active")
    })
    button.classList.add("active")

    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")
    imageContainer.src = image.src

}


