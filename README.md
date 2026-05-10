# Flight Price Predictor

A web application that helps you find the cheapest flights worldwide and predicts the best time to book.

**Live Demo**: Coming soon (GitHub Pages)

---

## 📋 Features

### Phase 1: Flight Search (MVP) ✅
- ✅ Search flights from ANY airport to ANY airport
- ✅ Search ALL airlines worldwide (Qatar, Ethiopian, Safarilink, etc.)
- ✅ One-way and round-trip flights
- ✅ Flexible date search (±3 days)
- ✅ Direct booking links to airline websites
- ✅ Filter and sort results (price, duration, departure time)
- ✅ Price prediction insights

### Phase 2: Price Prediction (Coming Soon)
- 📊 Historical price tracking
- 📈 Price trend charts
- 💡 "Best time to book" recommendations
- 🎯 Smart alerts for price drops

### Phase 3: AI Assistant (Coming Soon)
- 🤖 AI chatbot with voice and text input
- 🌤️ Destination weather information
- 🛡️ Safety and travel advisories
- ✈️ Smart travel recommendations
- 💬 Natural language understanding

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/flight-price-predictor.git
cd flight-price-predictor
```

### 2. Get API Keys
Before running, you need to get FREE API keys:

#### Flight Search API (Skyscanner)
1. Go to https://rapidapi.com/
2. Search for "Skyscanner"
3. Subscribe to free tier
4. Copy your API key
5. Edit `js/config.js` and add your key:
```javascript
apiKey: 'YOUR_RAPIDAPI_KEY_HERE'
```

#### Weather API (OpenWeatherMap) - Optional for Phase 3
1. Go to https://openweathermap.org/api
2. Sign up free
3. Get your API key
4. Add to `js/config.js`

#### AI Chatbot API (Hugging Face) - Optional for Phase 3
1. Go to https://huggingface.co/
2. Sign up free
3. Create API token
4. Add to `js/config.js`

### 3. Run Locally
```bash
# Option A: Using Python (if installed)
python -m http.server 8000

# Option B: Using Node.js (if installed)
npx http-server

# Then visit: http://localhost:8000
```

### 4. Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main

# Then go to Settings > Pages > Source > main branch
# Your site will be live at: https://yourusername.github.io/flight-price-predictor/
```

---

## 📁 Project Structure

```
flight-price-predictor/
├── index.html              # Home page with search form
├── results.html            # Flight results page
├── chat.html               # AI chatbot page
│
├── css/
│   └── style.css           # All styling (responsive design)
│
├── js/
│   ├── config.js           # API keys and configuration
│   ├── script.js           # Main flight search logic
│   ├── chatbot.js          # AI chatbot implementation
│   └── prediction.js       # Price prediction (Phase 2)
│
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy on push
│
└── README.md              # This file
```

---

## 🔑 API Configuration

Edit `js/config.js` to add your API keys:

```javascript
const API_CONFIG = {
    flightAPI: {
        apiKey: 'YOUR_RAPIDAPI_KEY', // Required for flights
        // ... other config
    },
    weather: {
        apiKey: 'YOUR_OPENWEATHERMAP_KEY', // For weather (Phase 3)
    },
    chatbot: {
        apiKey: 'YOUR_HUGGING_FACE_KEY', // For AI (Phase 3)
    }
};
```

### ⚠️ Security Note
**Never commit your API keys to GitHub!**
- Create a `.gitignore` file and add `js/config.js`
- Or use GitHub Secrets for production

---

## 🛠️ How It Works

### Flight Search
1. User enters: From → To → Dates → Trip Type
2. App calls Skyscanner API (via RapidAPI)
3. API returns all available flights from 1000+ airlines
4. Results filtered and sorted by price, duration, etc.
5. User clicks "Book" → Direct link to airline's booking page

### Price Prediction (Phase 2)
1. Collect flight prices over time (2+ weeks)
2. Store in browser localStorage or Firebase
3. Analyze trends: Is price going up/down?
4. Show "Best time to book" recommendations
5. Display charts of price history

