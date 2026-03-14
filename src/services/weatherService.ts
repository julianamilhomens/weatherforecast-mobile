import { WeatherData, WeatherError } from "@/types/weather";
import axios from "axios";


export type WeatherResult =
    { success: true; data: WeatherData } | { success: false; error: string }

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        lang: 'pt_br',
        units: 'metric'
    },

    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }

})

const getErrorMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 400:

            return 'Requisição inválida';

        case 401:

            return 'Chave de acesso inválida';

        case 404:

            return 'Cidade não encontrada';

        case 429:

            return 'Servidor sobrecarregado, tente novamente mais tarde';

        case 500:

            return 'Erro interno no servidor, tente novamente mais tarde';

        case 503:

            return 'Servidor temporariamente indisponível';

        default:

            return 'Error ao buscar clima, tente novamente';

    }


}

export const getCurrentWeather = async (cityName: string): Promise<WeatherResult> => {
    try {

        const trimmedCity = cityName.trim()
        if (!trimmedCity) {
            return {
                success: false,
                error: 'Cidade não informada'
            }
        }

        const response = await api.get<WeatherData>('/weather', {
            params: {
                q: trimmedCity
            }
        })

        return {
            success: true,
            data: response.data
        }

    } catch (err) {

        if (axios.isAxiosError<WeatherError>(err)) {
            if (err.response) {
                return {
                    success: false,
                    error: getErrorMessage(err.response.status)
                }
            } else if (err.request) {
                return {
                    success: false,
                    error: 'Sem conexão com o servidor, tente novamente'
                }
            }
            else {
                return {
                    success: false,
                    error: 'Erro ao buscar clima, tente novamente mais tarde'
                }
            }

        }

        return {
            success: false,
            error: 'Erro ao buscar clima'
        }
    }
}

export const getCurrentWeatherByCoords = async (latitude: number, longitude: number): Promise<WeatherResult> => {
    try {
        const response = await api.get<WeatherData>('/weather', {
            params: {
                lat: latitude,
                lon: longitude
            }

        })

        return {
            success: true,
            data: response.data
        }

    } catch (err) {
        if (axios.isAxiosError<WeatherError>(err)) {
            if (err.response) {
                return {
                    success: false,
                    error: getErrorMessage(err.response.status)
                }
            } else if (err.request) {
                return {
                    success: false,
                    error: 'Sem conexão com o servidor, tente novamente'
                }
            }
        }

        return {
            success: false,
            error: 'Erro ao buscar clima'
        }
    }
}

export const getWeatherIcon = async (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
