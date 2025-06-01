import React, { useState, useEffect } from 'react';
import api from '../api';
import { DateTime } from 'luxon';
import { useTranslation } from '../TranslationContext';
import { BetterSelect } from './elements';
import { useDialog } from "../DialogContext";

const Filters = ({ initialFilters = {} }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || '');
  const [dateStart, setDateStart] = useState(initialFilters?.DataStart || '');
  const [dateEnd, setDateEnd] = useState(initialFilters?.DataEnd || '');
  const [service, setService] = useState(initialFilters?.Service || '');
  const [animal, setAnimal] = useState(initialFilters?.Animal || '');
  const [city, setCity] = useState(initialFilters?.City || '');
  const { openDialog, openAlert } = useDialog();

  const serviceOptions = [
    { id: '', name: t("All services") },
    { id: 2, name: t("Accomodation") },
    { id: 3, name: t("Home visit") },
    { id: 4, name: t("Walk") },
  ];

  const animalOptions = [
    { id: '', name: t("All pets") },
    { id: 2, name: t("Dog") },
    { id: 3, name: t("Cat") },
  ];

  const cityOptions = [
    { id: '', name: t("All cities") },
    { id: 2, name: t("Warsaw") },
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
    { id: 38, name: t("Kraków") },
  ];

  useEffect(() => {
    getFilteredPosts();
  }, [searchTerm, dateStart, dateEnd, service, animal, city]);

  async function getFilteredPosts() {
    try {
      const filters = [];

      if (searchTerm.trim()) {
        filters.push({ filterName: "ContainsName", filterValue: searchTerm });
      }
      if (dateStart) {
        filters.push({ filterName: "DateStart", filterValue: dateStart });
      }
      if (dateEnd) {
        filters.push({ filterName: "DateEnd", filterValue: dateEnd });
      }
      if (service) {
        filters.push({ filterName: "HasAnyService", filterValue: String(service) });
      }
      if (animal) {
        filters.push({ filterName: "HasAnyAnimal", filterValue: String(animal) });
      }
      if (city) {
        filters.push({ filterName: "HasAnyCity", filterValue: String(city) });
      }

      const response = await api.post(`/posts/getFiltered`, filters);
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (e) {
      console.error("Error occurred:", e);
    }
  }

  const openAddOrderDialog = () => {
    openDialog("AddOrderDialog", {
      onSave: async (formData) => {
        try {
          await api.post(`/orders/add`, formData);
          openAlert(t("Order added successfully!"));
        } catch (e) {
          openAlert(t("An error occurred while adding order."));
          console.error(e);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("Filter posts")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder={t("Search by name...")}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input col-span-2"
          />

          <input
            type="date"
            value={dateStart}
            onChange={e => setDateStart(e.target.value)}
            className="input"
          />

          <input
            type="date"
            value={dateEnd}
            onChange={e => setDateEnd(e.target.value)}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <BetterSelect
            options={serviceOptions}
            value={service}
            onChange={val => setService(val)}
            getOptionLabel={o => o.name}
            getOptionValue={o => o.id}
          />

          <BetterSelect
            options={animalOptions}
            value={animal}
            onChange={val => setAnimal(val)}
            getOptionLabel={o => o.name}
            getOptionValue={o => o.id}
          />

          <BetterSelect
            options={cityOptions}
            value={city}
            onChange={val => setCity(val)}
            getOptionLabel={o => o.name}
            getOptionValue={o => o.id}
          />
        </div>

        <ul className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <li key={post.id} className="p-4 border rounded-2xl shadow-md bg-slate-50">
                <div className="font-bold text-lg mb-2">{post.name}</div>
                <div className="mb-1">{post.description}</div>
                <div className="text-sm text-gray-500">
                  {t("Data utworzenia")}: {DateTime.fromISO(post.created).toFormat('dd.MM.yyyy, HH:mm')}
                </div>
                <img
                  src={`http://localhost:5000${post.imagePath}`}
                  alt={post.name}
                  className="mt-3 max-h-60 object-cover rounded-xl"
                />
                <button className='button accent-button' onClick={openAddOrderDialog}>{t("Add order")}</button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">{t("No results found.")}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
