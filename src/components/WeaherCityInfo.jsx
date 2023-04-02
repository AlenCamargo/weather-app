import styles from "./WeatherApp.module.css";

const WeatherCityInfo = ({ request }) => {
  return (
    <div className="infoCity">
      <div className={styles.title}>
        <h1>{request.location.name}</h1>
        <span>{request.location.country}</span>
      </div>

      <div className={styles.weather}>
        <img
          className={styles.weatherState}
          src={request.current.condition.icon}
          alt="Clima"
        />

        <div>
          <span className={styles.condition}>
            {request.current.condition.text}
          </span>
          <span className={styles.temp}>{`${request.current.temp_c}°`}</span>
        </div>
      </div>

      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d132646.1357213936!2d${request.location.lon}!3d${request.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1678496579759!5m2!1ses!2sco`}
        width="400"
        height="400"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default WeatherCityInfo;
