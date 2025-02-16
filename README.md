# Farm Management Dashboard

## Opis projektu

Farm Management Dashboard to nowoczesna aplikacja webowa umożliwiająca zarządzanie gospodarstwem rolnym. Aplikacja została stworzona z myślą o rolnikach oraz zarządcach gospodarstw, którzy potrzebują intuicyjnego i efektywnego narzędzia do monitorowania i planowania działań.

## Technologie

Projekt wykorzystuje następujące technologie:

- **Next.js** - framework do budowy aplikacji React z obsługą SSR i SSG
- **Tailwind CSS** - narzędzie do stylizacji interfejsu użytkownika
- **Prisma** - ORM ułatwiający pracę z bazą danych
- **MongoDB** - nierelacyjna baza danych do przechowywania informacji

## Funkcjonalności

- **Zarządzanie uprawami** – możliwość dodawania, edytowania i monitorowania upraw
- **Ewidencja zwierząt** – śledzenie stanu zdrowia i produktywności zwierząt
- **Zarządzanie zasobami** – kontrola nad sprzętem rolniczym, nawozami, nasionami itp.
- **Raporty i analizy** – generowanie raportów dotyczących wydajności i kosztów
- **Kalendarz zadań** – planowanie prac polowych i harmonogramu działań

## Projekt graficzny

