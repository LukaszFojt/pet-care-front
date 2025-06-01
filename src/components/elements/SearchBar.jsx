import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useTranslation } from "../../TranslationContext";
import { BetterSelect } from './index';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [selectedService, setSelectedService] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState(1);
  const [selectedCity, setSelectedCity] = useState(1);
  const [startDate, setStartDate] = useState(DateTime.now());
  const [endDate, setEndDate] = useState(DateTime.now().plus({ days: 1 }));
  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectServiceOption = (optionId) => {
    setSelectedService(optionId);
  };

  const selectAnimalOption = (optionId) => {
    setSelectedAnimal(optionId);
  };

  const getFormattedDate = (date) => {
    if (typeof date === 'string') return date;
    return DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd');
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("Service", selectedService)
    params.append("Animal", selectedAnimal);
    params.append("City", selectedCity);
    params.append("DataStart", getFormattedDate(startDate));
    params.append("DataEnd", getFormattedDate(endDate));

    navigate(`/posts?${params.toString()}`);
  };

  const serviceOptions = [
    { id: 1, name: t("All services") },
    { id: 2, name: t("Accomodation") },
    { id: 3, name: t("Home visit") },
    { id: 4, name: t("Walk") },
  ];

  const animalOptions = [
    { id: 1, name: t("All pets") },
    { id: 2, name: t("Dog") },
    { id: 3, name: t("Cat") },
  ];

  const cityOptions = [
    { id: '', name: t("All cities") },
    { id: 1, name: t("Warsaw") },
    { id: 2, name: t("Kraków") },
    { id: 3, name: t("Łódź") },
    { id: 4, name: t("Wrocław") },
    { id: 5, name: t("Poznań") },
    { id: 6, name: t("Gdańsk") },
    { id: 7, name: t("Szczecin") },
    { id: 8, name: t("Bydgoszcz") },
    { id: 9, name: t("Lublin") },
    { id: 10, name: t("Białystok") },
    { id: 11, name: t("Katowice") },
    { id: 12, name: t("Gdynia") },
    { id: 13, name: t("Częstochowa") },
    { id: 14, name: t("Rzeszów") },
    { id: 15, name: t("Radom") },
    { id: 16, name: t("Toruń") },
    { id: 17, name: t("Sosnowiec") },
    { id: 18, name: t("Kielce") },
    { id: 19, name: t("Gliwice") },
    { id: 20, name: t("Olsztyn") },
    { id: 21, name: t("Bielsko-Biała") },
    { id: 22, name: t("Zabrze") },
    { id: 23, name: t("Bytom") },
    { id: 24, name: t("Zielona Góra") },
    { id: 25, name: t("Rybnik") },
    { id: 26, name: t("Ruda Śląska") },
    { id: 27, name: t("Opole") },
    { id: 28, name: t("Tychy") },
    { id: 29, name: t("Gorzów Wielkopolski") },
    { id: 30, name: t("Dąbrowa Górnicza") },
    { id: 31, name: t("Elbląg") },
    { id: 32, name: t("Płock") },
    { id: 33, name: t("Koszalin") },
    { id: 34, name: t("Tarnów") },
    { id: 35, name: t("Wałbrzych") },
    { id: 36, name: t("Włocławek") },
    { id: 37, name: t("Chorzów") },
  ];

  return (
    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-md z-999">
      {/* Service options */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {serviceOptions.map((option) => (
          <button
            key={option.id}
            className="field"
            onClick={() => selectServiceOption(option.id)}
            style={{
              backgroundColor: selectedService === option.id ? 'var(--light-details)' : 'var(--white)',
            }}
          >
            {option.name}
          </button>
        ))}
      </div>

      {/* Search inputs */}
      <div className="flex flex-wrap gap-3 items-center">
        {animalOptions.map((option) => (
          <button
            key={option.id}
            className="field"
            onClick={() => selectAnimalOption(option.id)}
            style={{
              backgroundColor: selectedAnimal === option.id ? 'var(--light-details)' : 'var(--white)',
            }}
          >
            {option.name}
          </button>
        ))}

        <input
          type="date"
          className="input-field"
          value={getFormattedDate(startDate)}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="input-field"
          value={getFormattedDate(endDate)}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <BetterSelect
          options={cityOptions}
          value={selectedCity}
          onChange={setSelectedCity}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
        />

        <button className="button accent-button icon-button" onClick={handleSearch}>
          <div className="flex justify-center items-center gap-1">
            <span className="icons">search</span>
            <span>{t("Search")}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
