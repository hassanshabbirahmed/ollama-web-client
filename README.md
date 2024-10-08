# Ollama Web Client

A user-friendly web interface for interacting with Ollama language models. This client allows you to easily chat with various Ollama models, adjust parameters, and manage conversations.

## Features

- 🚀 Easy model selection from available Ollama models
- 💬 Interactive chat interface with markdown support
- 🎛️ Adjustable temperature and top_p parameters
- 🌓 Dark mode toggle for comfortable viewing
- 📝 System prompt input for context setting
- 🔄 Real-time streaming of model responses

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Ollama installed and running on your local machine (default port: 11434)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/hassanshabbirahmed/ollama-web-client.git
   cd ollama-web-client
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. Select a model from the dropdown menu at the top of the page.
2. (Optional) Enter a system prompt to set the context for your conversation.
3. Adjust the temperature and top_p sliders if desired.
4. Type your message in the input box at the bottom of the page.
5. Press Enter or click the "Send" button to submit your message.
6. The model's response will stream in real-time below your message.

## Configuration

- **Model Selection**: Choose from available Ollama models in the dropdown menu.
- **System Prompt**: Set a context for your conversation by entering a system prompt.
- **Temperature**: Adjust the randomness of the model's outputs (0.0 to 1.0).
- **Top P**: Control the diversity of the model's outputs (0.0 to 1.0).
- **Dark Mode**: Toggle between light and dark themes using the sun/moon icon.

## Building for Production

To create a production build:

```
npm run build
```

This will generate a `dist` folder with the compiled assets.

## Troubleshooting

- Ensure Ollama is running on your local machine (default port: 11434).
- If you encounter CORS issues, you may need to configure Ollama to allow cross-origin requests.
- Check the browser console for any error messages if the application is not behaving as expected.

## Contributing

Contributions to the Ollama Web Client are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## Acknowledgements

- This project uses [Ollama](https://ollama.ai/) for language model inference.
- UI components are built with [shadcn/ui](https://ui.shadcn.com/).

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

---

Happy chatting with Ollama!
