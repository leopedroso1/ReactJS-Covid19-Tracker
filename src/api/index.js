// fetches information from API - This should be backend task
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let changableURL = url;

  if (country) {
    changableURL = `${url}/countries/${country}`;
  }

  try {
    // Get API data with axios --> We will destructure a lot now!
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changableURL);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    };

    /* The code above means the same below
    const modifiedData = {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate
    };

      return modifiedData;
    */
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    // data is an array so we need to use map function
    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);

    return countries.map(country => country.name);
  } catch (error) {
    console.log(error);
  }
};
