const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".message");
const inputInitHeight = chatInput.scrollHeight;

let userMessage;

const createChatli = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span><i class="fa-solid fa-user-tie"></i></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    
    if (!userMessage) return;

    try {
        // Gửi yêu cầu POST để gửi tin nhắn đến máy chủ
        const response = await axios.post('chat', {
            content: userMessage, // Truyền nội dung tin nhắn
            // Các thông tin đăng nhập hoặc thông tin người dùng khác có thể được truyền theo nhu cầu
        });

        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log(response.data);

        // Cập nhật giao diện người dùng nếu có tin nhắn mới (nếu cần)
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        chatbox.appendChild(createChatli(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        // chatbox.appendChild(createChatli("Vui lòng đăng nhập trước khi gửi tin nhắn!", "incoming"));
        // chatbox.scrollTo(0, chatbox.scrollHeight);
    } catch (error) {
        console.error('Error sending message:', error);
        // Xử lý lỗi (nếu cần)
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



  