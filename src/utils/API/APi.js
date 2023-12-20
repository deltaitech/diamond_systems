import axios from "axios";
export const baseURL = {
localhost : "http://127.0.0.1:8000/api/",
demo : "https://demoyoursite.xyz/mohamed/diamond-systems/public/api/",
}
    
export const api = axios.create({
    baseURL: baseURL.demo
  });

  export const homeAPI = async (lang, { rejectWithValue }) => {
    const response = await api
      .get("home", {
        headers: {
          locale: lang,
        },
      })
      .then((res) => {
        // console.log(res.data);
        return res.data.data;
      })
      .catch((err) => {
        // console.log(err.response);
        // return rejectWithValue(err.response.data.data);
        return rejectWithValue(err.message);
      });
    return response;
  }

  export const serviceAPI = async ({lang, searchParams={}}, { rejectWithValue }) => {
    const response = await api
      .get("services", {
        headers: {
          locale: lang,
        },
        params:{
          ...searchParams,
        }
      })
      .then((res) => {
        // console.log(res.data);
        return res.data.data;
      })
      .catch((err) => {
        // console.log(err.response);
        // return rejectWithValue(err.response.data.data);
        return rejectWithValue(err.message);
      });
    return response;
  }

  export const settingsAPI =async (lang, { rejectWithValue }) => {
    const response = await api
      .get("/settings", {
        headers: {
          locale: lang,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        return res.data.data;
      })
      .catch((err) => {
        // console.log(err.response)
        return rejectWithValue(err.message);
      });
    return response;
  }