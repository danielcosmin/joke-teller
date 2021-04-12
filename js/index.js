const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable "Tell me a Joke" button
// function toggleButton() {
//     button.disabled = !button.disabled
//   }

//VoiceRSS Speech Function
function tellMe(joke) {
    console.log('tell me:' + joke )
    const jokeString = joke.trim().replace(/ /g, '%20')
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: '3576c605372048e7bca6df4018434e6b',
        src: jokeString,
        hl: 'en-gb',
        r: 0,
        c: 'mp3',
        f: 'ulaw_44khz_stereo',
        ssml: false,
    })
}

// Get jokes from JokeAPI 
async function getJokes(){
    let joke = ''
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        }else {
            joke = data.joke
        }
            // Passing Joke to VoiceRSS API
        tellMe(joke);
            // Disable Button
        toggleButton();
        } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)