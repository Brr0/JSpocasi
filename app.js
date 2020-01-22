window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/04c15bafd3a4de9576e77051b5a5872a/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //přepočet stupňů
                    const celsius = (temperature - 32) * (5 / 9);
                    setIcons(icon, document.querySelector('.icon'));
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = (0.01 * (Math.round(celsius * 100)));
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = (0.01 * (Math.round(celsius * 100)));
                        }
                    });
                });
        });
    } else {
        h1.textContent = "Tohle nefunguje z určitých důvodů"
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});