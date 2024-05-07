// Kết nối vào máy chủ Socket.IO
const socket = io('http://localhost:3000');
let roomName = '';
let username = '';


      

// Xử lý khi mở hộp chat
function openChatBox() {
    document.body.classList.toggle('show-chatbox');
    fetch('history')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load chat history');
        }
        return response.json();
      })
      .then(data => {
        const chatbox = document.querySelector('.message');
        
        // Xóa toàn bộ tin nhắn trước đó
        while (chatbox.children.length > 1) {
          chatbox.removeChild(chatbox.lastChild);
        }
  
        data.forEach(message => {
          const userMessage = message.content;
          let messageType = '';
          if (message.receiver_id === 1) {
            messageType = 'outgoing';
          } else {
            messageType = 'incoming';
          }
          chatbox.appendChild(createChatli(userMessage, messageType));
          chatbox.scrollTo(0, chatbox.scrollHeight);
        });
      })
      .catch(error => {
        console.error(error.message);
      });

      fetch('username-chat')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load username');
        }
        return response.json();
      })
      .then(data => {
        username = data.username;
        roomName = `admin_${username}`;
      })
      .catch(error => {
        console.error(error.message);
      });

      socket.emit('joinRoom', roomName);
  }
  

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".message");
const inputInitHeight = chatInput.scrollHeight;

const createChatli = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span><i class="fa-solid fa-user-tie"></i></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    
    if (!userMessage) return;

    try {
        // Gửi tin nhắn qua phương thức POST
        const response = await fetch('message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: userMessage }),
        });
        socket.emit('loadlist', userMessage);
        socket.emit('message', { content: userMessage, roomName: roomName, username: username });
        // Kiểm tra xem gửi tin nhắn qua POST có thành công không
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        // Cập nhật giao diện người dùng
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        chatbox.appendChild(createChatli(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    } catch (error) {
        console.error('Error sending message:', error);
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        chatbox.appendChild(createChatli(userMessage, "outgoing"));
        chatbox.appendChild(createChatli("Vui lòng đăng nhập trước khi gửi tin nhắn!", "incoming"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

// Lắng nghe sự kiện nhập và gửi tin nhắn khi nhấn Enter
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

// Lắng nghe sự kiện nhận tin nhắn từ Socket.IO và cập nhật giao diện
socket.on('recmessage', (messageData) => {
  if (messageData.username !== username) {
      chatbox.appendChild(createChatli(messageData.content, "incoming"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
  }
});
