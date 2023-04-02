import { useEffect, useState } from "react";
import Loader from "./Loader";
import WeatherCityInfo from "./WeaherCityInfo";
import styles from "./WeatherApp.module.css";
const WeatherApp = () => {
  const [nameCity, setNameCity] = useState("");
  const [request, setRequest] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = `Weather | ${request?.location.name ?? ""}`;
  }, [request]);

  useEffect(() => {
    loadInfo();
  }, []);

  const handleChange = (e) => {
    let city = e.target.value;

    setNameCity(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameCity) {
      loadInfo(nameCity);

      setNameCity("");
    } else {
      alert("No ingresaste un dato");
    }
  };

  const loadInfo = (city = "medellin") => {
    setLoader(true);
    setTimeout(() => {
      apiWeatherConection(city);
    }, 2000);
  };

  const apiWeatherConection = async (name = "Medellin") => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 4000);

      const URL = `${import.meta.env.VITE_URL_API}key=${
        import.meta.env.VITE_API_KEY
      }&q=${name}&aqi=no`;

      const res = await fetch(URL, { signal: controller.signal });

      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
      }

      let json = await res.json();

      setRequest(json);
    } catch (err) {
      if (err.name == "AbortError") {
        // se maneja el abort()
        alert("Aborted!");
      } else {
        alert("Lugar no encontrado");
      }
    }

    setLoader(false);
  };
  return (
    <div className={styles.weatherApp}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputCity}
          onChange={handleChange}
          type="text"
          value={nameCity}
        />
      </form>
      {loader ? (
        <Loader />
      ) : request ? (
        <WeatherCityInfo request={request} />
      ) : (
        <h2>No encontrado</h2>
      )}
    </div>
  );
};

export default WeatherApp;
