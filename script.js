document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(properties => {
            const propertyList = document.getElementById("property-list");
            properties.forEach(property => {
                const propertyDiv = document.createElement("div");
                propertyDiv.classList.add("property");
                propertyDiv.innerHTML = `<h2>${property.title}</h2><p>${property.price}</p>`;
                propertyDiv.onclick = () => openModal(property);
                propertyList.appendChild(propertyDiv);
            });

            const modal = document.getElementById("property-modal");
            const closeButton = document.querySelector(".close-button");
            closeButton.onclick = () => modal.style.display = "none";
            
            document.getElementById("reservation-form").onsubmit = (event) => {
                event.preventDefault();
                alert("Viewing booked! We'll contact you soon.");
                modal.style.display = "none";
            };
        })
        .catch(error => console.error('Error loading properties:', error));
});

function openModal(property) {
    document.getElementById("modal-title").innerText = property.title;
    document.getElementById("modal-price").innerText = property.price;
    document.getElementById("modal-energy-rating").innerText = `Energy Rating: ${property.energyRating}`;
    document.getElementById("modal-details").innerText = property.details;
    
    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = "";
    property.features.forEach(feature => {
        const li = document.createElement("li");
        li.innerText = feature;
        featuresList.appendChild(li);
    });

    const mediaDiv = document.getElementById("modal-media");
    mediaDiv.innerHTML = "";
    property.images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = `${property.title} - Image`;
        img.style.width = "100px";
        img.style.margin = "5px";
        mediaDiv.appendChild(img);
    });
    property.videos.forEach(video => {
        const vid = document.createElement("video");
        vid.src = video;
        vid.controls = true;
        vid.style.width = "100%";
        mediaDiv.appendChild(vid);
    });

    document.getElementById("property-modal").style.display = "block";
}