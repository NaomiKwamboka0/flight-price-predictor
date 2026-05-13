// ==================== WORLDWIDE AIRPORT DATABASE ====================
// Comprehensive list of major commercial airports worldwide
// Format: { code (IATA), name, city, country, region }

const AIRPORTS_DATABASE = [
    // ==================== NORTH AMERICA ====================
    // United States
    { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', region: 'North America' },
    { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'United States', region: 'North America' },
    { code: 'EWR', name: 'Newark Liberty International', city: 'Newark', country: 'United States', region: 'North America' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States', region: 'North America' },
    { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'United States', region: 'North America' },
    { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'United States', region: 'North America' },
    { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'United States', region: 'North America' },
    { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas', country: 'United States', region: 'North America' },
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'United States', region: 'North America' },
    { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'United States', region: 'North America' },
    { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States', region: 'North America' },
    { code: 'SJC', name: 'Norman Y. Mineta San Jose International', city: 'San Jose', country: 'United States', region: 'North America' },
    { code: 'OAK', name: 'Oakland International', city: 'Oakland', country: 'United States', region: 'North America' },
    { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'United States', region: 'North America' },
    { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States', region: 'North America' },
    { code: 'FLL', name: 'Fort Lauderdale-Hollywood International', city: 'Fort Lauderdale', country: 'United States', region: 'North America' },
    { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'United States', region: 'North America' },
    { code: 'TPA', name: 'Tampa International', city: 'Tampa', country: 'United States', region: 'North America' },
    { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'United States', region: 'North America' },
    { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', country: 'United States', region: 'North America' },
    { code: 'IAD', name: 'Washington Dulles International', city: 'Washington', country: 'United States', region: 'North America' },
    { code: 'DCA', name: 'Ronald Reagan Washington National', city: 'Washington', country: 'United States', region: 'North America' },
    { code: 'BWI', name: 'Baltimore/Washington International', city: 'Baltimore', country: 'United States', region: 'North America' },
    { code: 'CLT', name: 'Charlotte Douglas International', city: 'Charlotte', country: 'United States', region: 'North America' },
    { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix', country: 'United States', region: 'North America' },
    { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'United States', region: 'North America' },
    { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis', country: 'United States', region: 'North America' },
    { code: 'DTW', name: 'Detroit Metropolitan Wayne County', city: 'Detroit', country: 'United States', region: 'North America' },
    { code: 'SLC', name: 'Salt Lake City International', city: 'Salt Lake City', country: 'United States', region: 'North America' },
    { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston', country: 'United States', region: 'North America' },
    { code: 'HOU', name: 'William P. Hobby', city: 'Houston', country: 'United States', region: 'North America' },
    { code: 'AUS', name: 'Austin-Bergstrom International', city: 'Austin', country: 'United States', region: 'North America' },
    { code: 'SAN', name: 'San Diego International', city: 'San Diego', country: 'United States', region: 'North America' },
    { code: 'PDX', name: 'Portland International', city: 'Portland', country: 'United States', region: 'North America' },
    { code: 'STL', name: 'Lambert-St. Louis International', city: 'St. Louis', country: 'United States', region: 'North America' },
    { code: 'CLE', name: 'Cleveland Hopkins International', city: 'Cleveland', country: 'United States', region: 'North America' },
    { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh', country: 'United States', region: 'North America' },
    { code: 'CVG', name: 'Cincinnati/Northern Kentucky International', city: 'Cincinnati', country: 'United States', region: 'North America' },
    { code: 'IND', name: 'Indianapolis International', city: 'Indianapolis', country: 'United States', region: 'North America' },
    { code: 'CMH', name: 'John Glenn Columbus International', city: 'Columbus', country: 'United States', region: 'North America' },
    { code: 'MCI', name: 'Kansas City International', city: 'Kansas City', country: 'United States', region: 'North America' },
    { code: 'MEM', name: 'Memphis International', city: 'Memphis', country: 'United States', region: 'North America' },
    { code: 'BNA', name: 'Nashville International', city: 'Nashville', country: 'United States', region: 'North America' },
    { code: 'MSY', name: 'Louis Armstrong New Orleans International', city: 'New Orleans', country: 'United States', region: 'North America' },
    { code: 'RDU', name: 'Raleigh-Durham International', city: 'Raleigh', country: 'United States', region: 'North America' },
    { code: 'SAT', name: 'San Antonio International', city: 'San Antonio', country: 'United States', region: 'North America' },
    { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'United States', region: 'North America' },
    { code: 'ANC', name: 'Ted Stevens Anchorage International', city: 'Anchorage', country: 'United States', region: 'North America' },
    { code: 'JAX', name: 'Jacksonville International', city: 'Jacksonville', country: 'United States', region: 'North America' },
    { code: 'BUF', name: 'Buffalo Niagara International', city: 'Buffalo', country: 'United States', region: 'North America' },
    { code: 'PBI', name: 'Palm Beach International', city: 'West Palm Beach', country: 'United States', region: 'North America' },
    { code: 'RSW', name: 'Southwest Florida International', city: 'Fort Myers', country: 'United States', region: 'North America' },
    { code: 'SMF', name: 'Sacramento International', city: 'Sacramento', country: 'United States', region: 'North America' },
    { code: 'ABQ', name: 'Albuquerque International Sunport', city: 'Albuquerque', country: 'United States', region: 'North America' },
    { code: 'OKC', name: 'Will Rogers World', city: 'Oklahoma City', country: 'United States', region: 'North America' },
    { code: 'TUS', name: 'Tucson International', city: 'Tucson', country: 'United States', region: 'North America' },

    // Canada
    { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada', region: 'North America' },
    { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada', region: 'North America' },
    { code: 'YUL', name: 'Montréal-Pierre Elliott Trudeau International', city: 'Montreal', country: 'Canada', region: 'North America' },
    { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada', region: 'North America' },
    { code: 'YEG', name: 'Edmonton International', city: 'Edmonton', country: 'Canada', region: 'North America' },
    { code: 'YOW', name: 'Ottawa Macdonald-Cartier International', city: 'Ottawa', country: 'Canada', region: 'North America' },
    { code: 'YHZ', name: 'Halifax Stanfield International', city: 'Halifax', country: 'Canada', region: 'North America' },
    { code: 'YWG', name: 'Winnipeg James Armstrong Richardson International', city: 'Winnipeg', country: 'Canada', region: 'North America' },
    { code: 'YQB', name: 'Québec City Jean Lesage International', city: 'Quebec City', country: 'Canada', region: 'North America' },
    { code: 'YXE', name: 'Saskatoon John G. Diefenbaker International', city: 'Saskatoon', country: 'Canada', region: 'North America' },

    // Mexico
    { code: 'MEX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico', region: 'North America' },
    { code: 'CUN', name: 'Cancún International', city: 'Cancun', country: 'Mexico', region: 'North America' },
    { code: 'GDL', name: 'Guadalajara International', city: 'Guadalajara', country: 'Mexico', region: 'North America' },
    { code: 'MTY', name: 'Monterrey International', city: 'Monterrey', country: 'Mexico', region: 'North America' },
    { code: 'TIJ', name: 'Tijuana International', city: 'Tijuana', country: 'Mexico', region: 'North America' },
    { code: 'PVR', name: 'Puerto Vallarta International', city: 'Puerto Vallarta', country: 'Mexico', region: 'North America' },
    { code: 'SJD', name: 'Los Cabos International', city: 'Los Cabos', country: 'Mexico', region: 'North America' },
    { code: 'MID', name: 'Mérida International', city: 'Merida', country: 'Mexico', region: 'North America' },

    // ==================== CENTRAL AMERICA & CARIBBEAN ====================
    { code: 'SJO', name: 'Juan Santamaría International', city: 'San José', country: 'Costa Rica', region: 'Central America' },
    { code: 'LIR', name: 'Daniel Oduber International', city: 'Liberia', country: 'Costa Rica', region: 'Central America' },
    { code: 'PTY', name: 'Tocumen International', city: 'Panama City', country: 'Panama', region: 'Central America' },
    { code: 'GUA', name: 'La Aurora International', city: 'Guatemala City', country: 'Guatemala', region: 'Central America' },
    { code: 'SAL', name: 'Monseñor Óscar Arnulfo Romero International', city: 'San Salvador', country: 'El Salvador', region: 'Central America' },
    { code: 'TGU', name: 'Toncontín International', city: 'Tegucigalpa', country: 'Honduras', region: 'Central America' },
    { code: 'MGA', name: 'Augusto C. Sandino International', city: 'Managua', country: 'Nicaragua', region: 'Central America' },
    { code: 'BZE', name: 'Philip S. W. Goldson International', city: 'Belize City', country: 'Belize', region: 'Central America' },
    { code: 'HAV', name: 'José Martí International', city: 'Havana', country: 'Cuba', region: 'Caribbean' },
    { code: 'NAS', name: 'Lynden Pindling International', city: 'Nassau', country: 'Bahamas', region: 'Caribbean' },
    { code: 'KIN', name: 'Norman Manley International', city: 'Kingston', country: 'Jamaica', region: 'Caribbean' },
    { code: 'MBJ', name: 'Sangster International', city: 'Montego Bay', country: 'Jamaica', region: 'Caribbean' },
    { code: 'SDQ', name: 'Las Américas International', city: 'Santo Domingo', country: 'Dominican Republic', region: 'Caribbean' },
    { code: 'PUJ', name: 'Punta Cana International', city: 'Punta Cana', country: 'Dominican Republic', region: 'Caribbean' },
    { code: 'SJU', name: 'Luis Muñoz Marín International', city: 'San Juan', country: 'Puerto Rico', region: 'Caribbean' },
    { code: 'POP', name: 'Gregorio Luperón International', city: 'Puerto Plata', country: 'Dominican Republic', region: 'Caribbean' },
    { code: 'BGI', name: 'Grantley Adams International', city: 'Bridgetown', country: 'Barbados', region: 'Caribbean' },
    { code: 'POS', name: 'Piarco International', city: 'Port of Spain', country: 'Trinidad and Tobago', region: 'Caribbean' },
    { code: 'AUA', name: 'Queen Beatrix International', city: 'Oranjestad', country: 'Aruba', region: 'Caribbean' },
    { code: 'CUR', name: 'Hato International', city: 'Willemstad', country: 'Curaçao', region: 'Caribbean' },
    { code: 'GND', name: 'Maurice Bishop International', city: 'St. George', country: 'Grenada', region: 'Caribbean' },
    { code: 'ANU', name: "V. C. Bird International", city: "St. John's", country: 'Antigua and Barbuda', region: 'Caribbean' },
    { code: 'PAP', name: 'Toussaint Louverture International', city: 'Port-au-Prince', country: 'Haiti', region: 'Caribbean' },

    // ==================== SOUTH AMERICA ====================
    { code: 'GRU', name: 'São Paulo/Guarulhos International', city: 'São Paulo', country: 'Brazil', region: 'South America' },
    { code: 'CGH', name: 'São Paulo/Congonhas', city: 'São Paulo', country: 'Brazil', region: 'South America' },
    { code: 'GIG', name: 'Rio de Janeiro/Galeão', city: 'Rio de Janeiro', country: 'Brazil', region: 'South America' },
    { code: 'SDU', name: 'Santos Dumont', city: 'Rio de Janeiro', country: 'Brazil', region: 'South America' },
    { code: 'BSB', name: 'Brasília International', city: 'Brasília', country: 'Brazil', region: 'South America' },
    { code: 'CNF', name: 'Belo Horizonte/Confins International', city: 'Belo Horizonte', country: 'Brazil', region: 'South America' },
    { code: 'FOR', name: 'Fortaleza Pinto Martins International', city: 'Fortaleza', country: 'Brazil', region: 'South America' },
    { code: 'REC', name: 'Recife/Guararapes International', city: 'Recife', country: 'Brazil', region: 'South America' },
    { code: 'SSA', name: 'Salvador International', city: 'Salvador', country: 'Brazil', region: 'South America' },
    { code: 'POA', name: 'Porto Alegre International', city: 'Porto Alegre', country: 'Brazil', region: 'South America' },
    { code: 'CWB', name: 'Curitiba International', city: 'Curitiba', country: 'Brazil', region: 'South America' },
    { code: 'MAO', name: 'Manaus Eduardo Gomes International', city: 'Manaus', country: 'Brazil', region: 'South America' },
    { code: 'EZE', name: 'Ministro Pistarini International', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { code: 'AEP', name: 'Aeroparque Jorge Newbery', city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
    { code: 'COR', name: 'Córdoba International', city: 'Córdoba', country: 'Argentina', region: 'South America' },
    { code: 'MDZ', name: 'Mendoza International', city: 'Mendoza', country: 'Argentina', region: 'South America' },
    { code: 'BRC', name: 'San Carlos de Bariloche International', city: 'Bariloche', country: 'Argentina', region: 'South America' },
    { code: 'SCL', name: 'Arturo Merino Benítez International', city: 'Santiago', country: 'Chile', region: 'South America' },
    { code: 'IPC', name: 'Mataveri International', city: 'Easter Island', country: 'Chile', region: 'South America' },
    { code: 'LIM', name: 'Jorge Chávez International', city: 'Lima', country: 'Peru', region: 'South America' },
    { code: 'CUZ', name: 'Alejandro Velasco Astete International', city: 'Cusco', country: 'Peru', region: 'South America' },
    { code: 'BOG', name: 'El Dorado International', city: 'Bogotá', country: 'Colombia', region: 'South America' },
    { code: 'MDE', name: 'José María Córdova International', city: 'Medellín', country: 'Colombia', region: 'South America' },
    { code: 'CTG', name: 'Rafael Núñez International', city: 'Cartagena', country: 'Colombia', region: 'South America' },
    { code: 'CLO', name: 'Alfonso Bonilla Aragón International', city: 'Cali', country: 'Colombia', region: 'South America' },
    { code: 'UIO', name: 'Mariscal Sucre International', city: 'Quito', country: 'Ecuador', region: 'South America' },
    { code: 'GYE', name: 'José Joaquín de Olmedo International', city: 'Guayaquil', country: 'Ecuador', region: 'South America' },
    { code: 'CCS', name: 'Simón Bolívar International', city: 'Caracas', country: 'Venezuela', region: 'South America' },
    { code: 'MVD', name: 'Carrasco International', city: 'Montevideo', country: 'Uruguay', region: 'South America' },
    { code: 'ASU', name: 'Silvio Pettirossi International', city: 'Asunción', country: 'Paraguay', region: 'South America' },
    { code: 'LPB', name: 'El Alto International', city: 'La Paz', country: 'Bolivia', region: 'South America' },
    { code: 'VVI', name: 'Viru Viru International', city: 'Santa Cruz', country: 'Bolivia', region: 'South America' },
    { code: 'GEO', name: 'Cheddi Jagan International', city: 'Georgetown', country: 'Guyana', region: 'South America' },
    { code: 'PBM', name: 'Johan Adolf Pengel International', city: 'Paramaribo', country: 'Suriname', region: 'South America' },

    // ==================== EUROPE ====================
    // United Kingdom
    { code: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom', region: 'Europe' },
    { code: 'LGW', name: 'Gatwick', city: 'London', country: 'United Kingdom', region: 'Europe' },
    { code: 'STN', name: 'Stansted', city: 'London', country: 'United Kingdom', region: 'Europe' },
    { code: 'LTN', name: 'Luton', city: 'London', country: 'United Kingdom', region: 'Europe' },
    { code: 'LCY', name: 'London City', city: 'London', country: 'United Kingdom', region: 'Europe' },
    { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'United Kingdom', region: 'Europe' },
    { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'United Kingdom', region: 'Europe' },
    { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh', country: 'United Kingdom', region: 'Europe' },
    { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'United Kingdom', region: 'Europe' },
    { code: 'BFS', name: 'Belfast International', city: 'Belfast', country: 'United Kingdom', region: 'Europe' },
    { code: 'BRS', name: 'Bristol', city: 'Bristol', country: 'United Kingdom', region: 'Europe' },
    { code: 'NCL', name: 'Newcastle', city: 'Newcastle', country: 'United Kingdom', region: 'Europe' },
    { code: 'LPL', name: 'Liverpool John Lennon', city: 'Liverpool', country: 'United Kingdom', region: 'Europe' },
    { code: 'LBA', name: 'Leeds Bradford', city: 'Leeds', country: 'United Kingdom', region: 'Europe' },

    // France
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', region: 'Europe' },
    { code: 'ORY', name: 'Orly', city: 'Paris', country: 'France', region: 'Europe' },
    { code: 'BVA', name: 'Beauvais-Tillé', city: 'Paris', country: 'France', region: 'Europe' },
    { code: 'NCE', name: "Nice Côte d'Azur", city: 'Nice', country: 'France', region: 'Europe' },
    { code: 'LYS', name: 'Lyon-Saint Exupéry', city: 'Lyon', country: 'France', region: 'Europe' },
    { code: 'MRS', name: 'Marseille Provence', city: 'Marseille', country: 'France', region: 'Europe' },
    { code: 'TLS', name: 'Toulouse-Blagnac', city: 'Toulouse', country: 'France', region: 'Europe' },
    { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Bordeaux', country: 'France', region: 'Europe' },
    { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'France', region: 'Europe' },
    { code: 'SXB', name: 'Strasbourg', city: 'Strasbourg', country: 'France', region: 'Europe' },

    // Germany
    { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany', region: 'Europe' },
    { code: 'MUC', name: 'Munich Franz Josef Strauss', city: 'Munich', country: 'Germany', region: 'Europe' },
    { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany', region: 'Europe' },
    { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Germany', region: 'Europe' },
    { code: 'HAM', name: 'Hamburg', city: 'Hamburg', country: 'Germany', region: 'Europe' },
    { code: 'CGN', name: 'Cologne Bonn', city: 'Cologne', country: 'Germany', region: 'Europe' },
    { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Germany', region: 'Europe' },
    { code: 'HAJ', name: 'Hannover', city: 'Hanover', country: 'Germany', region: 'Europe' },
    { code: 'NUE', name: 'Nuremberg', city: 'Nuremberg', country: 'Germany', region: 'Europe' },
    { code: 'LEJ', name: 'Leipzig/Halle', city: 'Leipzig', country: 'Germany', region: 'Europe' },

    // Italy
    { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino', city: 'Rome', country: 'Italy', region: 'Europe' },
    { code: 'CIA', name: 'Ciampino', city: 'Rome', country: 'Italy', region: 'Europe' },
    { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy', region: 'Europe' },
    { code: 'LIN', name: 'Milan Linate', city: 'Milan', country: 'Italy', region: 'Europe' },
    { code: 'BGY', name: 'Milan Bergamo (Orio al Serio)', city: 'Milan', country: 'Italy', region: 'Europe' },
    { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy', region: 'Europe' },
    { code: 'NAP', name: 'Naples International', city: 'Naples', country: 'Italy', region: 'Europe' },
    { code: 'BLQ', name: 'Bologna Guglielmo Marconi', city: 'Bologna', country: 'Italy', region: 'Europe' },
    { code: 'CTA', name: 'Catania-Fontanarossa', city: 'Catania', country: 'Italy', region: 'Europe' },
    { code: 'FLR', name: 'Florence Peretola', city: 'Florence', country: 'Italy', region: 'Europe' },
    { code: 'PSA', name: 'Pisa International', city: 'Pisa', country: 'Italy', region: 'Europe' },
    { code: 'BRI', name: 'Bari Karol Wojtyła', city: 'Bari', country: 'Italy', region: 'Europe' },
    { code: 'PMO', name: 'Palermo Falcone-Borsellino', city: 'Palermo', country: 'Italy', region: 'Europe' },

    // Spain
    { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'Spain', region: 'Europe' },
    { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { code: 'AGP', name: 'Málaga-Costa del Sol', city: 'Malaga', country: 'Spain', region: 'Europe' },
    { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma de Mallorca', country: 'Spain', region: 'Europe' },
    { code: 'ALC', name: 'Alicante-Elche', city: 'Alicante', country: 'Spain', region: 'Europe' },
    { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spain', region: 'Europe' },
    { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spain', region: 'Europe' },
    { code: 'SVQ', name: 'Seville', city: 'Seville', country: 'Spain', region: 'Europe' },
    { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spain', region: 'Europe' },
    { code: 'TFS', name: 'Tenerife South', city: 'Tenerife', country: 'Spain', region: 'Europe' },
    { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas', country: 'Spain', region: 'Europe' },
    { code: 'SCQ', name: 'Santiago de Compostela', city: 'Santiago de Compostela', country: 'Spain', region: 'Europe' },

    // Portugal
    { code: 'LIS', name: 'Humberto Delgado', city: 'Lisbon', country: 'Portugal', region: 'Europe' },
    { code: 'OPO', name: 'Francisco Sá Carneiro', city: 'Porto', country: 'Portugal', region: 'Europe' },
    { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal', region: 'Europe' },
    { code: 'FNC', name: 'Madeira (Cristiano Ronaldo)', city: 'Funchal', country: 'Portugal', region: 'Europe' },
    { code: 'PDL', name: 'João Paulo II', city: 'Ponta Delgada', country: 'Portugal', region: 'Europe' },

    // Netherlands
    { code: 'AMS', name: 'Schiphol', city: 'Amsterdam', country: 'Netherlands', region: 'Europe' },
    { code: 'EIN', name: 'Eindhoven', city: 'Eindhoven', country: 'Netherlands', region: 'Europe' },
    { code: 'RTM', name: 'Rotterdam The Hague', city: 'Rotterdam', country: 'Netherlands', region: 'Europe' },

    // Belgium / Luxembourg
    { code: 'BRU', name: 'Brussels', city: 'Brussels', country: 'Belgium', region: 'Europe' },
    { code: 'CRL', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgium', region: 'Europe' },
    { code: 'ANR', name: 'Antwerp', city: 'Antwerp', country: 'Belgium', region: 'Europe' },
    { code: 'LUX', name: 'Luxembourg-Findel', city: 'Luxembourg', country: 'Luxembourg', region: 'Europe' },

    // Switzerland
    { code: 'ZRH', name: 'Zurich', city: 'Zurich', country: 'Switzerland', region: 'Europe' },
    { code: 'GVA', name: 'Geneva', city: 'Geneva', country: 'Switzerland', region: 'Europe' },
    { code: 'BSL', name: 'EuroAirport Basel-Mulhouse-Freiburg', city: 'Basel', country: 'Switzerland', region: 'Europe' },
    { code: 'BRN', name: 'Bern', city: 'Bern', country: 'Switzerland', region: 'Europe' },

    // Austria
    { code: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria', region: 'Europe' },
    { code: 'SZG', name: 'Salzburg W. A. Mozart', city: 'Salzburg', country: 'Austria', region: 'Europe' },
    { code: 'INN', name: 'Innsbruck', city: 'Innsbruck', country: 'Austria', region: 'Europe' },

    // Scandinavia
    { code: 'CPH', name: 'Copenhagen Kastrup', city: 'Copenhagen', country: 'Denmark', region: 'Europe' },
    { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Denmark', region: 'Europe' },
    { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { code: 'BMA', name: 'Stockholm Bromma', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
    { code: 'GOT', name: 'Göteborg Landvetter', city: 'Gothenburg', country: 'Sweden', region: 'Europe' },
    { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Sweden', region: 'Europe' },
    { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norway', region: 'Europe' },
    { code: 'BGO', name: 'Bergen Flesland', city: 'Bergen', country: 'Norway', region: 'Europe' },
    { code: 'TRD', name: 'Trondheim Værnes', city: 'Trondheim', country: 'Norway', region: 'Europe' },
    { code: 'SVG', name: 'Stavanger Sola', city: 'Stavanger', country: 'Norway', region: 'Europe' },
    { code: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finland', region: 'Europe' },
    { code: 'KEF', name: 'Keflavík International', city: 'Reykjavik', country: 'Iceland', region: 'Europe' },

    // Ireland
    { code: 'DUB', name: 'Dublin', city: 'Dublin', country: 'Ireland', region: 'Europe' },
    { code: 'ORK', name: 'Cork', city: 'Cork', country: 'Ireland', region: 'Europe' },
    { code: 'SNN', name: 'Shannon', city: 'Shannon', country: 'Ireland', region: 'Europe' },

    // Greece
    { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athens', country: 'Greece', region: 'Europe' },
    { code: 'SKG', name: 'Thessaloniki Macedonia', city: 'Thessaloniki', country: 'Greece', region: 'Europe' },
    { code: 'HER', name: 'Heraklion Nikos Kazantzakis', city: 'Heraklion', country: 'Greece', region: 'Europe' },
    { code: 'RHO', name: 'Rhodes', city: 'Rhodes', country: 'Greece', region: 'Europe' },
    { code: 'CFU', name: 'Corfu Ioannis Kapodistrias', city: 'Corfu', country: 'Greece', region: 'Europe' },
    { code: 'JTR', name: 'Santorini', city: 'Santorini', country: 'Greece', region: 'Europe' },
    { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Greece', region: 'Europe' },

    // Turkey
    { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey', region: 'Europe' },
    { code: 'SAW', name: 'Istanbul Sabiha Gökçen', city: 'Istanbul', country: 'Turkey', region: 'Europe' },
    { code: 'ESB', name: 'Ankara Esenboğa', city: 'Ankara', country: 'Turkey', region: 'Europe' },
    { code: 'AYT', name: 'Antalya', city: 'Antalya', country: 'Turkey', region: 'Europe' },
    { code: 'ADB', name: 'İzmir Adnan Menderes', city: 'Izmir', country: 'Turkey', region: 'Europe' },
    { code: 'BJV', name: 'Bodrum Milas', city: 'Bodrum', country: 'Turkey', region: 'Europe' },

    // Eastern Europe
    { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw', country: 'Poland', region: 'Europe' },
    { code: 'KRK', name: 'Kraków John Paul II', city: 'Krakow', country: 'Poland', region: 'Europe' },
    { code: 'GDN', name: 'Gdańsk Lech Wałęsa', city: 'Gdansk', country: 'Poland', region: 'Europe' },
    { code: 'WRO', name: 'Wrocław Copernicus', city: 'Wroclaw', country: 'Poland', region: 'Europe' },
    { code: 'PRG', name: 'Václav Havel Prague', city: 'Prague', country: 'Czech Republic', region: 'Europe' },
    { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary', region: 'Europe' },
    { code: 'OTP', name: 'Henri Coandă International', city: 'Bucharest', country: 'Romania', region: 'Europe' },
    { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Romania', region: 'Europe' },
    { code: 'SOF', name: 'Sofia', city: 'Sofia', country: 'Bulgaria', region: 'Europe' },
    { code: 'VAR', name: 'Varna', city: 'Varna', country: 'Bulgaria', region: 'Europe' },
    { code: 'BTS', name: 'M. R. Štefánik', city: 'Bratislava', country: 'Slovakia', region: 'Europe' },
    { code: 'LJU', name: 'Ljubljana Jože Pučnik', city: 'Ljubljana', country: 'Slovenia', region: 'Europe' },
    { code: 'ZAG', name: 'Zagreb Franjo Tuđman', city: 'Zagreb', country: 'Croatia', region: 'Europe' },
    { code: 'DBV', name: 'Dubrovnik', city: 'Dubrovnik', country: 'Croatia', region: 'Europe' },
    { code: 'SPU', name: 'Split', city: 'Split', country: 'Croatia', region: 'Europe' },
    { code: 'BEG', name: 'Belgrade Nikola Tesla', city: 'Belgrade', country: 'Serbia', region: 'Europe' },
    { code: 'SJJ', name: 'Sarajevo', city: 'Sarajevo', country: 'Bosnia and Herzegovina', region: 'Europe' },
    { code: 'SKP', name: 'Skopje International', city: 'Skopje', country: 'North Macedonia', region: 'Europe' },
    { code: 'TIA', name: 'Tirana International', city: 'Tirana', country: 'Albania', region: 'Europe' },
    { code: 'TGD', name: 'Podgorica', city: 'Podgorica', country: 'Montenegro', region: 'Europe' },
    { code: 'KIV', name: 'Chișinău International', city: 'Chișinău', country: 'Moldova', region: 'Europe' },

    // Russia & CIS
    { code: 'SVO', name: 'Sheremetyevo International', city: 'Moscow', country: 'Russia', region: 'Europe' },
    { code: 'DME', name: 'Domodedovo International', city: 'Moscow', country: 'Russia', region: 'Europe' },
    { code: 'VKO', name: 'Vnukovo International', city: 'Moscow', country: 'Russia', region: 'Europe' },
    { code: 'LED', name: 'Pulkovo', city: 'St. Petersburg', country: 'Russia', region: 'Europe' },
    { code: 'KZN', name: 'Kazan International', city: 'Kazan', country: 'Russia', region: 'Europe' },
    { code: 'AER', name: 'Sochi International', city: 'Sochi', country: 'Russia', region: 'Europe' },
    { code: 'OVB', name: 'Tolmachevo', city: 'Novosibirsk', country: 'Russia', region: 'Europe' },
    { code: 'KBP', name: 'Boryspil International', city: 'Kyiv', country: 'Ukraine', region: 'Europe' },
    { code: 'IEV', name: 'Kyiv International (Zhuliany)', city: 'Kyiv', country: 'Ukraine', region: 'Europe' },
    { code: 'MSQ', name: 'Minsk International', city: 'Minsk', country: 'Belarus', region: 'Europe' },
    { code: 'RIX', name: 'Riga International', city: 'Riga', country: 'Latvia', region: 'Europe' },
    { code: 'VNO', name: 'Vilnius International', city: 'Vilnius', country: 'Lithuania', region: 'Europe' },
    { code: 'TLL', name: 'Tallinn Lennart Meri', city: 'Tallinn', country: 'Estonia', region: 'Europe' },

    // Cyprus / Malta
    { code: 'LCA', name: 'Larnaca International', city: 'Larnaca', country: 'Cyprus', region: 'Europe' },
    { code: 'PFO', name: 'Paphos International', city: 'Paphos', country: 'Cyprus', region: 'Europe' },
    { code: 'MLA', name: 'Malta International', city: 'Valletta', country: 'Malta', region: 'Europe' },

    // ==================== AFRICA ====================
    // Kenya
    { code: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi', country: 'Kenya', region: 'Africa' },
    { code: 'MBA', name: 'Moi International', city: 'Mombasa', country: 'Kenya', region: 'Africa' },
    { code: 'KIS', name: 'Kisumu International', city: 'Kisumu', country: 'Kenya', region: 'Africa' },
    { code: 'EDL', name: 'Eldoret International', city: 'Eldoret', country: 'Kenya', region: 'Africa' },
    { code: 'WIL', name: 'Wilson', city: 'Nairobi', country: 'Kenya', region: 'Africa' },
    { code: 'MYD', name: 'Malindi', city: 'Malindi', country: 'Kenya', region: 'Africa' },
    { code: 'LAU', name: 'Lamu Manda', city: 'Lamu', country: 'Kenya', region: 'Africa' },

    // Tanzania
    { code: 'DAR', name: 'Julius Nyerere International', city: 'Dar es Salaam', country: 'Tanzania', region: 'Africa' },
    { code: 'JRO', name: 'Kilimanjaro International', city: 'Kilimanjaro', country: 'Tanzania', region: 'Africa' },
    { code: 'ZNZ', name: 'Abeid Amani Karume International', city: 'Zanzibar', country: 'Tanzania', region: 'Africa' },
    { code: 'MWZ', name: 'Mwanza', city: 'Mwanza', country: 'Tanzania', region: 'Africa' },

    // Uganda / Rwanda / Burundi
    { code: 'EBB', name: 'Entebbe International', city: 'Entebbe', country: 'Uganda', region: 'Africa' },
    { code: 'KGL', name: 'Kigali International', city: 'Kigali', country: 'Rwanda', region: 'Africa' },
    { code: 'BJM', name: 'Bujumbura International', city: 'Bujumbura', country: 'Burundi', region: 'Africa' },

    // Ethiopia / Eritrea / Somalia / Djibouti / South Sudan
    { code: 'ADD', name: 'Addis Ababa Bole International', city: 'Addis Ababa', country: 'Ethiopia', region: 'Africa' },
    { code: 'ASM', name: 'Asmara International', city: 'Asmara', country: 'Eritrea', region: 'Africa' },
    { code: 'MGQ', name: 'Aden Adde International', city: 'Mogadishu', country: 'Somalia', region: 'Africa' },
    { code: 'JIB', name: 'Djibouti-Ambouli International', city: 'Djibouti', country: 'Djibouti', region: 'Africa' },
    { code: 'JUB', name: 'Juba International', city: 'Juba', country: 'South Sudan', region: 'Africa' },

    // South Africa
    { code: 'JNB', name: 'O. R. Tambo International', city: 'Johannesburg', country: 'South Africa', region: 'Africa' },
    { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa', region: 'Africa' },
    { code: 'DUR', name: 'King Shaka International', city: 'Durban', country: 'South Africa', region: 'Africa' },
    { code: 'PLZ', name: 'Port Elizabeth (Chief Dawid Stuurman)', city: 'Port Elizabeth', country: 'South Africa', region: 'Africa' },
    { code: 'BFN', name: 'Bram Fischer International', city: 'Bloemfontein', country: 'South Africa', region: 'Africa' },
    { code: 'GRJ', name: 'George', city: 'George', country: 'South Africa', region: 'Africa' },

    // Egypt / North Africa
    { code: 'CAI', name: 'Cairo International', city: 'Cairo', country: 'Egypt', region: 'Africa' },
    { code: 'HRG', name: 'Hurghada International', city: 'Hurghada', country: 'Egypt', region: 'Africa' },
    { code: 'SSH', name: 'Sharm el-Sheikh International', city: 'Sharm el-Sheikh', country: 'Egypt', region: 'Africa' },
    { code: 'LXR', name: 'Luxor International', city: 'Luxor', country: 'Egypt', region: 'Africa' },
    { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Morocco', region: 'Africa' },
    { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Morocco', region: 'Africa' },
    { code: 'RBA', name: 'Rabat-Salé', city: 'Rabat', country: 'Morocco', region: 'Africa' },
    { code: 'AGA', name: 'Agadir Al Massira', city: 'Agadir', country: 'Morocco', region: 'Africa' },
    { code: 'FEZ', name: 'Fes-Saïs', city: 'Fes', country: 'Morocco', region: 'Africa' },
    { code: 'TUN', name: 'Tunis-Carthage International', city: 'Tunis', country: 'Tunisia', region: 'Africa' },
    { code: 'DJE', name: 'Djerba-Zarzis International', city: 'Djerba', country: 'Tunisia', region: 'Africa' },
    { code: 'ALG', name: 'Houari Boumediene', city: 'Algiers', country: 'Algeria', region: 'Africa' },
    { code: 'TIP', name: 'Tripoli International', city: 'Tripoli', country: 'Libya', region: 'Africa' },

    // West Africa
    { code: 'LOS', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria', region: 'Africa' },
    { code: 'ABV', name: 'Nnamdi Azikiwe International', city: 'Abuja', country: 'Nigeria', region: 'Africa' },
    { code: 'PHC', name: 'Port Harcourt International', city: 'Port Harcourt', country: 'Nigeria', region: 'Africa' },
    { code: 'KAN', name: 'Mallam Aminu Kano International', city: 'Kano', country: 'Nigeria', region: 'Africa' },
    { code: 'ACC', name: 'Kotoka International', city: 'Accra', country: 'Ghana', region: 'Africa' },
    { code: 'ABJ', name: 'Félix-Houphouët-Boigny International', city: 'Abidjan', country: "Côte d'Ivoire", region: 'Africa' },
    { code: 'DKR', name: 'Blaise Diagne International', city: 'Dakar', country: 'Senegal', region: 'Africa' },
    { code: 'CKY', name: 'Conakry International', city: 'Conakry', country: 'Guinea', region: 'Africa' },
    { code: 'OUA', name: 'Ouagadougou', city: 'Ouagadougou', country: 'Burkina Faso', region: 'Africa' },
    { code: 'BKO', name: 'Modibo Keita International', city: 'Bamako', country: 'Mali', region: 'Africa' },
    { code: 'NIM', name: 'Diori Hamani International', city: 'Niamey', country: 'Niger', region: 'Africa' },
    { code: 'NKC', name: 'Nouakchott International', city: 'Nouakchott', country: 'Mauritania', region: 'Africa' },
    { code: 'COO', name: 'Cadjehoun', city: 'Cotonou', country: 'Benin', region: 'Africa' },
    { code: 'LFW', name: 'Lomé-Tokoin', city: 'Lomé', country: 'Togo', region: 'Africa' },
    { code: 'ROB', name: 'Roberts International', city: 'Monrovia', country: 'Liberia', region: 'Africa' },
    { code: 'FNA', name: 'Lungi International', city: 'Freetown', country: 'Sierra Leone', region: 'Africa' },
    { code: 'BJL', name: 'Banjul International', city: 'Banjul', country: 'Gambia', region: 'Africa' },

    // Central Africa
    { code: 'NSI', name: 'Yaoundé Nsimalen International', city: 'Yaoundé', country: 'Cameroon', region: 'Africa' },
    { code: 'DLA', name: 'Douala International', city: 'Douala', country: 'Cameroon', region: 'Africa' },
    { code: 'LBV', name: "Libreville Léon-Mba International", city: 'Libreville', country: 'Gabon', region: 'Africa' },
    { code: 'BZV', name: 'Maya-Maya', city: 'Brazzaville', country: 'Republic of the Congo', region: 'Africa' },
    { code: 'FIH', name: "N'djili International", city: 'Kinshasa', country: 'DR Congo', region: 'Africa' },
    { code: 'FBM', name: 'Lubumbashi International', city: 'Lubumbashi', country: 'DR Congo', region: 'Africa' },
    { code: 'BGF', name: "Bangui M'Poko International", city: 'Bangui', country: 'Central African Republic', region: 'Africa' },
    { code: 'NDJ', name: "N'Djamena International", city: "N'Djamena", country: 'Chad', region: 'Africa' },
    { code: 'SSG', name: 'Malabo International', city: 'Malabo', country: 'Equatorial Guinea', region: 'Africa' },
    { code: 'TMS', name: 'São Tomé International', city: 'São Tomé', country: 'São Tomé and Príncipe', region: 'Africa' },

    // Southern Africa
    { code: 'LAD', name: 'Quatro de Fevereiro', city: 'Luanda', country: 'Angola', region: 'Africa' },
    { code: 'LUN', name: 'Kenneth Kaunda International', city: 'Lusaka', country: 'Zambia', region: 'Africa' },
    { code: 'LLW', name: 'Lilongwe International (Kamuzu)', city: 'Lilongwe', country: 'Malawi', region: 'Africa' },
    { code: 'BLZ', name: 'Chileka International', city: 'Blantyre', country: 'Malawi', region: 'Africa' },
    { code: 'HRE', name: 'Robert Gabriel Mugabe International', city: 'Harare', country: 'Zimbabwe', region: 'Africa' },
    { code: 'VFA', name: 'Victoria Falls', city: 'Victoria Falls', country: 'Zimbabwe', region: 'Africa' },
    { code: 'BUQ', name: 'Joshua Mqabuko Nkomo International', city: 'Bulawayo', country: 'Zimbabwe', region: 'Africa' },
    { code: 'GBE', name: 'Sir Seretse Khama International', city: 'Gaborone', country: 'Botswana', region: 'Africa' },
    { code: 'MUB', name: 'Maun', city: 'Maun', country: 'Botswana', region: 'Africa' },
    { code: 'WDH', name: 'Hosea Kutako International', city: 'Windhoek', country: 'Namibia', region: 'Africa' },
    { code: 'MPM', name: 'Maputo International', city: 'Maputo', country: 'Mozambique', region: 'Africa' },
    { code: 'MSU', name: 'Moshoeshoe I International', city: 'Maseru', country: 'Lesotho', region: 'Africa' },
    { code: 'SHO', name: 'King Mswati III International', city: 'Manzini', country: 'Eswatini', region: 'Africa' },

    // Indian Ocean Islands
    { code: 'MRU', name: 'Sir Seewoosagur Ramgoolam International', city: 'Port Louis', country: 'Mauritius', region: 'Africa' },
    { code: 'SEZ', name: 'Seychelles International', city: 'Mahé', country: 'Seychelles', region: 'Africa' },
    { code: 'TNR', name: 'Ivato International', city: 'Antananarivo', country: 'Madagascar', region: 'Africa' },
    { code: 'RUN', name: 'Roland Garros', city: 'Saint-Denis', country: 'Réunion', region: 'Africa' },
    { code: 'HAH', name: 'Prince Said Ibrahim International', city: 'Moroni', country: 'Comoros', region: 'Africa' },
    { code: 'RAI', name: 'Praia International', city: 'Praia', country: 'Cape Verde', region: 'Africa' },

    // Sudan
    { code: 'KRT', name: 'Khartoum International', city: 'Khartoum', country: 'Sudan', region: 'Africa' },

    // ==================== MIDDLE EAST ====================
    { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates', region: 'Middle East' },
    { code: 'DWC', name: 'Al Maktoum International', city: 'Dubai', country: 'United Arab Emirates', region: 'Middle East' },
    { code: 'AUH', name: 'Zayed International', city: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East' },
    { code: 'SHJ', name: 'Sharjah International', city: 'Sharjah', country: 'United Arab Emirates', region: 'Middle East' },
    { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar', region: 'Middle East' },
    { code: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East' },
    { code: 'JED', name: 'King Abdulaziz International', city: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East' },
    { code: 'DMM', name: 'King Fahd International', city: 'Dammam', country: 'Saudi Arabia', region: 'Middle East' },
    { code: 'MED', name: 'Prince Mohammad Bin Abdulaziz International', city: 'Medina', country: 'Saudi Arabia', region: 'Middle East' },
    { code: 'KWI', name: 'Kuwait International', city: 'Kuwait City', country: 'Kuwait', region: 'Middle East' },
    { code: 'BAH', name: 'Bahrain International', city: 'Manama', country: 'Bahrain', region: 'Middle East' },
    { code: 'MCT', name: 'Muscat International', city: 'Muscat', country: 'Oman', region: 'Middle East' },
    { code: 'SLL', name: 'Salalah', city: 'Salalah', country: 'Oman', region: 'Middle East' },
    { code: 'SAH', name: "Sana'a International", city: "Sana'a", country: 'Yemen', region: 'Middle East' },
    { code: 'AMM', name: 'Queen Alia International', city: 'Amman', country: 'Jordan', region: 'Middle East' },
    { code: 'AQJ', name: 'King Hussein International', city: 'Aqaba', country: 'Jordan', region: 'Middle East' },
    { code: 'BEY', name: 'Beirut-Rafic Hariri International', city: 'Beirut', country: 'Lebanon', region: 'Middle East' },
    { code: 'DAM', name: 'Damascus International', city: 'Damascus', country: 'Syria', region: 'Middle East' },
    { code: 'BGW', name: 'Baghdad International', city: 'Baghdad', country: 'Iraq', region: 'Middle East' },
    { code: 'EBL', name: 'Erbil International', city: 'Erbil', country: 'Iraq', region: 'Middle East' },
    { code: 'IKA', name: 'Tehran Imam Khomeini International', city: 'Tehran', country: 'Iran', region: 'Middle East' },
    { code: 'THR', name: 'Mehrabad International', city: 'Tehran', country: 'Iran', region: 'Middle East' },
    { code: 'IFN', name: 'Isfahan International', city: 'Isfahan', country: 'Iran', region: 'Middle East' },
    { code: 'SYZ', name: 'Shiraz International', city: 'Shiraz', country: 'Iran', region: 'Middle East' },
    { code: 'TLV', name: 'Ben Gurion International', city: 'Tel Aviv', country: 'Israel', region: 'Middle East' },
    { code: 'ETM', name: 'Ramon', city: 'Eilat', country: 'Israel', region: 'Middle East' },

    // ==================== ASIA ====================
    // Japan
    { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { code: 'KIX', name: 'Kansai International', city: 'Osaka', country: 'Japan', region: 'Asia' },
    { code: 'ITM', name: 'Osaka Itami', city: 'Osaka', country: 'Japan', region: 'Asia' },
    { code: 'NGO', name: 'Chubu Centrair International', city: 'Nagoya', country: 'Japan', region: 'Asia' },
    { code: 'FUK', name: 'Fukuoka', city: 'Fukuoka', country: 'Japan', region: 'Asia' },
    { code: 'CTS', name: 'New Chitose', city: 'Sapporo', country: 'Japan', region: 'Asia' },
    { code: 'OKA', name: 'Naha', city: 'Okinawa', country: 'Japan', region: 'Asia' },
    { code: 'HIJ', name: 'Hiroshima', city: 'Hiroshima', country: 'Japan', region: 'Asia' },
    { code: 'SDJ', name: 'Sendai', city: 'Sendai', country: 'Japan', region: 'Asia' },

    // South Korea
    { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { code: 'GMP', name: 'Gimpo International', city: 'Seoul', country: 'South Korea', region: 'Asia' },
    { code: 'PUS', name: 'Gimhae International', city: 'Busan', country: 'South Korea', region: 'Asia' },
    { code: 'CJU', name: 'Jeju International', city: 'Jeju', country: 'South Korea', region: 'Asia' },
    { code: 'TAE', name: 'Daegu International', city: 'Daegu', country: 'South Korea', region: 'Asia' },

    // China
    { code: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China', region: 'Asia' },
    { code: 'PKX', name: 'Beijing Daxing International', city: 'Beijing', country: 'China', region: 'Asia' },
    { code: 'PVG', name: 'Shanghai Pudong International', city: 'Shanghai', country: 'China', region: 'Asia' },
    { code: 'SHA', name: 'Shanghai Hongqiao International', city: 'Shanghai', country: 'China', region: 'Asia' },
    { code: 'CAN', name: 'Guangzhou Baiyun International', city: 'Guangzhou', country: 'China', region: 'Asia' },
    { code: 'SZX', name: "Shenzhen Bao'an International", city: 'Shenzhen', country: 'China', region: 'Asia' },
    { code: 'CTU', name: 'Chengdu Shuangliu International', city: 'Chengdu', country: 'China', region: 'Asia' },
    { code: 'TFU', name: 'Chengdu Tianfu International', city: 'Chengdu', country: 'China', region: 'Asia' },
    { code: 'KMG', name: 'Kunming Changshui International', city: 'Kunming', country: 'China', region: 'Asia' },
    { code: 'XIY', name: "Xi'an Xianyang International", city: "Xi'an", country: 'China', region: 'Asia' },
    { code: 'HGH', name: 'Hangzhou Xiaoshan International', city: 'Hangzhou', country: 'China', region: 'Asia' },
    { code: 'NKG', name: 'Nanjing Lukou International', city: 'Nanjing', country: 'China', region: 'Asia' },
    { code: 'CKG', name: 'Chongqing Jiangbei International', city: 'Chongqing', country: 'China', region: 'Asia' },
    { code: 'WUH', name: 'Wuhan Tianhe International', city: 'Wuhan', country: 'China', region: 'Asia' },
    { code: 'XMN', name: 'Xiamen Gaoqi International', city: 'Xiamen', country: 'China', region: 'Asia' },
    { code: 'CSX', name: 'Changsha Huanghua International', city: 'Changsha', country: 'China', region: 'Asia' },
    { code: 'TAO', name: 'Qingdao Jiaodong International', city: 'Qingdao', country: 'China', region: 'Asia' },
    { code: 'DLC', name: 'Dalian Zhoushuizi International', city: 'Dalian', country: 'China', region: 'Asia' },
    { code: 'SHE', name: 'Shenyang Taoxian International', city: 'Shenyang', country: 'China', region: 'Asia' },
    { code: 'HRB', name: 'Harbin Taiping International', city: 'Harbin', country: 'China', region: 'Asia' },
    { code: 'URC', name: 'Ürümqi Diwopu International', city: 'Ürümqi', country: 'China', region: 'Asia' },

    // Hong Kong / Taiwan / Macau
    { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong', region: 'Asia' },
    { code: 'TPE', name: 'Taiwan Taoyuan International', city: 'Taipei', country: 'Taiwan', region: 'Asia' },
    { code: 'TSA', name: 'Taipei Songshan', city: 'Taipei', country: 'Taiwan', region: 'Asia' },
    { code: 'KHH', name: 'Kaohsiung International', city: 'Kaohsiung', country: 'Taiwan', region: 'Asia' },
    { code: 'MFM', name: 'Macau International', city: 'Macau', country: 'Macau', region: 'Asia' },

    // Singapore / Malaysia / Brunei
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia' },
    { code: 'PEN', name: 'Penang International', city: 'Penang', country: 'Malaysia', region: 'Asia' },
    { code: 'BKI', name: 'Kota Kinabalu International', city: 'Kota Kinabalu', country: 'Malaysia', region: 'Asia' },
    { code: 'LGK', name: 'Langkawi International', city: 'Langkawi', country: 'Malaysia', region: 'Asia' },
    { code: 'KCH', name: 'Kuching International', city: 'Kuching', country: 'Malaysia', region: 'Asia' },
    { code: 'BWN', name: 'Brunei International', city: 'Bandar Seri Begawan', country: 'Brunei', region: 'Asia' },

    // Thailand
    { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { code: 'DMK', name: 'Don Mueang International', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { code: 'HKT', name: 'Phuket International', city: 'Phuket', country: 'Thailand', region: 'Asia' },
    { code: 'CNX', name: 'Chiang Mai International', city: 'Chiang Mai', country: 'Thailand', region: 'Asia' },
    { code: 'USM', name: 'Samui', city: 'Koh Samui', country: 'Thailand', region: 'Asia' },
    { code: 'KBV', name: 'Krabi', city: 'Krabi', country: 'Thailand', region: 'Asia' },
    { code: 'UTP', name: 'U-Tapao Rayong-Pattaya International', city: 'Pattaya', country: 'Thailand', region: 'Asia' },

    // Indonesia
    { code: 'CGK', name: 'Soekarno-Hatta International', city: 'Jakarta', country: 'Indonesia', region: 'Asia' },
    { code: 'HLP', name: 'Halim Perdanakusuma', city: 'Jakarta', country: 'Indonesia', region: 'Asia' },
    { code: 'DPS', name: 'Ngurah Rai International', city: 'Bali (Denpasar)', country: 'Indonesia', region: 'Asia' },
    { code: 'SUB', name: 'Juanda International', city: 'Surabaya', country: 'Indonesia', region: 'Asia' },
    { code: 'MES', name: 'Kualanamu International', city: 'Medan', country: 'Indonesia', region: 'Asia' },
    { code: 'UPG', name: 'Sultan Hasanuddin International', city: 'Makassar', country: 'Indonesia', region: 'Asia' },
    { code: 'JOG', name: 'Yogyakarta International', city: 'Yogyakarta', country: 'Indonesia', region: 'Asia' },
    { code: 'BPN', name: 'Sultan Aji Muhammad Sulaiman', city: 'Balikpapan', country: 'Indonesia', region: 'Asia' },
    { code: 'LOP', name: 'Lombok International', city: 'Lombok', country: 'Indonesia', region: 'Asia' },

    // Philippines
    { code: 'MNL', name: 'Ninoy Aquino International', city: 'Manila', country: 'Philippines', region: 'Asia' },
    { code: 'CEB', name: 'Mactan-Cebu International', city: 'Cebu', country: 'Philippines', region: 'Asia' },
    { code: 'DVO', name: 'Francisco Bangoy International', city: 'Davao', country: 'Philippines', region: 'Asia' },
    { code: 'CRK', name: 'Clark International', city: 'Clark', country: 'Philippines', region: 'Asia' },
    { code: 'KLO', name: 'Kalibo International', city: 'Kalibo', country: 'Philippines', region: 'Asia' },
    { code: 'MPH', name: 'Caticlan (Boracay)', city: 'Boracay', country: 'Philippines', region: 'Asia' },
    { code: 'PPS', name: 'Puerto Princesa International', city: 'Puerto Princesa', country: 'Philippines', region: 'Asia' },

    // Vietnam / Laos / Cambodia / Myanmar
    { code: 'SGN', name: 'Tan Son Nhat International', city: 'Ho Chi Minh City', country: 'Vietnam', region: 'Asia' },
    { code: 'HAN', name: 'Noi Bai International', city: 'Hanoi', country: 'Vietnam', region: 'Asia' },
    { code: 'DAD', name: 'Da Nang International', city: 'Da Nang', country: 'Vietnam', region: 'Asia' },
    { code: 'CXR', name: 'Cam Ranh International', city: 'Nha Trang', country: 'Vietnam', region: 'Asia' },
    { code: 'PQC', name: 'Phu Quoc International', city: 'Phu Quoc', country: 'Vietnam', region: 'Asia' },
    { code: 'VTE', name: 'Wattay International', city: 'Vientiane', country: 'Laos', region: 'Asia' },
    { code: 'LPQ', name: 'Luang Prabang International', city: 'Luang Prabang', country: 'Laos', region: 'Asia' },
    { code: 'PNH', name: 'Phnom Penh International', city: 'Phnom Penh', country: 'Cambodia', region: 'Asia' },
    { code: 'REP', name: 'Siem Reap International', city: 'Siem Reap', country: 'Cambodia', region: 'Asia' },
    { code: 'RGN', name: 'Yangon International', city: 'Yangon', country: 'Myanmar', region: 'Asia' },
    { code: 'MDL', name: 'Mandalay International', city: 'Mandalay', country: 'Myanmar', region: 'Asia' },

    // India
    { code: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India', region: 'Asia' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', region: 'Asia' },
    { code: 'BLR', name: 'Kempegowda International', city: 'Bangalore', country: 'India', region: 'Asia' },
    { code: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India', region: 'Asia' },
    { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', region: 'Asia' },
    { code: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', country: 'India', region: 'Asia' },
    { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India', region: 'Asia' },
    { code: 'COK', name: 'Cochin International', city: 'Kochi', country: 'India', region: 'Asia' },
    { code: 'GOI', name: 'Goa Dabolim International', city: 'Goa', country: 'India', region: 'Asia' },
    { code: 'PNQ', name: 'Pune International', city: 'Pune', country: 'India', region: 'Asia' },
    { code: 'JAI', name: 'Jaipur International', city: 'Jaipur', country: 'India', region: 'Asia' },
    { code: 'LKO', name: 'Chaudhary Charan Singh International', city: 'Lucknow', country: 'India', region: 'Asia' },
    { code: 'IXC', name: 'Chandigarh International', city: 'Chandigarh', country: 'India', region: 'Asia' },
    { code: 'TRV', name: 'Trivandrum International', city: 'Thiruvananthapuram', country: 'India', region: 'Asia' },
    { code: 'NAG', name: "Dr. Babasaheb Ambedkar International", city: 'Nagpur', country: 'India', region: 'Asia' },
    { code: 'ATQ', name: 'Sri Guru Ram Dass Jee International', city: 'Amritsar', country: 'India', region: 'Asia' },

    // Pakistan / Bangladesh / Sri Lanka / Nepal / Bhutan / Maldives
    { code: 'KHI', name: 'Jinnah International', city: 'Karachi', country: 'Pakistan', region: 'Asia' },
    { code: 'LHE', name: 'Allama Iqbal International', city: 'Lahore', country: 'Pakistan', region: 'Asia' },
    { code: 'ISB', name: 'Islamabad International', city: 'Islamabad', country: 'Pakistan', region: 'Asia' },
    { code: 'PEW', name: 'Bacha Khan International', city: 'Peshawar', country: 'Pakistan', region: 'Asia' },
    { code: 'DAC', name: 'Hazrat Shahjalal International', city: 'Dhaka', country: 'Bangladesh', region: 'Asia' },
    { code: 'CGP', name: 'Shah Amanat International', city: 'Chittagong', country: 'Bangladesh', region: 'Asia' },
    { code: 'CMB', name: 'Bandaranaike International', city: 'Colombo', country: 'Sri Lanka', region: 'Asia' },
    { code: 'KTM', name: 'Tribhuvan International', city: 'Kathmandu', country: 'Nepal', region: 'Asia' },
    { code: 'PBH', name: 'Paro', city: 'Paro', country: 'Bhutan', region: 'Asia' },
    { code: 'MLE', name: 'Velana International', city: 'Malé', country: 'Maldives', region: 'Asia' },

    // Central Asia / Mongolia / Afghanistan
    { code: 'ALA', name: 'Almaty International', city: 'Almaty', country: 'Kazakhstan', region: 'Asia' },
    { code: 'NQZ', name: 'Nursultan Nazarbayev International', city: 'Astana', country: 'Kazakhstan', region: 'Asia' },
    { code: 'TAS', name: 'Tashkent International', city: 'Tashkent', country: 'Uzbekistan', region: 'Asia' },
    { code: 'SKD', name: 'Samarkand', city: 'Samarkand', country: 'Uzbekistan', region: 'Asia' },
    { code: 'FRU', name: 'Manas International', city: 'Bishkek', country: 'Kyrgyzstan', region: 'Asia' },
    { code: 'DYU', name: 'Dushanbe International', city: 'Dushanbe', country: 'Tajikistan', region: 'Asia' },
    { code: 'ASB', name: 'Ashgabat International', city: 'Ashgabat', country: 'Turkmenistan', region: 'Asia' },
    { code: 'ULN', name: 'Chinggis Khaan International', city: 'Ulaanbaatar', country: 'Mongolia', region: 'Asia' },
    { code: 'KBL', name: 'Hamid Karzai International', city: 'Kabul', country: 'Afghanistan', region: 'Asia' },
    { code: 'GYD', name: 'Heydar Aliyev International', city: 'Baku', country: 'Azerbaijan', region: 'Asia' },
    { code: 'EVN', name: 'Yerevan Zvartnots International', city: 'Yerevan', country: 'Armenia', region: 'Asia' },
    { code: 'TBS', name: 'Tbilisi International', city: 'Tbilisi', country: 'Georgia', region: 'Asia' },

    // ==================== OCEANIA ====================
    // Australia
    { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', region: 'Oceania' },
    { code: 'MEL', name: 'Melbourne Tullamarine', city: 'Melbourne', country: 'Australia', region: 'Oceania' },
    { code: 'BNE', name: 'Brisbane', city: 'Brisbane', country: 'Australia', region: 'Oceania' },
    { code: 'PER', name: 'Perth', city: 'Perth', country: 'Australia', region: 'Oceania' },
    { code: 'ADL', name: 'Adelaide', city: 'Adelaide', country: 'Australia', region: 'Oceania' },
    { code: 'CBR', name: 'Canberra', city: 'Canberra', country: 'Australia', region: 'Oceania' },
    { code: 'OOL', name: 'Gold Coast', city: 'Gold Coast', country: 'Australia', region: 'Oceania' },
    { code: 'CNS', name: 'Cairns', city: 'Cairns', country: 'Australia', region: 'Oceania' },
    { code: 'DRW', name: 'Darwin', city: 'Darwin', country: 'Australia', region: 'Oceania' },
    { code: 'HBA', name: 'Hobart', city: 'Hobart', country: 'Australia', region: 'Oceania' },

    // New Zealand
    { code: 'AKL', name: 'Auckland', city: 'Auckland', country: 'New Zealand', region: 'Oceania' },
    { code: 'WLG', name: 'Wellington', city: 'Wellington', country: 'New Zealand', region: 'Oceania' },
    { code: 'CHC', name: 'Christchurch', city: 'Christchurch', country: 'New Zealand', region: 'Oceania' },
    { code: 'ZQN', name: 'Queenstown', city: 'Queenstown', country: 'New Zealand', region: 'Oceania' },
    { code: 'DUD', name: 'Dunedin', city: 'Dunedin', country: 'New Zealand', region: 'Oceania' },

    // Pacific Islands
    { code: 'NAN', name: 'Nadi International', city: 'Nadi', country: 'Fiji', region: 'Oceania' },
    { code: 'SUV', name: 'Nausori International', city: 'Suva', country: 'Fiji', region: 'Oceania' },
    { code: 'PPT', name: "Faa'a International", city: 'Papeete', country: 'French Polynesia', region: 'Oceania' },
    { code: 'NOU', name: "La Tontouta International", city: 'Nouméa', country: 'New Caledonia', region: 'Oceania' },
    { code: 'APW', name: 'Faleolo International', city: 'Apia', country: 'Samoa', region: 'Oceania' },
    { code: 'TBU', name: "Fua'amotu International", city: "Nuku'alofa", country: 'Tonga', region: 'Oceania' },
    { code: 'VLI', name: 'Bauerfield International', city: 'Port Vila', country: 'Vanuatu', region: 'Oceania' },
    { code: 'HIR', name: 'Honiara International', city: 'Honiara', country: 'Solomon Islands', region: 'Oceania' },
    { code: 'POM', name: 'Jacksons International', city: 'Port Moresby', country: 'Papua New Guinea', region: 'Oceania' },
    { code: 'GUM', name: 'Antonio B. Won Pat International', city: 'Hagåtña', country: 'Guam', region: 'Oceania' },
];

// ==================== AIRPORT FINDER HELPER ====================
// Search and lookup utilities for the autocomplete

class AirportFinder {
    constructor(airports) {
        this.airports = airports;
        this.byCode = new Map();
        for (const a of airports) {
            // Some duplicate IATA codes may exist (e.g., DXB appears twice in legacy data) — keep the first
            if (!this.byCode.has(a.code)) {
                this.byCode.set(a.code, a);
            }
        }
    }

    getByCode(code) {
        if (!code) return null;
        return this.byCode.get(code.toUpperCase()) || null;
    }

    // Get top N suggestions ranked by relevance
    getSuggestions(query, limit = 8) {
        if (!query) return [];
        const q = query.trim().toLowerCase();
        if (!q) return [];

        const scored = [];
        for (const a of this.airports) {
            const score = this._score(a, q);
            if (score > 0) {
                scored.push({ airport: a, score });
            }
        }

        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, limit).map(s => s.airport);
    }

    _score(a, q) {
        const code = a.code.toLowerCase();
        const city = a.city.toLowerCase();
        const country = a.country.toLowerCase();
        const name = a.name.toLowerCase();

        // Exact matches score highest
        if (code === q) return 100;
        if (city === q) return 95;
        if (country === q) return 90;

        // "starts with" beats "contains"
        if (code.startsWith(q)) return 80;
        if (city.startsWith(q)) return 75;
        if (country.startsWith(q)) return 70;
        if (name.startsWith(q)) return 60;

        // Contains
        if (city.includes(q)) return 50;
        if (country.includes(q)) return 45;
        if (name.includes(q)) return 30;
        if (code.includes(q)) return 25;

        return 0;
    }
}

// Expose globally for autocomplete + script.js
const airportFinder = new AirportFinder(AIRPORTS_DATABASE);
if (typeof window !== 'undefined') {
    window.AIRPORTS_DATABASE = AIRPORTS_DATABASE;
    window.airportFinder = airportFinder;
}
