import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reference } = req.body;

    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${process.env.sk_live_027f07e105273832e53428c8799b2e9aff20948e}`
        }
      });

      if (response.data.data.status === 'success') {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(400).json({ status: 'failed' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error' });
    }
  } else {
    res.status(405).json({ status: 'method_not_allowed' });
  }
}
