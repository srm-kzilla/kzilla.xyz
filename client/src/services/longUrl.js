import { API } from '../constants';

export async function shrinkUrl(token, longUrl){
  const data = await fetch(API.BASE_URL+API.SHRINK_URL, {
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl,
      }),
    });

    return data.json();
}

export async function updateUrl(token, linkId, longUrl){
  const data = await fetch(API.BASE_URL+API.SHRINK_URL, {
      method: "PUT",
      headers: {
        "x-recaptcha-token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        linkId,
        longUrl
      }),
    });

    return data.json();
}

export async function enableUrl(token, linkId, enabled){
  const data = await fetch(API.BASE_URL+API.SHRINK_URL, {
      method: "PUT",
      headers: {
        "x-recaptcha-token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        linkId,
        enabled,
      }),
    });

    return data.json();
}

export async function fetchMyLinks(){
    const data = await fetch(API.BASE_URL+API.MY_LINKS)

    return data.json();
}