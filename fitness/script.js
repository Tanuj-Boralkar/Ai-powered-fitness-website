let select = document.querySelector(".select-heading")
let options = document.querySelector(".options")
let arrow = document.querySelector(".select-heading img")
let option = document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")




select.addEventListener("click", () => {
  options.classList.toggle("active-options")
  arrow.classList.toggle("rotate")
})

option.forEach((item) => {
  item.addEventListener("click", () => {
    selecttext.innerText = item.innerText
  })
})


// chat bot


let prompt = document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area button")
let chatContainer = document.querySelector(".chat-container")
let h1 = document.querySelector(".h1")
let chatimg = document.querySelector("#chatbotimg")
let chatbox = document.querySelector(".chat-box")

let userMessage = "";

chatimg.addEventListener("click", () => {
  chatbox.classList.toggle("active-chat-box")
  if (chatbox.classList.contains("active-chat-box")) {
    chatimg.src = "cross.svg"
  } else {
    chatimg.src = "chatbot.svg"
  }
})



let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=env.GOOGLE_API_KEY;"

// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
//   -H 'Content-Type: application/json' \
//   key: AIzaSyApBzduL7gDJVLrZz_eJyCp2GbeXWZrPWU' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'

// headers: { "Content-Type"; "application/json" }
// headers: -key: AIzaSyApBzduL7gDJVLrZz_eJyCp2GbeXWZrPWU"
async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text")
  try {
    const response = await fetch(Api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // headers: key: AIzaSyApBzduL7gDJVLrZz_eJyCp2GbeXWZrPWU",
      body: JSON.stringify({
        contents: [{
          "role": "user",
          "parts": [{ text: `${userMessage} in 10 words` }]
        }]
      })
    })
    const data = await response.json()
    const apiResponse = data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText = apiResponse
  }
  catch (error) {
    console.log(error)
  }
  finally {
    aiChatBox.querySelector(".loading").style.display = "none"
  }
}

function createChatBox(html, className) {
  const div = document.createElement("div")
  div.classList.add(className)
  div.innerHTML = html;
  return div
}

function showLoading() {
  const html = `<p class = "text"></p>
  <img src= "load.gif" class = "loading" width ="50px">`
  let aiChatBox = createChatBox(html, "ai-chat-box")
  chatContainer.appendChild(aiChatBox)
  generateApiResponse(aiChatBox)
}

chatbtn.addEventListener("click", () => {
  h1.style.display = "none"
  userMessage = prompt.value;
  const html = `<p class = "text"></p>`
  let userChatBox = createChatBox(html, "user-chat-box")
  userChatBox.querySelector(".text").innerText = userMessage
  chatContainer.appendChild(userChatBox)
  prompt.value = ""
  setTimeout(showLoading, 500)
})

// virtual assistant



let ai = document.querySelector(".virtual-assistant img")
let speakpage = document.querySelector(".speak-page")
let content = document.querySelector(".speak-page h1")




function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text)
  text_speak.rate = 1
  text_speak.pitch = 1
  text_speak.volume = 1
  text_speak.lang = "hi-GB"// en-us for female voice
  window.speechSynthesis.speak(text_speak)
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {

  speakpage.style.display = "none"
  let currentIndex = event.resultIndex
  let transcript = event.results[currentIndex][0].transcript
  content.innerText = transcript
  takeCommand(transcript.toLowerCase())

}
function takeCommand(message) {
  if (message.includes("open") && message.includes("chat")) {
    speak("okay sir")
    chatbox.classList.add("active-chat-box")
  } else if (message.includes("open") && message.includes("chat")) {
    speak("okay sir")
    chatbox.classList.remove("active-chat-box")
  } else if (message.includes("hello") && message.includes("hey")) {
    speak("hello sir, what can i help you?")
  } else if (message.includes("who are you")) {
    speak("i am virtual assistant, created by Tanuj Jain")
  } else if (message.includes("back")) {
    speak("okay sir")
    window.open("back.html", "_self")
  } else if (message.includes("chest")) {
    speak("okay sir")
    window.open("chest.html", "_self")
  } else if (message.includes("biceps") || message.includes("triceps")) {
    speak("okay sir")
    window.open("biceps-ticepes.html", "_self")
  } else if (message.includes("shoulder")) {
    speak("okay sir")
    window.open("shoulder.html", "_self")
  } else if (message.includes("leg")) {
    speak("okay sir")
    window.open("leg.html", "_self")
  } else if (message.includes("home")) {
    speak("okay sir")
    window.open("index.html", "_self")
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
    speak(time)
  } else if (message.includes("date")) {
    let time = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
    speak(date)
  }
}

ai.addEventListener("click", () => {
  recognition.start()
  speakpage.style.display = "flex";
})

