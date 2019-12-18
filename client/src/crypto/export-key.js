import deriveKey from './derive-key';

async function exportKey(password) {
	const newKey = await deriveKey(password);

	const exported = await window.crypto.subtle.exportKey(
		"jwk",
		newKey
	);

	return JSON.stringify(exported);
}

export default exportKey;