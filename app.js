window.addEventListener('load', () => {

    const d = document,
        c = console.log;

    let long,
        lat,
        temperatureDescription = d.querySelector('.temperature-description'),
        temperatureDegree = d.querySelector('.temperature-degree'),
        locationTimezone = d.querySelector('.location-timezone'),
        temperatureSection = d.querySelector('.temperature'),
        temperatureSpan = d.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/9d19e09b86cbba5b7c38d3975f475ef9/${lat},${long}`

            fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                c(data)
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Set Icon
                setIcons(icon, d.querySelector('.icon'));
                // Change temperature to Celsius/Farrenheit
                temperatureSection.addEventListener('click', () => {
                    temperatureSpan.textContent === 'F' ? temperatureSpan.textContent = 'C' : temperatureSpan.textContent = 'F'
                })                

            });

        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
});