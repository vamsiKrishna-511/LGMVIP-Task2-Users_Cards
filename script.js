const url = "https://reqres.in/api/users?page=1";

async function getData(url) {
    const getUserButton = document.querySelector('#get-users-btn');
    const loadingAnimation = document.querySelector('#loading-animation');
    const userCardContainer = document.getElementById("user-card-container");
    const userCardTemplate = document.getElementById("user-card-template");

    getUserButton.disabled = true; // Disable the button during loading
    loadingAnimation.style.display = 'block'; // Show the loading animation

    try {
        const res = await fetch(url);
        const userData = await res.json();

        // Simulate a delay of 2 seconds before displaying the data
        setTimeout(() => {
            bindData(userData.data);
            loadingAnimation.style.display = 'none'; // Hide the loading animation
            getUserButton.disabled = false; // Enable the button after loading
        }, 2000);
    } catch (error) {
        console.error("Error:", error);
        loadingAnimation.style.display = 'none'; // Hide the loading animation in case of an error
        getUserButton.disabled = false; // Enable the button after loading
    }

    function bindData(data) {
        userCardContainer.innerHTML = "";

        data.forEach((data) => {
            if (!data.avatar) return;
            const userCardClone = userCardTemplate.content.cloneNode(true);
            fillDataInCard(userCardClone, data);
            userCardContainer.appendChild(userCardClone);
        });
    }

    function fillDataInCard(userCardClone, data) {
        const userImage = userCardClone.querySelector("#user-image");
        const userName = userCardClone.querySelector('#user-name');
        const userEmailId = userCardClone.querySelector("#user-email");
        userImage.src = data.avatar;
        userName.innerHTML = `${data.first_name} ${data.last_name}`;
        userEmailId.href = `mailto:${data.email}`;
        userEmailId.innerHTML=data.email;
    }
}

const getUserButton = document.querySelector('#get-users-btn');
getUserButton.addEventListener('click', () => {
    getData(url);
});