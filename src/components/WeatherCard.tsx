import { getWeatherIcon } from "@/services/weatherService"
import { weatherCardStyles } from "@/styles/weathercard.styles"
import { WeatherData } from "@/types/weather"
import { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"

interface WeatherProps {
    weather: WeatherData
}

export default function WeatherCard({ weather }: WeatherProps) {
    const [iconUri, setIconUri] = useState<string | null>(null)

    useEffect(() => {
        const loadIcon = async () => {
            const uri = await getWeatherIcon(weather.weather[0].icon)
            setIconUri(uri)
        }
        loadIcon()
    }, [weather])

    return (
        <View style={weatherCardStyles.card}>
            <Text style={weatherCardStyles.cityName}>{weather.name}</Text>

            {iconUri && (
                <Image
                    source={{ uri: iconUri }}
                    style={weatherCardStyles.weatherIcon}
                />
            )}

            <Text style={weatherCardStyles.temperature}>
                {Math.round(weather.main.temp)} °C
            </Text>

            {weather.weather[0] && (
                <Text style={weatherCardStyles.description}>
                    {weather.weather[0].description}
                </Text>
            )}

            <View style={weatherCardStyles.detailsContainer}>

                <View style={weatherCardStyles.detailsItems}>
                    <Text style={weatherCardStyles.detailsLabel}>Sensação Térmica:</Text>
                    <Text style={weatherCardStyles.detailsValue}>{Math.round(weather.main.feels_like)} °C</Text>
                </View>

                <View style={weatherCardStyles.detailsItems}>
                    <Text style={weatherCardStyles.detailsLabel}>Umidade:</Text>
                    <Text style={weatherCardStyles.detailsValue}>{weather.main.humidity}%</Text>
                </View>

                <View style={weatherCardStyles.detailsItems}>
                    <Text style={weatherCardStyles.detailsLabel}>Vento:</Text>
                    <Text style={weatherCardStyles.detailsValue}>{weather.wind.speed} m/s</Text>
                </View>

            </View>
        </View>
    )
}