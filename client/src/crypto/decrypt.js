import importKey from './import-key';

const dec = new TextDecoder();

async function decrypt(jsonWebKey, decodedText, ivStr) {
	const key = await importKey(jsonWebKey);
	const cipherText = Uint8Array.from([...decodedText].map(ch => ch.charCodeAt()));
	const iv = await Uint8Array.from([...ivStr].map(ch => ch.charCodeAt()));

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