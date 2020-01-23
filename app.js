window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    var loading = document.getElementById("loading");
    loading.width = window.innerWidth;
    loading.height = window.innerHeight;
    
    var ctx = document.getElementById('loading').getContext('2d');
    var al = 0;
    var start = 4.72;
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height; 
    var diff;
    function progressSim(){
        diff = ((al / 100) * Math.PI*2*10).toFixed(2);
        ctx.clearRect(0, 0, cw, ch);
        ctx.lineWidth = 10;
        ctx.fillStyle = '#09F';
        ctx.strokeStyle = "#09F";
        ctx.textAlign = 'center';
        ctx.fillText(al+'%', cw*.5, ch*.5+2, cw);
        ctx.beginPath();
        ctx.arc(cw*.5, ch*.5, 30, start, diff/10+start, false);
        ctx.stroke();
        if(al >= 100){
            ctx.fillStyle = '#09F';
            clearTimeout(sim);
            ctx.font = '40px arial';
            ctx.fillText("weather loaded", cw*.5, ch*.5+100, cw);
        }
        al++;
    }
    var sim = setInterval(progressSim, 25);

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
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //přepočet stupňů
                    const celsius = (temperature - 32) * (5 / 9);
                    setIcons(icon, document.querySelector('.icon'));
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = ((Math.round(celsius * 100)) / 100);
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = ((Math.round(celsius * 100)) / 100);
                        }
                    });
                });
        });
    } else {
        h1.textContent = "Tohle nefunguje z určitých důvodů"
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});