"use server";

import { getAllCitiesInWorld, getCountries } from "@countrystatecity/countries";

let cachedCities: { name: string; country: string }[] | null = null;

async function loadAllCities() {
  if (cachedCities) return cachedCities;

  const [countries, allCities] = await Promise.all([getCountries(), getAllCitiesInWorld()]);

  const countryMap = new Map(countries.map((c) => [c.iso2, c.name]));

  cachedCities = allCities.map((city) => ({
    name: city.name,
    country: countryMap.get(city.country_code) ?? city.country_code,
  }));

  return cachedCities;
}

export async function searchCities(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const cities = await loadAllCities();
  const lowerQuery = query.toLowerCase();

  const seen = new Set<string>();
  const matches: string[] = [];

  for (const c of cities) {
    if (matches.length >= 50) break;
    if (!c.name.toLowerCase().includes(lowerQuery)) continue;
    const entry = `${c.name}, ${c.country}`;
    if (seen.has(entry)) continue;
    seen.add(entry);
    matches.push(entry);
  }

  return matches;
}
