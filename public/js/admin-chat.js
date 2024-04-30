const chatInput = document.querySelector(".chat_input input");
const sendChatBtn = document.querySelector(".chat_input span");
const chatbox = document.querySelector(".chatbox");
const inputInitHeight = chatInput.scrollHeight;

let userMessage;

const createChatMessage = (message, className) => {
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("message", className);
    let messageContent = className === "my_msg" ? `<p></p>` : `<p></p>`;
    chatMessage.innerHTML = messageContent;
    chatMessage.querySelector("p").textContent = message;
    return chatMessage;
}

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    try {

        const response = await axios.post('admin-chat', {
            content: userMessage,
        });
        console.log(response.data);

        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        chatbox.appendChild(createChatMessage(userMessage, "my_msg"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

    } catch (error) {
    console.error('Error sending message:', error);
    }
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`
    chatInput.style.height = `${chatInput.scrollHeight}px`
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// 
const blocks = document.querySelectorAll('.chatlist .block');

    // Lặp qua từng block và thêm sự kiện click
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            blocks.forEach(b => {
                b.classList.remove('active');
            });

            // Thêm lớp 'active' cho block hiện tại
            block.classList.add('active');
            block.classList.remove('unread');
            const bElement = block.querySelector('.message_p b');
            if (bElement) {
                bElement.remove();
            }
            document.querySelector('.header').style.display = 'flex';
            document.querySelector('.chat_input').style.display = 'block';
            // Lấy tên người dùng từ block hiện tại
            const username = block.querySelector('.listHead h4').innerText;

            // Hiển thị tên người dùng trong chatbox
            const chatbox = document.querySelector('.chatbox');
            chatbox.innerHTML = '';

            const headerName = document.querySelector('.header .imgText h4');
            headerName.innerText = username;
        });
    });
