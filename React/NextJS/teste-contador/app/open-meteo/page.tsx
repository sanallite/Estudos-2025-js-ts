import { fetchWeatherApi } from "openmeteo"

export default async function MeteoTeste() {
    const params = {
        latitude: -25.4278,
        longitude: -49.2731,
        current: ["temperature_2m", "rain", "is_day", "weather_code"],
        timezone: "auto",
        forecast_days: 1,
    }
    const url = "https://api.open-meteo.com/v1/forecast"
    const responses = await fetchWeatherApi(url, params)

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0]

    // Attributes for timezone and location
    const latitude = response.latitude()
    const longitude = response.longitude()
    const elevation = response.elevation()
    const timezone = response.timezone()
    const timezoneAbbreviation = response.timezoneAbbreviation()
    const utcOffsetSeconds = response.utcOffsetSeconds()

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    )

    const current = response.current()!

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            rain: current.variables(1)!.value(),
            is_day: current.variables(2)!.value(),
            weather_code: current.variables(3)!.value()
        },
    }

    // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
    console.log(
        `\nCurrent time: ${weatherData.current.time}\n`,
        `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
        `\nCurrent rain: ${weatherData.current.rain}`,
        `\nCurrent is_day: ${weatherData.current.is_day}`,
        `\nCurrent cloud_cover: ${weatherData.current.weather_code}`
    )

    const parteDia = weatherData.current.is_day === 1 ? 'dia' : 'noite'
    const temperatura = weatherData.current.temperature_2m.toPrecision(2)

    return (
        <main>
            <h1>Testando a API Open-Meteo</h1>
            <p>Agora está de {parteDia}, a temperatura é {temperatura}°</p>
        </main>
    )
}