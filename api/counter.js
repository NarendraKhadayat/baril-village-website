
/**
 * @author Narendra Khadayat
 */
//


// This special import allows our function to connect to the Vercel KV database
import { kv } from '@vercel/kv';

// This configures the function to run on Vercel's servers
export const config = {
  runtime: 'edge',
};

// This is the main function that will run when someone visits your page
export default async function handler(request) {
  try {
    // 1. Get the current count from the database. The key is 'visitorCount'.
    //    The 'incr' command increments the value by 1 and returns the new value.
    const newCount = await kv.incr('visitorCount');

    // 2. Return the new count in a JSON format so our website can read it.
    return new Response(
      JSON.stringify({ count: newCount }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // If there's an error, return a status 500 and the error message
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
