import twilio from 'twilio';

// Function to send an SMS using Twilio
export const sendSmsNotification = async (userPhoneNumber, messageBody) => {
    // Ensure environment variables are loaded where this is called or at the application's entry point
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    // console.log(`Account SID: ${process.env.TWILIO_ACCOUNT_SID}, Auth Token: ${process.env.TWILIO_AUTH_TOKEN}, Twilio Number: ${process.env.TWILIO_NUMBER}`);

    try {
        const message = await client.messages.create({
            body: messageBody,
            to: userPhoneNumber, // Text this number, ensure it includes the country code
            from: process.env.TWILIO_NUMBER // From a valid Twilio number
        });
        // console.log(`SMS sent successfully to ${userPhoneNumber}: ${message.sid}`);
        return { success: true, sid: message.sid };
    } catch (error) {
        // console.error(`Failed to send SMS to ${userPhoneNumber}:`, error);
        return { success: false, error: error.message };
    }
};
