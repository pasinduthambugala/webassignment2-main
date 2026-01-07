const bigPromise = require("../middlewares/bigPromise");
const Book = require('../models/bookModel');
const OpenAI = require('openai');

// Initialize OpenAI with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

// Helper function to get all books
async function getAllBooks() {
  const books = await Book.find().select('title author price stock category rating description');
  return books;
}

// Helper function to search books by title or author
async function searchBooks(query) {
  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } }
    ]
  }).select('title author price stock category rating description');
  return books;
}

// Helper function to get book details
async function getBookDetails(title) {
  const book = await Book.findOne({
    title: { $regex: title, $options: 'i' }
  });
  return book;
}

// Helper function to check availability
async function checkAvailability(title) {
  const book = await Book.findOne({
    title: { $regex: title, $options: 'i' }
  }).select('title stock available');
  return book;
}

// Helper function to get book price
async function getBookPrice(title) {
  const book = await Book.findOne({
    title: { $regex: title, $options: 'i' }
  }).select('title price');
  return book;
}

// Define available functions for OpenAI
const functions = [
  {
    name: "get_all_books",
    description: "Get a list of all available books in the store",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "search_books",
    description: "Search for books by title or author name",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query (book title or author name)"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "get_book_details",
    description: "Get detailed information about a specific book",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the book"
        }
      },
      required: ["title"]
    }
  },
  {
    name: "check_availability",
    description: "Check if a book is available in stock",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the book to check"
        }
      },
      required: ["title"]
    }
  },
  {
    name: "get_book_price",
    description: "Get the price of a specific book",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the book"
        }
      },
      required: ["title"]
    }
  }
];

// Execute function calls
async function executeFunction(functionName, args) {
  switch (functionName) {
    case "get_all_books":
      return await getAllBooks();
    case "search_books":
      return await searchBooks(args.query);
    case "get_book_details":
      return await getBookDetails(args.title);
    case "check_availability":
      return await checkAvailability(args.title);
    case "get_book_price":
      return await getBookPrice(args.title);
    default:
      return null;
  }
}

// Main chat controller
exports.chat = bigPromise(async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        response: "Please enter a message."
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'PLACEHOLDER_OPENAI_API_KEY_REPLACE_ME') {
      // Fallback to intelligent keyword-based system
      return await handleFallbackChat(req, res, message);
    }

    // Use OpenAI with function calling
    const messages = [
      {
        role: "system",
        content: `You are a helpful AI assistant for an online bookstore. You can help users find books, check availability, get prices, and provide book details. Be friendly, concise, and helpful. When listing books, format them nicely with bullet points or numbered lists.`
      },
      {
        role: "user",
        content: message
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      functions: functions,
      function_call: "auto"
    });

    const responseMessage = response.choices[0].message;

    // Check if the model wants to call a function
    if (responseMessage.function_call) {
      const functionName = responseMessage.function_call.name;
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);

      // Execute the function
      const functionResult = await executeFunction(functionName, functionArgs);

      // Send function result back to OpenAI for natural language response
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...messages,
          responseMessage,
          {
            role: "function",
            name: functionName,
            content: JSON.stringify(functionResult)
          }
        ]
      });

      return res.status(200).json({
        success: true,
        response: secondResponse.choices[0].message.content
      });
    }

    // No function call, return direct response
    return res.status(200).json({
      success: true,
      response: responseMessage.content
    });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      success: false,
      response: "Sorry, I'm having trouble connecting right now. Please try again."
    });
  }
});

// Fallback intelligent chat without OpenAI
async function handleFallbackChat(req, res, message) {
  const msg = message.toLowerCase();
  let response = "I'm here to help! You can ask me about our books, check availability, or get prices.";

  try {
    // List all books
    if (msg.includes("list") || msg.includes("show") && (msg.includes("book") || msg.includes("all"))) {
      const books = await getAllBooks();
      if (books.length > 0) {
        const bookList = books.slice(0, 10).map((b, i) =>
          `${i + 1}. "${b.title}" by ${b.author} - $${b.price}`
        ).join('\n');
        response = `Here are some of our books:\n\n${bookList}\n\n${books.length > 10 ? `...and ${books.length - 10} more!` : ''}`;
      }
    }
    // Search for specific book
    else if (msg.includes("do you have") || msg.includes("search") || msg.includes("find")) {
      // Extract potential book title
      const words = message.split(' ');
      const query = words.slice(Math.max(words.findIndex(w =>
        ['have', 'search', 'find', 'for'].includes(w.toLowerCase())
      ) + 1, 0)).join(' ');

      if (query.length > 2) {
        const books = await searchBooks(query);
        if (books.length > 0) {
          const bookList = books.map(b =>
            `"${b.title}" by ${b.author} - $${b.price} (${b.stock > 0 ? 'In Stock' : 'Out of Stock'})`
          ).join('\n');
          response = `I found these books:\n\n${bookList}`;
        } else {
          response = `Sorry, I couldn't find any books matching "${query}". Try searching for something else!`;
        }
      }
    }
    // Check availability
    else if (msg.includes("available") || msg.includes("stock")) {
      const words = message.split(' ');
      const titleWords = words.filter(w =>
        !['is', 'the', 'available', 'in', 'stock', 'do', 'you', 'have'].includes(w.toLowerCase())
      );
      const title = titleWords.join(' ');

      if (title.length > 2) {
        const book = await checkAvailability(title);
        if (book) {
          response = book.stock > 0
            ? `Yes! "${book.title}" is available. We have ${book.stock} copies in stock.`
            : `Sorry, "${book.title}" is currently out of stock.`;
        } else {
          response = `I couldn't find a book with that title. Try searching our catalog!`;
        }
      }
    }
    // Get price
    else if (msg.includes("price") || msg.includes("cost") || msg.includes("how much")) {
      const words = message.split(' ');
      const titleWords = words.filter(w =>
        !['what', 'is', 'the', 'price', 'of', 'cost', 'how', 'much', 'does'].includes(w.toLowerCase())
      );
      const title = titleWords.join(' ');

      if (title.length > 2) {
        const book = await getBookPrice(title);
        if (book) {
          response = `"${book.title}" costs $${book.price}.`;
        } else {
          response = `I couldn't find that book. Please check the title and try again.`;
        }
      }
    }
    // Details
    else if (msg.includes("detail") || msg.includes("about") || msg.includes("tell me")) {
      const words = message.split(' ');
      const titleWords = words.filter(w =>
        !['tell', 'me', 'about', 'details', 'of', 'the', 'what', 'is'].includes(w.toLowerCase())
      );
      const title = titleWords.join(' ');

      if (title.length > 2) {
        const book = await getBookDetails(title);
        if (book) {
          response = `📚 "${book.title}" by ${book.author}\n\n${book.description}\n\nPrice: $${book.price}\nCategory: ${book.category}\nRating: ${book.rating}/5\nStock: ${book.stock} available`;
        } else {
          response = `I couldn't find details for that book. Try searching our catalog!`;
        }
      }
    }
    // Greetings
    else if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      response = "Hi! 👋 Welcome to our bookstore! I can help you find books, check availability, and get prices. What are you looking for today?";
    }
    // Goodbye
    else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("exit")) {
      response = "Goodbye! Happy reading! 📚✨";
    }

    return res.status(200).json({
      success: true,
      response: response
    });

  } catch (error) {
    console.error("Fallback chat error:", error);
    return res.status(500).json({
      success: false,
      response: "Sorry, I encountered an error. Please try again."
    });
  }
}
