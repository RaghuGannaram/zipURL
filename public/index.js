async function createShortURL(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonFormData = JSON.stringify(plainFormData);

    if (plainFormData.url.length === 0) {
        document.querySelector(".warning").style.visibility = "visible";
        return;
    }

    try {
        const response = await fetch("/api/v1/generate-hash", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: jsonFormData,
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const { hash } = await response.json();
        const shortURL = `${window.location.origin}/${hash}`;
        document.querySelector(".result").innerHTML = `
        <a href= ${shortURL} target="_blank">${shortURL} </a>
        <i onclick="copyToClipBoard()" class="fa fa-clone clone-icon" aria-hidden="true"></i>
      `;
        return;
    } catch (err) {
        console.error("Error:", err);
    }
}

function copyToClipBoard() {
    const copiedText = document.querySelector(".result a").innerText;
    navigator.clipboard.writeText(copiedText);
}

function inputHandler(event) {
    if (event.target.value.length > 0) {
        document.querySelector(".warning").style.visibility = "hidden";
    }
}
