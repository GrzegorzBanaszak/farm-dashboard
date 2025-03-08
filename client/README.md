# Dashboard Rolniczy

Przykładowy układ dashboardu opartego na poniższych modelach (User, Crop, Field, Machine, Warehouse, Item, Animal) może być użyteczny dla rolnika lub administratora zarządzającego gospodarstwem.

##### [Przykład dashboardu](https://www.figma.com/design/guX7cNrLpVMqYbFrD9UhHm/Farm-Dashboard?node-id=0-1&t=ZsLYq8qEMlmfTC0c-1)

##### [Przydatne komponenty w tworzenu](<https://www.figma.com/design/bezByrSDQoKotXhwzzJ5DD/DashStack---Free-Admin-Dashboard-UI-Kit---Admin-%26-Dashboard-Ui-Kit---Admin-Dashboard-(Community)?node-id=0-1&t=OshwhirlsJGlOhUi-1>)

## Górny Pasek

- **Logo i Nazwa Aplikacji** – wizualna identyfikacja systemu.

- **Profil Użytkownika** – dostęp do informacji o zalogowanym użytkowniku (np. imię, email).

Dodatkowe

- **Wyszukiwarka** – szybkie wyszukiwanie pól, upraw, maszyn, magazynów, zwierząt lub użytkowników.

---

## Panel Bocznym (Menu Nawigacyjne)

- **Dashboard** – widok ogólny z podsumowaniem wszystkich kluczowych danych.
- **Pola** – lista pól (model _Field_) wraz z ich szczegółami (nazwa, rozmiar, lokalizacja) oraz powiązanymi uprawami.
- **Uprawy** – sekcja prezentująca wszystkie uprawy (model _Crop_), z informacjami o typie uprawy, datach zasiewu i zbioru oraz uzyskanych plonach.
- **Maszyny** – widok maszyn (model _Machine_) z informacjami o nazwie, typie, dacie zakupu i stanie technicznym (MachineCondition).
- **Magazyny** – dostęp do listy magazynów (model _Warehouse_) i szczegółów dotyczących przechowywanych przedmiotów (model _Item_).
- **Zwierzęta** – sekcja dla zarządzania hodowlą, pokazująca dane zwierząt (model _Animal_) – imiona, gatunki, daty urodzenia, status zdrowotny i identyfikatory.
- **Użytkownicy** – ewentualny panel do zarządzania użytkownikami systemu (model _User_).

---

## Główna Sekcja Dashboardu

### 1. Podsumowanie (Dashboard Overview)

- **Karty Informacyjne (Statystyki)**:
  - **Liczba Pól** – ilość obiektów z modelu _Field_.
  - **Liczba Upraw** – aktualne uprawy wraz z informacjami o plonach.
  - **Stan Maszyn** – podział maszyn według warunków (NEW, GOOD, FAIR, POOR, BROKEN).
  - **Magazyny** – liczba magazynów oraz ogólna liczba przedmiotów w magazynach.
  - **Zwierzęta** – podsumowanie liczby zwierząt oraz ich stanu zdrowotnego.

### 2. Szczegółowe Sekcje

#### Pola i Uprawy

- **Tabela lub Lista Pól**: Wyświetla nazwę pola, rozmiar, lokalizację oraz liczbę upraw na danym polu.
- **Widok Szczegółowy Pola**: Po kliknięciu na dane pole użytkownik widzi historię upraw, aktualnie zasiane rośliny oraz planowane terminy zbiorów.
- **Tabela Upraw**: Prezentacja upraw z kolumnami typu uprawy (_CropType_), daty zasiewu, zbioru oraz uzyskanych plonów.

#### Maszyny

- **Lista Maszyn**: Tabela z nazwą, typem, datą zakupu i stanem technicznym. Warunki maszyny mogą być oznaczone kolorami (np. zielony – NEW/GOOD, żółty – FAIR, czerwony – POOR/BROKEN).
- **Filtry i Sortowanie**: Możliwość sortowania maszyn wg daty zakupu, typu lub stanu, co ułatwia szybkie zlokalizowanie maszyn wymagających serwisu.

#### Magazyny i Przedmioty

- **Lista Magazynów**: Wyświetlenie nazwy i opcjonalnego adresu magazynu.
- **Szczegóły Magazynu**: Po kliknięciu w magazyn użytkownik widzi listę przechowywanych przedmiotów (_Item_) z ich nazwą, opisem i ilością.

#### Zwierzęta

- **Tabela Zwierząt**: Prezentacja informacji o zwierzętach – imię, gatunek (_Species_), data urodzenia, status zdrowotny (_HealthStatus_) oraz unikalny numer identyfikacyjny.
- **Filtry**: Możliwość filtrowania zwierząt wg gatunków lub stanu zdrowia, co ułatwia zarządzanie stadem.

Dodatkowe

- **Wizualizacje**: Diagramy pokazujące procentowy udział poszczególnych gatunków lub stan zdrowia zwierząt w gospodarstwie.

---

## Dodatkowe Funkcjonalności

- **Responsywność**: Układ dostosowujący się do urządzeń mobilnych, tabletów i komputerów stacjonarnych.
- **Powiadomienia i Alerty**: System powiadomień informujący o zbliżających się terminach zbiorów, przeglądach maszyn czy niskich stanach magazynowych.
- **Szybkie Akcje**: Przycisk „Dodaj nowy” umożliwiający szybkie dodanie nowego pola, uprawy, maszyny, magazynu lub zwierzęcia.

---

Taki dashboard łączy w sobie funkcjonalności monitoringu, analizy danych oraz szybkiego zarządzania poszczególnymi elementami gospodarstwa. Umożliwia szybki podgląd najważniejszych informacji oraz łatwy dostęp do szczegółowych danych, co wspiera podejmowanie decyzji i planowanie działań w gospodarstwie.
