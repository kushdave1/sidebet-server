/* Moralis init code */
const serverUrl = 'http://localhost:1337/server';
const appId = '111';
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function handleAuth(provider) {
  await Moralis.enableWeb3({
    throwOnError: true,
    provider,
  });

  const { account, chainId } = Moralis;

  if (!account) {
    throw new Error('Connecting to chain failed, as no connected account was found');
  }
  if (!chainId) {
    throw new Error('Connecting to chain failed, as no connected chain was found');
  }

  const { message } = await Moralis.Cloud.run('requestMessage', {
    address: account,
    chain: parseInt(chainId, 16),
    network: 'evm',
  });

  await Moralis.authenticate({
    signingMessage: message,
    throwOnError: true,
  }).then((user) => {
    console.log(user);
  });
}

async function logOut() {
  await Moralis.User.logOut();
  console.log('logged out');
}

document.getElementById('btn-login').onclick = () => handleAuth('metamask');
document.getElementById('btn-logout').onclick = logOut;
document.getElementById('call').onclick = async () => {
  const result = await Moralis.Cloud.run('tf1');
  console.log(result);
};
