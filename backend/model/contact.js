// Import necessary dependencies
import mongoose from 'mongoose';

// Define the schema for province preferences
const provincePreferenceSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
    enum: ['Samarkand', 'Bukhara', 'Khiva', 'Kokand', 'Namangan', 'Andijon', 'Margilon', 'Others'] // Valid options
  },
  provinceName: {
    type: String, // Optional, for "Others"
    required: false,
  },
  preferredHotel: {
    type: String, // Optional, allows flexibility
    required: false,
  },
});

// Define the main contact schema
const contactSchema = new mongoose.Schema({
  name_Имя: {
    type: String,
    required: true,
  },
  email_Электронная_почта: {
    type: String,
    required: true,
  },
  contactNumber_Контактный_номер: {
    type: String,
    required: true,
  },
  nationality_Национальность: {
    type: String,
    required: true,
  },
  arrivingFromCountry_страна_прибытия: {
    type: String,
    required: true,
  },
  numberOfPeople_количество_людей: {
    type: Number,
    required: true,
  },
  arrival_date_Дата_прибытия: {
    type: Date,
    required: true,
  },
  departure_date_Дата_отъезда: {
    type: Date,
    required: true,
  },
  ArrivaltransportService_Транспортная_услуга_при_прибытии: {
    type: String,
    required: true,
  },
  DepartTransportService_Услугаz_Транспортировки_при_Отъезде: {
    type: String,
    required: true,
  },
  travelType_Тип_путешествия: {
    type: String,
    required: true,
  },
  guideRequired_Необходимость_гида: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  guideLanguage_Язык_гида: {
    type: String,
    required: function() {
      return this.guideRequired_Необходимость_гида === 'Yes';
    },
  },
  customLanguage: {
    type: String,
    validate: {
      validator: function(v) {
        return !(this.guideRequired_Необходимость_гида === 'Yes' && this.guideLanguage_Язык_гида === 'Others' && !v);
      },
      message: props => `${props.path} is required because guide language is set to 'Others'.`
    },
  },
  hotelbooking_бронирование_отеля: {
    type: String,
    required: true,
  },
  preferredHotel: {
    type: String,
  },
  itinerary_маршрут: {
    type: String,
    required: true,
  },
  selectedSubItinerary: {
    type: String,
  },
  message_Сообщение: {
    type: String,
    default: 'No message provided'
  },
  ToOtherProvinces_В_другие_провинции: [provincePreferenceSchema],
  transportModetoOtherprovince_Способ_транспортиро_вки_в_другую_провинцию: {
    type: [String],
    required: false,
  },
}, {
  timestamps: true,
});

// Compile model
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
