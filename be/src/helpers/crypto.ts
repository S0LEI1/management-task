import crypto from 'crypto';
export const newCrypto = async (): Promise<any> => {
  crypto.generateKeyPair(
    'rsa',
    {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    },
    (err: Error | null, publicKey: string, privateKey: string) => {
      if (err) throw err;
      return { publicKey, privateKey };
    }
  );
};
