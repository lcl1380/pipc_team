const typingSpeed = 30;
const chatBox = document.getElementById("chat-box");
// 현재 진행 중인 타이핑 인터벌 추적 변수
let currentTypingInterval = null;

function typeMessage(container, message, callback) {
    let i = 0;
    let current = '';
    let insideTag = false;

    function typeNext() {
        if (i >= message.length) {
            if (callback) callback();
            return;
        }

        const char = message.charAt(i);

        // 태그 시작
        if (char === '<') {
            insideTag = true;
        }

        current += char;
        i++;

        // 태그 끝
        if (char === '>' && insideTag) {
            insideTag = false;
            container.innerHTML += current;
            current = '';
            typeNext();  // 태그는 지연 없이 바로 렌더
            return;
        }

        // 태그가 아니고 일반 문자일 경우
        if (!insideTag) {
            container.innerHTML += current;
            current = '';
        }

        currentTypingInterval = setTimeout(typeNext, typingSpeed);
    }

    typeNext();
}



function renderChat(data, index = 0, firstRightSpeaker = null) {
    if (!data || index >= data.length) return;

    // 🔥 이전 타이핑이 있으면 중단
    if (currentTypingInterval) {
        clearInterval(currentTypingInterval);
        currentTypingInterval = null;
    }

    const { sender, mood, message } = data[index];
    const prevSender = index > 0 ? data[index - 1].sender : null;
    const isSameSpeaker = sender === prevSender;

    if (firstRightSpeaker === null && (sender === 'A' || sender === 'B')) {
        firstRightSpeaker = sender;
    }
    const isRight = sender === firstRightSpeaker;

    const wrapper = document.createElement("div");
    wrapper.classList.add(`chat-${sender.toLowerCase()}`);
    if (isRight) wrapper.style.flexDirection = "row-reverse";

    const profile = document.createElement("div");
    profile.classList.add("profile-img", mood);
    if (isSameSpeaker) profile.style.visibility = "hidden";

    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble");
    if (isSameSpeaker) bubble.classList.add("no-arrow");

    const p = document.createElement("p");
    p.classList.add("mb-0");
    p.style.textAlign = 'left';
    bubble.appendChild(p);

    wrapper.appendChild(profile);
    wrapper.appendChild(bubble);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 🔥 타이핑 애니메이션 실행하고 interval 저장
    currentTypingInterval = typeMessage(p, message, () => {
        renderChat(data, index + 1, firstRightSpeaker);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const dataMap = {
        1: chatData1,
        2: chatData2,
        3: chatData3,
        4: chatData4,
        5: chatData5,
    };

    const tabButtons = document.querySelectorAll(".btn[data-chat]");

    // 기본 로딩
    renderChat(chatData1);

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.chat);
            if (!dataMap[idx]) return;

            chatBox.innerHTML = "";
            tabButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            renderChat(dataMap[idx]);  // 반드시 여기서 dataMap[idx] 넘김
        });

    });
});