<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

</head>
<body>
<?php

  echo "<h1>HELP !</h1>";
  // die (" what ");
?>
  <script src="https://mainnet.cash/dist/mainnet-0.1.cash.js"></script>
  <script>
  const wallet = new TestNetHdWallet('buyer');
  await wallet.putTestnetSatoshis();
  console.log(await seller.getBalance('USD'));
  // const seller = new TestNetHdWallet();
  // await wallet.send([[seller.depositAddress(), 0.01, 'USD']]);
  </script>
</body>
</html>