**Figma:** [Link](https://www.figma.com/design/guX7cNrLpVMqYbFrD9UhHm/Farm-Dashboard?node-id=164-75&t=FSwea2TUMQbAwJLR-0)

## Instalacja

1. **Klonowanie repozytorium**
   ```bash
   git clone https://github.com/twoj-repo/farm-management-dashboard.git
   cd farm-management-dashboard
   ```
2. **Konfiguracja środowiska**
   Utwórz plik `.env.local` i uzupełnij zmienne środowiskowe:

   ```plaintext
   DATABASE_URL=DATABASE_URL="mongodb+srv://admin:password@farm-claster.rtbms.mongodb.net/farmDb?retryWrites=true&w=majority&appName=farm-claster"

   ```

3. **Zbudowanie obrazu docker**

   ```bash
   docker-compose build
   ```

4. **Uruchomienie aplikacji**
   ```bash
   docker-compose up
   ```

## Struktura projektu

```
/farm-management-dashboard
│── prisma/                # Konfiguracja Prisma i schemat bazy danych
│── public/                # Pliki statyczne (obrazy, favicon, etc.)
│── src/                   # Kod współdzielony i logika biznesowa
│   ├── app/               # Nowa struktura Next.js (Next.js 15)
│   │   ├── dashboard/     # Główna strona dashboardu
│   │   │   ├── page.tsx   # Główna strona dashboardu
│   │   │   └── components/ # Komponenty specyficzne dla dashboardu
│   │   ├── crops/         # Strona zarządzania uprawami
│   │   │   ├── page.tsx   # Widok upraw
│   │   │   └── components/ # Komponenty specyficzne dla upraw
│   │   ├── fields/        # Strona zarządzania polami
│   │   │   ├── page.tsx   # Widok pól
│   │   │   └── components/ # Komponenty specyficzne dla pól
│   │   ├── machines/      # Strona zarządzania maszynami
│   │   │   ├── page.tsx   # Widok maszyn
│   │   │   └── components/ # Komponenty specyficzne dla maszyn
│   │   ├── warehouses/    # Strona zarządzania magazynami
│   │   │   ├── page.tsx   # Widok magazynów
│   │   │   └── components/ # Komponenty specyficzne dla magazynów
│   │   ├── workers/       # Strona zarządzania pracownikami
│   │   │   ├── page.tsx   # Widok pracowników
│   │   │   └── components/ # Komponenty specyficzne dla pracowników
│   │   └── animals/       # Strona zarządzania zwierzętami
│   │       ├── page.tsx   # Widok zwierząt
│   │       └── components/ # Komponenty specyficzne dla zwierząt
│   ├── lib/               # Funkcjonalności i logika biznesowa
│   ├── styles/            # Globalne style i konfiguracja Tailwind CSS
│   └── utils/             # Narzędzia i pomocnicze funkcje
│── .env.local             # Zmienne środowiskowe
│── package.json           # Plik konfiguracyjny projektu
│── README.md
```

## Sekcje dashboardu

### Uprawy

- Lista upraw z możliwością filtrowania po typie i dacie zasiewu
- Szczegóły uprawy: typ, data zasiewu, data zbioru, przypisane pole
- Wykres wzrostu i plonów
- Możliwość dodawania i edytowania upraw

### Pola

- Mapa pól gospodarstwa
- Lista pól z informacjami o rozmiarze i uprawach
- Szczegółowy widok pola: lokalizacja, powierzchnia, historia upraw
- Planowanie rotacji upraw

### Maszyny

- Lista maszyn z informacjami o stanie technicznym
- Szczegóły maszyny: nazwa, typ, data zakupu, stan techniczny
- Harmonogram konserwacji i napraw
- Rejestr wykorzystania maszyny

### Magazyny

- Lista magazynów z pojemnością i aktualną zawartością
- Szczegółowy widok magazynu: lokalizacja, pojemność, przechowywane zasoby
- Historia dostaw i zużycia
- Zarządzanie stanami magazynowymi

### Pracownicy

- Lista pracowników z informacjami o roli i dacie zatrudnienia
- Szczegóły pracownika: stanowisko, pensja, historia prac
- Planowanie zadań i harmonogram pracy
- Monitorowanie efektywności pracy

### Zwierzęta

- Lista zwierząt z informacjami o gatunku i stanie zdrowia
- Szczegółowe informacje: data urodzenia, kondycja, produktywność
- Historia chorób i leczenia
- Zarządzanie paszami i planem żywieniowym

## Diagram clas

![Diagram clas](img/diagram.png)

## Modele Prisma

### Model `Crop` (Uprawa)

```prisma
model Crop {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  type        CropType
  plantedAt   DateTime
  harvestedAt DateTime?
  yield       Int // Ilość zbiorów (np. ilość wyprodukowanego plonu)
  fieldId     String    @unique @db.ObjectId
  field       Field     @relation(fields: [fieldId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Enum `CropType` (Typ uprawy)

```prisma
enum CropType {
  PSZENICA
  ZIEMNIAK
  JECZMIEN // odpowiada: jęczmień
  KUKURYDZA
  RYZ // odpowiada: ryż
  SOJA
  OWIES
  ZYTNO // odpowiada: żyto
  PROSO
  BURAK
}
```

### Model `Field` (Pole)

```prisma
model Field {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  size      Float
  location  String
  crops     Crop[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Enum `MachineCondition` (Stan maszyny)

```prisma
enum MachineCondition {
  NEW // Nowa
  GOOD // Sprawna
  FAIR // Średni stan
  POOR // Zły stan
  BROKEN // Zepsuta
}
```

### Model `Machine` (Maszyna)

```prisma
model Machine {
  id           String           @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  type         String
  purchaseDate DateTime
  condition    MachineCondition
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}
```

### Model `Warehouse` (Magazyn)

```prisma
model Warehouse {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  location  String
  capacity  Int
  contents  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Model `Worker` (Pracownik)

```prisma
model Worker {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  role      String
  hiredAt   DateTime
  salary    Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Enum `Species` (Gatunek)

```prisma
enum Species {
  COW // Krowa
  SHEEP // Owca
  PIG // Świnia
  GOAT // Koza
  CHICKEN // Kura
  TURKEY // Indyk
  DUCK // Kaczka
  HORSE // Koń
  DONKEY // Osioł
  RABBIT // Królik
}
```

### Enum `HealthStatus` (Stan zdrowia)

```prisma
enum HealthStatus {
  EXCELLENT // Doskonały
  GOOD // Dobry
  FAIR // Przeciętny
  POOR // Słaby
  CRITICAL // Krytyczny
}
```

### Model `Animal` (Zwierzę)

```prisma
model Animal {
  id        String        @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  species   Species
  birthDate DateTime
  health    HealthStatus? // Pole opcjonalne
  number    Int // Numer identyfikacyjny zwierzęcia
  createdAt DateTime      @default(now())
}

```

## Przyszłe usprawnienia

- Integracja z API pogodowym do prognozowania warunków atmosferycznych
- Automatyczne powiadomienia o zadaniach
- Obsługa wielu użytkowników i uprawnień

## Licencja

Projekt jest dostępny na licencji MIT.

---

**Autor:** [Grzegorz Banaszak](https://github.com/GrzegorzBanaszak)
