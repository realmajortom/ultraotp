import axios from "axios";
import decrypt from "../crypto/decrypt";


export default async function exportTokens() {
    let Jwt = localStorage.getItem('JWT');
    let cryptoKey = localStorage.getItem('cryptoKey');

    if (Jwt && cryptoKey) {

        if (window.confirm('This will generate a JSON file containing all of your token data in plaintext. While this can be helpful if you want to switch to a different 2FA service, storing this file poses a security risk similar to saving all of your passwords in a Word document.\n\nDo you wish to continue?')) {

            let tokensFromServer = await getTokensFromServer(Jwt);

            if (tokensFromServer.success) {
                let plainTokens = await convertTokens(tokensFromServer.data, JSON.parse(cryptoKey));
                generateFile(plainTokens);
            } else {
                handleAuthErr();
            }

        }

    } else {
        handleAuthErr();
    }
}


function generateFile(data) {
    let fileLink = document.createElement("a");
    document.body.appendChild(fileLink);
    fileLink.style = "display: none";

    let json = JSON.stringify(data);
    let blob = new Blob([json], {type: "octet/stream"});
    let url = window.URL.createObjectURL(blob);

    fileLink.href = url;
    fileLink.download = 'ultraotp-data.json';
    fileLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(fileLink);
}


async function convertTokens(raw, key) {
    let decData = [];

    for (let i = 0; i < raw.length; i++) {
        const t = raw[i];
        decData.push({
            issuer: await decrypt(key, t.issuer.text, t.issuer.iv),
            label: await decrypt(key, t.name.text, t.name.iv),
            type: t.type,
            period: t.period,
            digits: t.digits,
            algorithm: t.algo,
            secret: await decrypt(key, t.secret.text, t.secret.iv)
        })
    }

    return decData;
}


async function getTokensFromServer(Jwt) {
    return await axios.get('https://ultraotp.com/api/doc/tokens', {headers: {'Authorization': `JWT ${Jwt}`}})
        .then(res => {
            if (res.data.success) {
                return {success: true, data: res.data.tokens}
            } else {
                return {success: false}
            }
        })
        .catch(() => {return {success: false}});
}


function handleAuthErr() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('cryptoKey');
    alert('An authentication error occurred, please log out and try again.');
}