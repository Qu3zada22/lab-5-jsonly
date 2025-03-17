const messageStyles = {
    padding: '10px',
    margin: '5px',
    borderRadius: '15px',
    wordBreak: 'break-word',
    fontSize: '16px',
    listStyle: 'none',
    transition: 'opacity 0.5s',
    maxWidth: '60%'
};

const getMessages = async () => {
    try {
        const response = await fetch('https://chat.calicheoficial.lat/messages');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los mensajes. Intenta más tarde.');
        return [];
    }
};

let isDarkMode = false;

const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    const body = document.body;
    if (isDarkMode) {
        body.style.backgroundColor = '#333';
        body.style.color = '#fff';
    } else {
        body.style.backgroundColor = '#ffccbc';
        body.style.color = '#000';
    }
};

document.body.style.fontFamily = 'Arial, Arial';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.height = '100vh';

const postMessages = async (message) => {
    const body = JSON.stringify(message);
    await fetch('https://chat.calicheoficial.lat/messages', {
        method: 'POST',
        body
    });
};

const drawMessages = async (ul) => {
    const messages = await getMessages();
    ul.innerHTML = ''; 

    const scrollPosition = ul.scrollTop;
    const isAtBottom = ul.scrollHeight - ul.clientHeight <= scrollPosition + 10;

    messages.forEach((message) => {
        const li = document.createElement('li');
        Object.assign(li.style, messageStyles);

        if (message.user === 'Anggie') {
            li.style.backgroundColor = '#FFCCBC';
            li.style.alignSelf = 'flex-end';
            li.style.textAlign = 'right';
            li.style.marginLeft = '40%';
        } else {
            li.style.backgroundColor = '#f7ccbe';
            li.style.alignSelf = 'flex-start';
            li.style.marginRight = '40%';
        }

        const user = document.createElement('strong');
        user.append(`${message.user}: `);
        li.append(user);

        const text = document.createElement('span');
        text.append(message.text);
        li.append(text);

        ul.appendChild(li); 
    });

    if (isAtBottom) {
        ul.scrollTop = ul.scrollHeight;
    } else {
        ul.scrollTop = scrollPosition;
    }
};

const messagesContainer = async () => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    div.style.width = '90%';

    const h1 = document.createElement('h1');
    h1.append('Chat web');
    h1.style.color = '#000000';

    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.innerText = 'Modo claro/oscuro';
    themeToggleBtn.style.marginBottom = '10px';
    themeToggleBtn.style.padding = '10px 20px';
    themeToggleBtn.style.backgroundColor = '#91685a';
    themeToggleBtn.style.color = 'white';
    themeToggleBtn.style.border = 'none';
    themeToggleBtn.style.borderRadius = '10px';
    themeToggleBtn.style.cursor = 'pointer';
    themeToggleBtn.onclick = toggleTheme;

    const ul = document.createElement('ul');
    ul.style.width = '100%';
    ul.style.height = '60vh';
    ul.style.overflowY = 'auto';
    ul.style.border = '2px solid #f09c84';
    ul.style.borderRadius = '10px';
    ul.style.padding = '10px';
    ul.style.backgroundColor = '#fcdfd7';
    ul.style.display = 'flex';
    ul.style.flexDirection = 'column';

    await drawMessages(ul);

    div.append(h1);
    div.append(themeToggleBtn);
    div.append(ul);
    document.body.append(div);
    return ul;
};

const drawInput = async (ul) => {
    const divify = document.createElement('div');
    divify.style.display = 'flex';
    divify.style.width = '90%';
    divify.style.marginTop = '10px';
    divify.style.gap = '10px';

    const textarea = document.createElement('textarea');
    textarea.style.resize = 'none';
    textarea.style.width = '80%';
    textarea.style.border = '2px solid #e8b6a7';
    textarea.style.borderRadius = '10px';
    textarea.style.padding = '10px';
    textarea.style.fontSize = '16px';

    const button = document.createElement('button');
    button.append('Enviar');
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#e87a58';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '10px';
    button.style.cursor = 'pointer';

    const sendMessage = async () => {
        const messageText = textarea.value;

        if (messageText.length > 140) {
            alert('El mensaje no puede exceder los 140 caracteres.');
            return;
        }

        const message = {
            text: textarea.value,
            user: 'Anggie'
        };
        await postMessages(message);
        textarea.value = '';
        await drawMessages(ul);
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    button.onclick = sendMessage;

    divify.append(textarea);
    divify.append(button);
    document.body.append(divify);
};

const main = async () => {
    const ul = await messagesContainer();
    await drawInput(ul);
    setInterval(() => drawMessages(ul), 5000);
};

main();
