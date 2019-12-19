async function importKey(jsonWebKey) {
	const key = window.crypto.subtle.importKey(
		'jwk',
		jsonWebKey,
		{name: 'AES-GCM', length: 256},
		true,
		['encrypt', 'decrypt']
	);
	return key;
}

export default importKey;