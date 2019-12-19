
function getKeyMaterial(password) {
	const enc = new TextEncoder();

	return window.crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{name: "PBKDF2"},
		false,
		["deriveKey"]
	);
}


function getKey(keyMaterial, salt) {
	return window.crypto.subtle.deriveKey(
		{
			"name": "PBKDF2",
			salt: salt,
			"iterations": 100000,
			"hash": "SHA-256"
		},
		keyMaterial,
		{ "name": "AES-GCM", "length": 256},
		true,
		[ "encrypt", "decrypt" ]
	);
}


async function deriveKey(password) {
	let salt = window.crypto.getRandomValues(new Uint8Array(16));
	let keyMaterial = await getKeyMaterial(password);
	let key = await getKey(keyMaterial, salt);

	return key;
}


export default deriveKey;