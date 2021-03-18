export default class CountriesService {
  countryUrl = 'https://travel-react-app.herokuapp.com/country';
  countryUrl1 = 'http://localhost:3000/country';

  async getResource(url?: string) {
    const res = await fetch(`${this.countryUrl}${url ? url : ''}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`could not fetch ${url}`);
    }

    return data;
  }

  async updateRating(ratingData: {
    countryId: string;
    placeIndex: string;
    newRating: number;
    userLogin: string;
  }) {
    const res = await fetch(`${this.countryUrl}/rating`, {
      method: 'PUT',
      body: JSON.stringify(ratingData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`could not fetch `);
    }

    return data;
  }

  async getAllCountry() {
    return await this.getResource();
  }
}
