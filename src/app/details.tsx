import WeatherCard from "@/components/WeatherCard";
import { getCurrentWeather } from "@/services/weatherService";
import { detailsStyles } from "@/styles/details.styles";
import { WeatherData } from "@/types/weather";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Details() {
    const [loading, setLoading] = useState<boolean>(false)
    const [WeatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter();
    const { cityName } = useLocalSearchParams<{ cityName: string }>()

    useEffect(() => {
        if (cityName) getWeatherData()
    }, [cityName])

    const getWeatherData = async () => {
        setLoading(true)
        setError(null)

        const result = await getCurrentWeather(cityName as string)

        setLoading(false)

        if (result.success) {
            setWeatherData(result.data)
        } else {
            setError(result.error)
        }
    }


    return (
        <SafeAreaView style={detailsStyles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={detailsStyles.container}>
                <TouchableOpacity style={detailsStyles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={20} color="#5596E3" />
                    <Text style={detailsStyles.backButtonText}>
                        Voltar
                    </Text>
                </TouchableOpacity>

                <View style={detailsStyles.header}>
                    <Text style={detailsStyles.title}> Clima Atual </Text>
                    <Text style={detailsStyles.subTitle}> Buscando: {cityName}</Text>
                </View>

                {loading && (
                    <View style={detailsStyles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4A90E2" />
                        <Text style={detailsStyles.loadingText}>Carregando...</Text>
                    </View>
                )}

                {!loading && error && (
                    <View style={detailsStyles.errorContainer}>
                        <Text style={detailsStyles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={getWeatherData} style={detailsStyles.retryButton}>
                            <Text style={detailsStyles.retryButtonText}>Tentar Novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!loading && !error && WeatherData && (
                    <WeatherCard weather={WeatherData} />
                )}
            </ScrollView>

        </SafeAreaView>
    )
}