export const apiService = {
  async fetchStream(query: string, signal: AbortSignal): Promise<ReadableStream> {
    const apiUrl = 'https://freddy-core-api.azurewebsites.net/v1/messages/run-stream';

    // bearerToken shall be moved to .env file of be fetched as a cookie.
    const bearerToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyIiwiSXNBZG1pbiI6IkZhbHNlIiwibmJmIjoxNzI2NTU1NjA0LCJleHAiOjE3MjkxNDc2MDQsImlhdCI6MTcyNjU1NTYwNH0.LWY8KnNR1k5qe-jtjKdribai58Fo9BqIG7MSTe73huE';

    const requestBody = {
      organization_id: 5,
      assistant_id: 6,
      messages: [{ content: query }],
      instructions: `Please provide a user-friendly response first , eg: Here’s some information about pet-friendly hotels in Ried.Please output all requested content as a JSON object. When appropriate, include a widget to visualize products or services. For hotel-related queries, always include image URLs, the cost of the hotel, the total rating, and detailed location information (including city, state, country, latitude, and longitude).Please include total count of reviews also in every hotel information. Responses should be structured in a way that makes them easy to display in a user-friendly interface, with the image URLs as prominent visual elements. A sample JSON response for the contents: { \\"hotels\\": [ { \\"name\\": \\"Hotel Ried\\", \\"image_url\\": \\"https://example.com/hotel_ried.jpg\\", \\"cost_per_night\\": \\"€85\\", \\"rating\\": 4.5, \\"location\\": { \\"city\\": \\"Ried\\", \\"state\\": \\"Upper Austria\\", \\"country\\": \\"Austria\\", \\"latitude\\": 48.2051, \\"longitude\\": 14.4169 }, \\"pet_policy\\": \\"Pets allowed with prior arrangement.\\" }, { \\"name\\": \\"Gasthof zur Post\\", \\"image_url\\": \\"https://example.com/gasthof_zur_post.jpg\\", \\"cost_per_night\\": \\"€70\\", \\"rating\\": 4.0, \\"location\\": { \\"city\\": \\"Ried\\", \\"state\\": \\"Upper Austria\\", \\"country\\": \\"Austria\\", \\"latitude\\": 48.2102, \\"longitude\\": 14.4208 }, \\"pet_policy\\": \\"Pets allowed for an additional fee.\\" } ] }. Exclude the combined response in the end on streaming mode.`,
      stream: true
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: signal
    });

    if (!response.body) {
      throw new Error('No response stream');
    }

    return response.body;
  }
};
