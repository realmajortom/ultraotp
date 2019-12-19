import importKey from './import-key';


const enc = new TextEncoder();

async function encrypt(jsonWebKey, text) {
	const key = await importKey(jsonWebKey);
	const iv = window.crypto.getRandomValues(new Uint8Array(12));
	const encodedText = enc.encode(text);

	const cipherText = await window.crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv: iv
		},
		key,
		encodedText
	);

	const cipherStr = String.fromCharCode(...new Uint8Array(cipherText));
	const ivStr = String.fromCharCode(...new Uint8Array(iv));

	return {
		text: cipherStr,
		iv: ivStr
	}
}

export default encrypt;