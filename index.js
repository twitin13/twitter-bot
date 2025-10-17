import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

async function postTweet() {
  try {
    await rwClient.v2.tweet("Tes 1");
    console.log("✅ Tweet terkirim:", new Date().toLocaleString());
  } catch (error) {
    console.error("❌ Gagal kirim tweet:", error);
  }
}

postTweet();
