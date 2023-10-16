export interface IColumns {
    title: string,
    dataIndex: string,
    key: string
}

export interface IDropdownListContent {
    id: number,
    name: string,
    active: boolean
}

export interface ITableAnswer {
    count: number,
    next: string | null,
    previous: string | null
    results: ITableRow[] 
}

export interface ITableHome {
    number: number;
    name: string;
    api: string;
    button: string
}

export interface ITableRow extends IFilms, IPeople, IVehicles, IStarships, IPlanets, ISpecies {}

export interface IPeople {
    number?: number,
    name: string,
    height: string,
    mass: string,
    birth_year: string, 
    gender: string, 
    created: string,
    edited: string
}

export interface IVehicles {
    number?: number,
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string, 
    vehicle_class: string, 
    created: string,
    edited: string
}

export interface IStarships {
    number?: number,
    name: string,
    model: string,
    cost_in_credits: string,
    length: string, 
    consumables: string, 
    created: string,
    edited: string
}

export interface IPlanets {
    number?: number,
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string, 
    climate: string, 
    created: string,
    edited: string
}

export interface ISpecies {
    number?: number,
    name: string,
    classification: string,
    designation: string,
    average_height: string, 
    average_lifespan: string, 
    created: string,
    edited: string
}

export interface IFilms {
    number?: number,
    title: string,
    episode_id: string,
    opening_crawl: string,
    director: string, 
    producer: string, 
    created: string,
    edited: string
}
