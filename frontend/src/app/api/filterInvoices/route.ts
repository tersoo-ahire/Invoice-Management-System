import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startDate, endDate, paymentStatus } = req.query;

  try {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate as string);
    if (endDate) queryParams.append('endDate', endDate as string);
    if (paymentStatus) queryParams.append('paymentStatus', paymentStatus as string);

    const response = await fetch(`${API_BASE_URL}/filtered?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering invoices', error: error.message });
  }
}
