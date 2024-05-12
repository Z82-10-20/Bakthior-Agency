import asyncHandler from 'express-async-handler';
import Contact from '../model/contact.js'; // Adjust the path as necessary
// import { sendMessageToTelegram } from '../utils/telegramNotification.js'; // Adjust the path as necessary
import { sendSmsNotification } from '../utils/smsNotification.js'; // Import the utility
// Define the route handler

const createContact = asyncHandler(async (req, res) => {
  // console.log('Incoming request data:', req.body);

  try {
    const contact = new Contact(req.body);
    const createdContact = await contact.save();
    // console.log('Contact created successfully:', createdContact);

    // Send a notification to Telegram
   const message = `
New submission received / Новая заявка получена:\n
Name / Имя: ${createdContact.name_Имя}\n
Email / Электронная почта: ${createdContact.email_Электронная_почта}\n
Nationality / Национальность: ${createdContact.nationality_Национальность}\n
Arriving From Country / Страна прибытия(Страна предыдущей посадки): ${createdContact.arrivingFromCountry_страна_прибытия}\n
Contact Number / Контактный номер: ${createdContact.contactNumber_Контактный_номер}\n
Arrival Date / Дата прибытия: ${createdContact.arrival_date_Дата_прибытия}\n
Departure Date / Дата отъезда: ${createdContact.departure_date_Дата_отъезда}\n\n

Number of People / Количество людей: ${createdContact.numberOfPeople_количество_людей}\n
Arrival Transport Service / Транспортная услуга при прибытии: ${createdContact. ArrivaltransportService_Транспортная_услуга_при_прибытии}\n
Depart Transport Service / Услуга Транспортировки при Отъезде: ${createdContact.DepartTransportService_Услугаz_Транспортировки_при_Отъезде}\n\n

Guide Required / Необходимость гида: ${createdContact.guideRequired_Необходимость_гида}\n
Guide Language / Язык гида: ${createdContact.guideLanguage_Язык_гида}\n
Custom Language / Пользовательский язык: ${createdContact.customLanguage ? createdContact.customLanguage : 'Not specified / Не указан'}\n\n

Travel Type / Тип путешествия: ${createdContact.travelType_Тип_путешествия}\n
Hotel Booking / Бронирование отеля: ${createdContact.hotelbooking_бронирование_отеля}\n
Preferred Hotel / Предпочтительный отель: ${createdContact.preferredHotel ? createdContact.preferredHotel : 'Not specified / Не указано'}\n\n

Itinerary Preference / Предпочтения по маршруту: ${createdContact.itinerary_маршрут}\n
selectedSubItinerary / выбранный подмаршрут:${createdContact.selectedSubItinerary}\n\n

Other Provinces: / Другие провинции: ${createdContact.ToOtherProvinces_В_другие_провинции.join(', ')}\n\n
Transport Modes to Other Province / Способы транспортировки в другую провинцию: ${createdContact.transportModetoOtherprovince_Способ_транспортиро_вки_в_другую_провинцию.join(', ')}\n\n

Message/Requests: / Сообщение/Запросы: ${createdContact.message_Сообщение}\n\n
`;
    await sendMessageToTelegram(message); // Assuming this is an async operation

 // Use the sendSmsNotification utility
      const phoneNumber = createdContact.contactNumber_Контактный_номер;
    const countryCode = phoneNumber.startsWith('+1') ? 'US' : phoneNumber.startsWith('+7') ? 'RU' : 'US';

  let messageBody = countryCode === 'RU' ? 
        'Спасибо за обращение в Bakhtior Transport & Tour! Мы рады помочь вам в планировании вашего путешествия. Наш представитель свяжется с вами в ближайшее время через WhatsApp или Telegram. Для удобства коммуникации, пожалуйста, убедитесь, что у вас установлен WhatsApp или Telegram. Мы с нетерпением ждем возможности сделать ваше путешествие в Узбекистан незабываемым приключением!' : // Russian message
        'Thank you for contacting Bakhtior Transport & Tour! We are excited to assist you with your travel plans. A representative will be in touch with you shortly via WhatsApp or Telegram. To facilitate smooth communication, please ensure that you have either WhatsApp or Telegram available. We look forward to making your journey to Uzbekistan an unforgettable adventure!'; // Default English message

    // Send the SMS Notification
    const smsResponse = await sendSmsNotification(phoneNumber, messageBody);

    if (!smsResponse.success) {
        // console.error(`Failed to send SMS: ${smsResponse.error}`);
        // Optionally handle SMS sending failure
    }


    res.status(201).json(createdContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    // console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
});


export { createContact };
