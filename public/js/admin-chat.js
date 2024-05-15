function getCurrentURL () {
    return window.location.href
  }
  const url = getCurrentURL()
  const socket = io('https://251b-113-161-66-12.ngrok-free.app');
let currentUsername = '';
let roomName = '';
let currentUsernameBlock = null;
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
const handleBlockClick = (username) => {
    // Thay đổi tên phòng dựa trên username
    roomName = `admin_${username}`;
    currentUsername = username;
    // Gửi yêu cầu tham gia vào phòng với tên phòng là roomName
    socket.emit('joinRoom', roomName);

    // Hiển thị tên người dùng trong header
    const headerName = document.querySelector('.header .imgText h4');
    headerName.innerText = username;

    // Hiển thị khung nhập tin nhắn
    document.querySelector('.header').style.display = 'flex';
    document.querySelector('.chat_input').style.display = 'block';

    // Lấy lịch sử chat và hiển thị lên chatbox
    fetch(`/admin/admin-chat/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load chat history');
            }
            return response.json();
        })
        .then(data => {
            renderChatHistory(data);
        })
        .catch(error => {
            console.error('Failed to fetch chat history:', error);
        });
};
const handleChat = async (username) => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    try {
        //console.log(username)
        //console.log(roomName)
        const response = await fetch(`/admin/admin-message/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: userMessage }),
        });
        socket.emit('loadlist', userMessage);
        socket.emit('message', { content: userMessage, roomName: roomName, username: 'admin' });
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
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
        let username = block.querySelector('.listHead h4').innerText;
        currentUsernameBlock = username;
        // currentUsername = block.querySelector('.listHead h4').innerText;
        // Hiển thị tên người dùng trong chatbox
        // const chatbox = document.querySelector('.chatbox');
        // chatbox.innerHTML = '';

        // const headerName = document.querySelector('.header .imgText h4');
        // headerName.innerText = username;

        handleBlockClick(username);

    });
});
sendChatBtn.addEventListener("click", () => {
    handleChat(currentUsername);
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat(currentUsername);
    }
});

socket.on('recmessage', (messageData) => {
    if (messageData.username !== 'admin') {
        // Hiển thị tin nhắn từ phòng trên chatbox
        chatbox.appendChild(createChatMessage(messageData.content, "friend_msg"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
});


function renderChatHistory(chatHistory) {
    const chatbox = document.querySelector('.chatbox');
    chatbox.innerHTML = ''; // Xóa nội dung hiện tại của chatbox trước khi render lại

    chatHistory.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        if (message.sender_id === 1) {
            messageElement.classList.add('my_msg');
        } else {
            messageElement.classList.add('friend_msg');
        }

        const messageContent = document.createElement('p');
        messageContent.textContent = message.content;


        messageElement.appendChild(messageContent);

        chatbox.appendChild(messageElement);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    });
}   
   
