// declare constants
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// toggle button
function toggleButton() {
    // Boolean Value
    button.disabled = !button.disabled;
}

// tell me a joke function
function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: 'eaaec2f5bc35440c86ab97abd5f6a2fb',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Async Function ... get Jokes form Joke api
async function getJokes() {
    // button.disabled = true;
    let joke = '';
    const urlAPI = `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=1`;
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = `${data.joke}`;
        }

        // text to speech
        tellMeJoke(joke);

        // call the toggle button function
        toggleButton();
    } catch (error) {
        console.log(`The Error from the getJokes Function where the Error is: ${error}`);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);