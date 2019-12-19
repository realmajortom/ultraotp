import importKey from './import-key';

const dec = new TextDecoder();

async function decrypt(jsonWebKey, decodedText, ivStr) {
	const key = await importKey(jsonWebKey);
	console.log(key);


	const cipherText = Uint8Array.from([...decodedText].map(ch => ch.charCodeAt()));
	console.log(cipherText);


	const iv = Uint8Array.from([...ivStr].map(ch => ch.charCodeAt()));
	console.log(iv);


	const plainText = await window.crypto.subtle.decrypt({
			name: "AES-GCM",
			iv: iv
		},
		key,
		cipherText
	).catch(err => console.error(err));


	return dec.decode(plainText);
}

export default decrypt;