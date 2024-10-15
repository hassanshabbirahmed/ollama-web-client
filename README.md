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

## Love Docker, do we?

This project includes Docker support for easy deployment and distribution.

### Prerequisites

- Docker installed on your machine

### Building the Docker Image

To build the Docker image, follow these steps:

1. Ensure you are in the project root directory containing the Dockerfile.

2. Run the following command to build the image:

   ```bash
   docker build -t ollama-web-client .
   ```

   This command builds a Docker image with the tag `ollama-web-client` using the Dockerfile in the current directory. The `.` at the end specifies the build context (current directory).

3. Wait for the build process to complete. This may take a few minutes depending on your internet speed and machine performance.

4. Once completed, you can verify the image has been created by running:

   ```bash
   docker images
   ```

   You should see `ollama-web-client` in the list of images.

### Running the Docker Container

After building the image, you can run the container with:

```bash
docker run -p 8080:80 ollama-web-client
```

This will start the Ollama Web Client, and you can access it at `http://localhost:8080` in your web browser.

### Connecting to Ollama

By default, the client tries to connect to Ollama at `http://localhost:11434`. When running in Docker, you'll need to ensure that the container can reach your Ollama instance.

If Ollama is running on your host machine, you can use host networking:

```bash
docker run --network host ollama-web-client
```

Or, provide the host machine's IP address in the client configuration (you may need to modify the source code to accept a configurable Ollama URL).

### Note on CORS

When running the client in a Docker container and connecting to Ollama on the host machine, you may encounter CORS (Cross-Origin Resource Sharing) issues. To resolve this, you might need to configure Ollama to accept requests from the client's origin, or use a reverse proxy to handle CORS.

## Desktop Application

This project can be packaged as a desktop application using Electron, which bundles all dependencies together.

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)

### Building the Desktop Application

To build the desktop application:

1. Ensure you are in the project root directory.

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Build and package the application:
   ```bash
   npm run dist
   ```

4. Once the process completes, you'll find the packaged application in the `release` folder.

### Running the Desktop Application

After building:

1. Navigate to the `release` folder.
2. Find the appropriate file for your operating system:
   - For Windows: Look for an `.exe` file
   - For macOS: Look for a `.dmg` file
   - For Linux: Look for an `.AppImage` file
3. Double-click the file to install (Windows/macOS) or run (Linux) the application.

### Note on Ollama Connection

The desktop application still requires Ollama to be running on your machine. Ensure Ollama is installed and running before starting the Ollama Web Client desktop application.

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
