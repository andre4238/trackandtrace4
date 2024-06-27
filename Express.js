const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // Ändern Sie den Port zu einem anderen freien Port

// FEDEX API Credentials (Produktionsschlüssel)
const FEDEX_API_KEY = 'l751ecceb3e79a428cb837672fcaf91a1b';
const FEDEX_SECRET_KEY = 'ba249a1811f542b49ff785e631d28556';

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200' // Fügen Sie die URL Ihres Angular-Frontends hinzu
}));

// Function to get OAuth token
const getOAuthToken = async () => {
  try {
    const response = await axios.post('https://apis.fedex.com/oauth/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: FEDEX_API_KEY,
      client_secret: FEDEX_SECRET_KEY,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching OAuth token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch OAuth token');
  }
};

// Route to get tracking information
app.get('/track/:trackingNumber', async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  console.log(`Received request for tracking number: ${trackingNumber}`);

  try {
    const accessToken = await getOAuthToken();
    console.log('Received OAuth token:', accessToken);

    const response = await axios.post(
      'https://apis.fedex.com/track/v1/trackingnumbers',
      {
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: trackingNumber,
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    console.log('FedEx API response:', JSON.stringify(response.data, null, 2));

    if (!response.data.output || !response.data.output.completeTrackResults) {
      console.error('Response data missing expected structure:', JSON.stringify(response.data, null, 2));
      throw new Error('Invalid response format');
    }

    const completeTrackResults = response.data.output.completeTrackResults;
    const trackResults = completeTrackResults[0].trackResults;

    // Verarbeiten und extrahieren der relevanten Daten
    const trackingData = trackResults[0];
    const formattedData = {
      trackingNumber: trackingData.trackingNumberInfo.trackingNumber,
      status: trackingData.latestStatusDetail.description,
      statusDate: trackingData.dateAndTimes.find(dt => dt.type === "ACTUAL_DELIVERY")?.dateTime,
      shipper: trackingData.shipperInformation?.address,
      recipient: trackingData.recipientInformation?.address,
      weight: trackingData.packageDetails?.weightAndDimensions?.weight,
      dimensions: trackingData.packageDetails?.weightAndDimensions?.dimensions,
      deliveryDetails: trackingData.deliveryDetails
    };

    console.log('Formatted response:', formattedData);
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching tracking data:', error.response ? error.response.data : error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
