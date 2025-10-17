import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';
import cron from 'node-cron';
import fs from 'fs';

// Koneksi ke akun Twitter kamu
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

// Fungsi untuk posting tweet
async function postTweet() {
  try {
    const text = "‼️ Restock Voucher ShopeeFood Deals Mulai Rp1K  
*Bisa Pesan Antar & Pickup (Free Ongkir) 🥧🍜🍳

Buruan klaim disini 👇👇👇
https://spf.shopee.co.id/AUkjSH3HGe
https://spf.shopee.co.id/AUkjSH3HGe

t. gofood grabfood kode promo go grab shopee food diskon";
    const mediaIds = [];

    // Upload 2 gambar dari folder /images
    const images = ['./images/1.jpg', './images/2.jpg'];
    for (const img of images) {
      const mediaId = await rwClient.v1.uploadMedia(img);
      mediaIds.push(mediaId);
    }

    await rwClient.v2.tweet({ text, media: { media_ids: mediaIds } });
    console.log("✅ Tweet terkirim:", new Date().toLocaleString());
  } catch (err) {
    console.error("❌ Gagal kirim tweet:", err);
  }
}

// Jadwalkan tweet setiap 2 jam
cron.schedule('0 */2 * * *', () => {
  postTweet();
});

// Jalankan 1x saat bot baru mulai
postTweet();
