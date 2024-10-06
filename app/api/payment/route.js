import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";


async function paymentHandler(req, res) {
    const { userId, amount } = req.body;
    try {
      const payment = await db.payment.create({
        data: {
          userId,
          amount,
        },
      });

      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process payment' });
    }
}

export const POST = authMiddleware(paymentHandler)