### AI Chatbot (Phase 3)
1. User types/speaks question
2. Sent to Hugging Face API
3. AI generates response using LLaMA model
4. Can also integrate weather, safety data
5. Voice support via Web Speech API

---

## 💻 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML/CSS/JavaScript** | Frontend (no build step needed) |
| **GitHub Pages** | Free hosting |
| **Skyscanner/Amadeus API** | Flight data (all airlines) |
| **OpenWeatherMap API** | Weather data |
| **Hugging Face API** | AI chatbot (LLaMA) |
| **Firebase** | Optional cloud storage (Phase 2+) |
| **TensorFlow.js** | ML price prediction (Phase 2) |

---

## 📊 Supported Routes

The app works with any airport pair worldwide:

**Popular Examples:**
- NYC → LAX (New York to Los Angeles)
- LHR → CDG (London to Paris)
- JNB → CPT (Johannesburg to Cape Town)
- NRB → MBA (Nairobi to Mombasa)
- ADD → DXB (Addis Ababa to Dubai)
- DXB → DOH (Dubai to Doha)

**Use 3-letter IATA airport codes** (NYC, LAX, LHR, CDG, etc.)

---

## 🐛 Troubleshooting

### "No flights found"
- Check airport codes are valid (3 letters)
- Try major hubs first (NYC, LAX, LHR)
- Verify API key is correct in `config.js`
- Check browser console for errors (F12)

### "API Error" or flights don't load
- Verify your API key in `js/config.js`
- Check API key has correct permissions
- Ensure API rate limit not exceeded
- Try different date/airports

### Voice input not working
- Only works in modern browsers (Chrome, Firefox, Edge)
- Requires microphone permission
- Check browser console for errors

---

## 🔮 Roadmap

### Phase 1 (Current) ✅
- [x] Basic flight search UI
- [x] Integration with flight API
- [x] Results display and filtering
- [x] Direct booking links
- [x] GitHub Pages deployment

### Phase 2 (Next)
- [ ] Price prediction ML model
- [ ] Historical price tracking
- [ ] Price trend charts
- [ ] Flexible date optimization

### Phase 3 (Final)
- [ ] AI chatbot with NLP
- [ ] Voice input/output
- [ ] Weather integration
- [ ] Safety/travel advisories
- [ ] User accounts & bookmarks
- [ ] Mobile app

---

## 📝 Usage Examples

### Search flights from NYC to LAX
1. Go to index.html
2. Enter:
   - From: NYC
   - To: LAX
   - Departure: Any date
   - Trip Type: One-way or Round-trip
3. Click "Search Flights"
4. See results from all airlines
5. Click "Book Now" to go to airline website

### Set flexible dates
- Check "Search flexible dates (±3 days)"
- App will show prices for departure ±3 days
- Helps find the cheapest date

### Use quick search
- Click popular route buttons (NYC→LAX, etc.)
- Airports auto-fill
- Just enter date and search

---

## 🤝 Contributing

Want to help improve Flight Price Predictor?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

**Areas needing help:**
- Real flight API integration
- Mobile app development
- ML price prediction model
- UI/UX improvements
- Documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙋 FAQ

**Q: Is this free to use?**
A: Yes! Frontend is free. APIs have free tiers that cover moderate usage. Premium features (higher rate limits) are optional.

**Q: Does it book flights?**
A: No, it shows available flights and links to airline websites. You book directly with the airline for the best prices.

**Q: Which airlines are supported?**
A: All major airlines + 1000+ regional carriers worldwide (including Safarilink, Ethiopian, Qatar, etc.)

**Q: Can I save favorites?**
A: Phase 2 will add user accounts and bookmarks.

**Q: Does it support mobile?**
A: Yes, responsive design works on all devices. Dedicated app coming in Phase 3.

---

## 📞 Support

- 📧 Email: support@flightpredictor.com (coming soon)
- 🐛 GitHub Issues: Report bugs and request features
- 💬 Discussions: Ask questions and share ideas

---

## ⭐ Show Your Support

If you find this helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ for travelers who want the best flight deals**

Last updated: May 10, 2026
