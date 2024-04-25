import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const reserve = await prisma.reserve_accounts.findFirst({
    where: { slug: 'ngn-main' },
  });
  if (reserve == null) {
    const post1 = await prisma.$transaction(async (tx) => {
      const newWallet = await tx.wallets.create({
        data: {
          balance: 0,
          mode: 'credit',
          change_amount: 0,
          currency: 'NGN',
        },
      });

      // create history
      await tx.wallets_history.create({
        data: {
          balance: 0,
          mode: 'credit',
          change_amount: 0,
          currency: 'NGN',
          wallet_id: newWallet.id,
        },
      });
      // create reserve account
      await tx.reserve_accounts.create({
        data: {
          slug: 'ngn-main',
          wallet_id: newWallet.id,
          currency: 'NGN',
        },
      });
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
