
function getKeyMaterial(plainPassword) {
	const enc = new TextEncoder();
	return window.crypto.subtle.importKey(
		"raw",
		enc.encode(plainPassword),
		{name: "PBKDF2"},
		false,
		["deriveBits", "deriveKey"]
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


async function getDerivedKey(plainPassword, salt) {
	let keyMaterial = await getKeyMaterial(plainPassword);
	let key = await getKey(keyMaterial, salt);

	const exportKey = await window.crypto.subtle.exportKey(
		"jwk",
		key
	);

	return exportKey;
}


export default getDerivedKey;