import { useState, useEffect, useCallback } from 'react';

const useMovies = (initialYear, apiKey) => {
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [loadingMore, setLoadingMore] = useState(true);
  const [sections, setSections] = useState([{ title: currentYear, data: [] }]);
  const [genreData, setGenreData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredSections, setFilteredSections] = useState([{ title: currentYear, data: [] }]);

  const getApiUrl = useCallback((year) => {
    return `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
  }, [apiKey]);

  const fetchMovies = useCallback(async (year) => {
    try {
      const response = await fetch(getApiUrl(year));
      const data = await response.json();
      console.log('data', data, year)
      setSections((prevSections) => {
        const newSections = [...prevSections];
        const existingSection = newSections.find((section) => section.title === year);

        if (existingSection) {
          existingSection.data = [...existingSection.data, ...data.results];
        } else {
          newSections.push({ title: year, data: data.results });
        }

        return newSections;
      });
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadingMore(false);
    }
  }, [currentYear]);

  const filterDataByCategory = useCallback((selectedCategory) => {
    if (!sections || !sections[0] || !sections[0].data) {
      console.error('Sections or data is undefined');
      return [];
    }

    const filteredSections = sections.map((section) => {
      const filteredData = section.data.filter((item) =>
        selectedCategory.every((category) => item.genre_ids.includes(category.id))
      );

      if (filteredData.length > 0) {
        return { title: section.title, data: filteredData };
      }

      return null;
    }).filter(Boolean);

    setFilteredSections(filteredSections);
  }, [sections, setFilteredSections]);

  const handleEndReached = useCallback(() => {
    console.log('inside handelendreacged')
    if (!loadingMore && currentYear <= 2023) {
      setLoadingMore(true);
      const newYear = currentYear + (currentYear < new Date().getFullYear() ? 1 : -1);
      setCurrentYear(newYear);
      fetchMovies(newYear);
      setLoadingMore(false);
    }
  }, [loadingMore, currentYear, fetchMovies]);

  const handleGenreData = useCallback((data) => {
    setGenreData(data);
  }, [setGenreData]);

  const handleCategory = useCallback((category) => {
    setSelectedCategory(category);
    filterDataByCategory(category);
  }, [setSelectedCategory, filterDataByCategory]);

  useEffect(() => {
    if (!loadingMore) {
        return;
      }
    fetchMovies(currentYear);
  }, [fetchMovies, currentYear, loadingMore]);

  return {
    currentYear,
    loadingMore,
    sections,
    genreData,
    selectedCategory,
    filteredSections,
    handleEndReached,
    handleGenreData,
    handleCategory,
  };
};

export default useMovies;