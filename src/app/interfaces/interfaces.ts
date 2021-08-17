export interface Characters{
    info: Info;
    results: Results[];
}

export interface Info{
    count: number;
    next:  string;
    pages: number;
    prev: number;
}

export interface Results{
    created: string;
    episode: string[];
    gender: string;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Location;
    species: string;
    status: string;
    type: string;
    url: string;
}

export interface Location{
    name: string;
    url:  string;
}

export interface Menu{
    icon: string;
    name: string;
    redirectTo: string;
  }
