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

export async function fetchMyLinks(){
    const data = await fetch(API.BASE_URL+API.MY_LINKS)

    return data.json();
}