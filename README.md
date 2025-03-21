# 📈 Crypto Dashboard

**Crypto Dashboard** to aplikacja webowa zbudowana w **Next.js, React i TypeScript**, która umożliwia śledzenie kursów kryptowalut w czasie rzeczywistym. Dane są pobierane z **CoinGecko API**, a wykresy aktualizowane na bieżąco dzięki **React Query** i **Recharts**.

---

## 🛠️ Stack technologiczny
- **Next.js** – SSR/ISR dla optymalizacji pobierania danych
- **React + TypeScript** – Nowoczesny frontend
- **React Query** – Pobieranie i cache’owanie danych API
- **Recharts** – Wizualizacja kursów na wykresach
- **TailwindCSS** – Stylizacja interfejsu
- **Zustand** – Zarządzanie stanem ulubionych kryptowalut
- **CoinGecko API** – Źródło danych o kursach kryptowalut

---

## 📌 Kluczowe funkcjonalności
✅ **Wykresy kursów kryptowalut w czasie rzeczywistym** (Live update co 5 sekund)  
✅ **Wyszukiwarka kryptowalut** z autouzupełnianiem  
✅ **Lista ulubionych kryptowalut** zapisywana w localStorage  
✅ **Strona szczegółowa kryptowaluty** z danymi rynkowymi  
✅ **Filtrowanie i sortowanie** według ceny, market cap, wolumenu  
✅ **SSR/ISR w Next.js** dla optymalizacji  
✅ **Responsywny design** dzięki TailwindCSS

---

## 🚀 Jak uruchomić projekt?
### 1️⃣ Klonowanie repozytorium
```bash
git clone https://github.com/KotKamil/crypto-dashboard.git
cd crypto-dashboard
```

### 2️⃣ Instalacja zależności
```bash
npm install
```

### 3️⃣ Uruchomienie aplikacji w trybie deweloperskim
```bash
npm dev  # lub npm run dev
```
Aplikacja domyślnie uruchomi się pod `http://localhost:3000`.

### 4️⃣ Budowanie i uruchamianie w trybie produkcyjnym
```bash
npm build && npm start  # lub npm run build && npm start
```

---

## 🔗 API CoinGecko – Przykładowe endpointy
- Pobieranie aktualnych cen kryptowalut:
  ```bash
  https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd
  ```
- Pobieranie danych historycznych (do wykresów):
  ```bash
  https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minute
  ```

---

## 📌 Możliwe ulepszenia
🔹 **WebSockets** – zamiast polling’u do jeszcze szybszej aktualizacji cen  
🔹 **PWA (Progressive Web App)** – aplikacja działająca offline  
🔹 **Alerty cenowe** – powiadomienia push/email  
🔹 **Logowanie użytkowników** – NextAuth.js / Firebase Auth

---

## 📜 Licencja
Projekt dostępny na licencji **MIT**.

---
