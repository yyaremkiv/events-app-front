export const ListCity = ({ data }) => {
  return (
    <div>
      <p
        style={{
          fontSize: "1,5rem",
          fontWeight: "bold",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        List of cities
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {data?.map(({ city, country, population }) => (
          <li
            key={city}
            style={{
              display: "flex",
              gap: "1rem",
              border: "1px solid green",
            }}
          >
            <p>City: {city}</p>
            <p>Country: {country}</p>
            <p>Population: {population}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
