const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/userModel');
const Book = require('./models/bookModel');

const MONGODB_URI = process.env.MONGODB_URI;

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    price: 15.99,
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    stock: 50,
    category: "Classic",
    rating: 4.5
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    price: 12.50,
    thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    stock: 40,
    category: "Classic",
    rating: 4.8
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
    price: 14.00,
    thumbnail: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800",
    stock: 60,
    category: "Dystopian",
    rating: 4.7
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield.",
    price: 11.99,
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    stock: 35,
    category: "Classic",
    rating: 4.2
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language.",
    price: 10.99,
    thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    stock: 45,
    category: "Romance",
    rating: 4.6
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A timeless classic comprising the prelude to the Lord of the Rings.",
    price: 18.50,
    thumbnail: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
    stock: 70,
    category: "Fantasy",
    rating: 4.9
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard.",
    price: 22.00,
    thumbnail: "https://images.unsplash.com/photo-1609866138210-84bb08005304?auto=format&fit=crop&q=80&w=800",
    stock: 100,
    category: "Fantasy",
    rating: 4.9
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.",
    price: 35.00,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    stock: 25,
    category: "Fantasy",
    rating: 5.0
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical book that tells the story of a young shepherd named Santiago who travels from Spain to Egypt to find a treasure buried in the Pyramids.",
    price: 16.00,
    thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    stock: 80,
    category: "Philosophy",
    rating: 4.4
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "A murder in the Louvre and clues in Da Vinci paintings lead to the discovery of a religious mystery protected by a secret society for two thousand years.",
    price: 13.50,
    thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    stock: 55,
    category: "Thriller",
    rating: 3.9
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description: "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts.",
    price: 14.99,
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    stock: 65,
    category: "Dystopian",
    rating: 4.6
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    description: "The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant.",
    price: 15.50,
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    stock: 42,
    category: "Contemporary",
    rating: 4.7
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    description: "The son of a zookeeper, Pi Patel has an encyclopedic knowledge of animal behavior and a fervent love of stories.",
    price: 13.99,
    thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    stock: 38,
    category: "Adventure",
    rating: 4.3
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution.",
    price: 25.00,
    thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    stock: 30,
    category: "Non-Fiction",
    rating: 4.8
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
    price: 19.99,
    thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    stock: 90,
    category: "Self-Help",
    rating: 4.9
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "The major New York Times bestseller that changes the way we think about thinking.",
    price: 18.00,
    thumbnail: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800",
    stock: 45,
    category: "Psychology",
    rating: 4.6
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    price: 45.00,
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    category: "Technology",
    rating: 4.8
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
    price: 50.00,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    stock: 15,
    category: "Technology",
    rating: 4.7
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    description: "The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users.",
    price: 42.00,
    thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    stock: 28,
    category: "Technology",
    rating: 4.9
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    description: "A comprehensive update of the leading algorithms text, with new material on matchings in bipartite graphs, online algorithms, machine learning, and other topics.",
    price: 80.00,
    thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    stock: 10,
    category: "Technology",
    rating: 4.6
  }
];

const seedData = async () => {
  try {
    if (!MONGODB_URI) {
      console.error('MONGODB_URI not set in .env');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("DB Connected");

    // Seed Admin
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Seed Books
    // First, clear existing books to ensure we have exactly these 20
    await Book.deleteMany({});
    console.log('Cleared existing books');

    await Book.create(books);
    console.log(`Successfully seeded ${books.length} books`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
