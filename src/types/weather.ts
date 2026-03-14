export interface Main {
    temp: number; 
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
}


export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string; 
}


export interface Wind {
    speed: number;
    deg: number;
}


export interface WeatherData {
    name: string;
    main: Main;
    weather: Weather[];
    wind: Wind;
    dt: number;
    sys: {
        country: string;
    };
    cod: number;
}

export interface WeatherError {
    cod: string | number;
    message: string;
}