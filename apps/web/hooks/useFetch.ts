"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [info, setInfo] = useState({
    data: null,
    error: "",
    loading: true,
  });

  async function fetchingInfo() {
    setInfo((prev) => ({ ...prev, loading: true })); // Set loading at start
    try {
      const response = await axios.get(url);
      const result = response?.data?.message;
      setInfo({ data: result, error: "", loading: false }); // set everything at once
    } catch (error: any) {
      setInfo({
        data: [],
        error: error?.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  }

  useEffect(() => {
    fetchingInfo();
  }, [url]);

  return info;
};
