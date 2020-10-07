export type Query = {
  source: "quotes" | "niilo",
  fullList: boolean,
  searchParam: string | number
}

export type Quote = {
  _id: string,
  text: string,
  number: number
}

export type Source = 'niilo' | 'quotes';