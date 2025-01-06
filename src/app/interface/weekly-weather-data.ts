export interface WeeklyWeatherData {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: ListWeeklyWeatherData[];
}

export interface ListWeeklyWeatherData {
  dt: number; // Timestamp Unix do dia da previsão
  sunrise: number; // Timestamp Unix do nascer do sol
  sunset: number; // Timestamp Unix do pôr do sol
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number; // Pressão atmosférica em hPa
  humidity: number; // Umidade relativa em porcentagem
  weather: Array<{
    id: number; // Código da condição climática
    main: string; // Resumo da condição climática
    description: string; // Descrição detalhada
    icon: string; // Código do ícone representando o tempo
  }>;
  speed: number; // Velocidade do vento em m/s
  deg: number; // Direção do vento em graus
  gust: number; // Velocidade das rajadas de vento
  clouds: number; // Percentual de cobertura de nuvens
  pop: number; // Probabilidade de precipitação (0 a 1)
  rain?: number; // Quantidade de chuva em mm (opcional)
}
